import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-users.dto';
import { CurrentUser } from '../current-user.decorator';
import { User } from './entities/user.entity';
import { JwtGuard } from '../guards/jwt.auth-guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async createUser(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get('me')
  @UseGuards(JwtGuard)
  async getUserProfile(@CurrentUser() user: User) {
    return user;
  }
}
