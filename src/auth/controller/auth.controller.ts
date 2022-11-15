import { Controller, Get, Post, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { UserEntity } from '../../user/schema/user.entity';
import { AuthService } from '../service/auth.service';
import { CurrentUser } from '../decorator//current-user.decorator';
import JwtAuthGuard from '../guards/jwt.auth.guard';
import { LocalAuthGuard } from '../guards/local.auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(
    @CurrentUser() user: UserEntity,
    @Res({ passthrough: true }) response: Response,
  ) {
    await this.authService.login(user, response);
    response.send(user);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  isAuthenticated() {
    return true;
  }

  @Post('logout')
  @UseGuards(JwtAuthGuard)
  logout(@Res({ passthrough: true }) response: Response) {
    this.authService.logout(response);
    response.json({});
  }
}
