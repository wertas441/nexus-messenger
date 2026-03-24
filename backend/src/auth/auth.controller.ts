import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto, RegistrationDto } from './utils/auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  public login(@Body() body: LoginDto) {
    return this.authService.login(body);
  }

  @Post('registration')
  public registration(@Body() body: RegistrationDto) {
    return this.authService.registration(body);
  }

  @Post('forgot-password')
  public forgotPassword(requestBody) {
    return this.authService.forgotPassword(requestBody);
  }

  @Get('me')
  public me() {
    return this.authService.aboutUser();
  }
}
