import { Controller, Get, Post, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('user-data')
  @UseGuards(AuthGuard('jwt'))
  public getUserData() {
    return this.userService.getUserData();
  }

  @Post('user-data')
  @UseGuards(AuthGuard('jwt'))
  public updateUserData() {
    return this.userService.updateUserData();
  }

}
