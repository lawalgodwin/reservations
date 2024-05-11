import { Injectable } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { CreateUserDto } from './dto/create-users.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepositiry: UsersRepository) {}

  async create(createUserDto: CreateUserDto) {
    const newUser = new User({ ...createUserDto });
    return this.usersRepositiry.create(newUser);
  }
  async findOne(email: string) {
    return this.usersRepositiry.findOne({ email });
  }
}
