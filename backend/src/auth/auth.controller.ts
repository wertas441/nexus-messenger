import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import type { Response } from 'express';
import { AuthService } from './auth.service';
import { ForgotPasswordDto, LoginDto, RegistrationDto } from './utils/auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  private setAccessCookie(response: Response, accessToken: string) {
    response.cookie('accessToken', accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
    });
  }

  private setRefreshCookie(response: Response, refreshToken: string) {
    response.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
    });
  }

  @HttpCode(200)
  @Post('login')
  public async login(
    @Body() body: LoginDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    const result = await this.authService.login(body);

    this.setAccessCookie(response, result.accessToken);
    this.setRefreshCookie(response, result.refreshToken);

    return {
      user: result.user,
    };
  }

  @Post('registration')
  public registration(@Body() body: RegistrationDto) {
    return this.authService.registration(body);
  }

  @HttpCode(200)
  @Post('refresh')
  public async refresh(
    @Req() request: { cookies?: { refreshToken?: string } },
    @Res({ passthrough: true }) response: Response,
  ) {
    const refreshToken = request.cookies?.refreshToken;
    const result = await this.authService.refresh(refreshToken ?? '');

    this.setAccessCookie(response, result.accessToken);
    this.setRefreshCookie(response, result.refreshToken);

    return {
      user: result.user,
    };
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('logout')
  public async logout(
    @Req() request: { user: { sub: number } },
    @Res({ passthrough: true }) response: Response,
  ) {
    response.clearCookie('accessToken', { path: '/' });
    response.clearCookie('refreshToken', { path: '/' });

    return this.authService.logout(request.user.sub);
  }

  @Post('forgot-password')
  public forgotPassword(@Body() requestBody: ForgotPasswordDto) {
    return this.authService.forgotPassword(requestBody);
  }

  @Get('me')
  @UseGuards(AuthGuard('jwt'))
  public me(@Req() request: { user: unknown }) {
    return request.user;
  }
}
