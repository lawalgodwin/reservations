import { Injectable } from '@nestjs/common';
import { UsersService } from './users/users.service';
import { LoginDto } from './users/dto/login.dto';

@Injectable()
export class AuthService {
  constructor(private userService: UsersService) {}
  async verifyUser(cred: LoginDto) {
    const user = await this.userService.findOne(cred.email);
    if (user && user.password === cred.password) {
      return user;
    }
    return null;
  }
  getHello(): string {
    return 'Hello World!';
  }
  // async login(loginDto: LoginDto) {}
}
