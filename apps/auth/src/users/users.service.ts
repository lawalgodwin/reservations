import { Injectable } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { CreateUserDto } from './dto/create-users.dto';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepositiry: UsersRepository) {}

  async create(createUserDto: CreateUserDto) {
    const passwordHash = await bcrypt.hash(createUserDto.password, 10);
    const newUser = new User({ ...createUserDto, password: passwordHash });
    return this.usersRepositiry.create(newUser);
  }
  async findOne(email: string) {
    return this.usersRepositiry.findOne({ email });
  }
}
