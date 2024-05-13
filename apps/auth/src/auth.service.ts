import { Injectable } from '@nestjs/common';
import { UsersService } from './users/users.service';
import { LoginDto } from './users/dto/login.dto';
import * as bcrypt from 'bcryptjs';
import { User } from './users/entities/user.entity';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}
  async verifyUser(cred: LoginDto) {
    const user = await this.userService.findOne(cred.email);
    console.log(user, 'from auth service');
    if (user && (await bcrypt.compare(cred.password, user.password))) {
      return user;
    }
    return null;
  }
  async login(user: User) {
    const payload = { sub: user.id, username: user.email };
    return { access_token: this.jwtService.sign(payload) };
  }
}
