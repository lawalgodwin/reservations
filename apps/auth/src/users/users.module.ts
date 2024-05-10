import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { UsersRepository } from './users.repository';
import { DatabaseModule, LoggerModule } from '@app/common';
import { User } from './entities/user.entity';

@Module({
  imports: [DatabaseModule, DatabaseModule.forFeature([User]), LoggerModule],
  controllers: [UsersController],
  providers: [UsersService, UsersRepository],
})
export class UsersModule {}
