import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import {
  ForgotPasswordDto,
  LoginDto,
  RefreshTokenDto,
  RegistrationDto,
} from './utils/auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(200)
  @Post('login')
  public login(@Body() body: LoginDto) {
    return this.authService.login(body);
  }

  @Post('registration')
  public registration(@Body() body: RegistrationDto) {
    return this.authService.registration(body);
  }

  @HttpCode(200)
  @Post('refresh')
  public refresh(@Body() body: RefreshTokenDto) {
    return this.authService.refresh(body.refreshToken);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('logout')
  public logout(@Req() request: { user: { sub: number } }) {
    return this.authService.logout(request.user.sub);
  }

  @Post('forgot-password')
  public forgotPassword(requestBody: ForgotPasswordDto) {
    return this.authService.forgotPassword(requestBody);
  }

  @Get('me')
  @UseGuards(AuthGuard('jwt'))
  public me(@Req() request: { user: unknown }) {
    return request.user;
  }
}
