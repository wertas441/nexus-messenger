import { Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  public login(requestBody) {
    return this.authService.login(requestBody);
  }

  @Post('registration')
  public registration(requestBody) {
    return this.authService.registration(requestBody);
  }

  @Post('forgot-password')
  public forgotPassword(requestBody) {
    return this.authService.forgotPassword(requestBody);
  }

  @Get('me')
  public me(requestBody) {
    return this.authService.aboutUser(requestBody);
  }
}
