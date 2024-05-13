import { Controller, Post, UseGuards, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CurrentUser } from './current-user.decorator';
import { User } from './users/entities/user.entity';
import { LocalGuard } from './guards/local.auth-guards';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { Response } from 'express';
import { JwtGuard } from './guards/jwt.auth-guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalGuard)
  @Post('login')
  async login(
    @CurrentUser() user: User,
    @Res({ passthrough: true }) res: Response,
  ) {
    const jwt = await this.authService.login(user);
    res.send(jwt);
  }

  @UseGuards(JwtGuard)
  @MessagePattern('authenticate')
  async authenticate(@Payload() data: any) {
    return data.user;
  }
}
