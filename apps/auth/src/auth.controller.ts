import { Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CurrentUser } from './current-user.decorator';
import { User } from './users/entities/user.entity';
import { LocalGuard } from './guards/local.auth-guards';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get()
  getHello(): string {
    return this.authService.getHello();
  }

  @UseGuards(LocalGuard)
  @Post('login')
  async login(@CurrentUser() user: User) {
    return user;
  }
}
