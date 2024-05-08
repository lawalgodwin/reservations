import { Module } from '@nestjs/common';
import { BookingsService } from './bookings.service';
import { BookingsController } from './bookings.controller';
import { DatabaseModule } from '@app/common/database';
import { BookingsRepository } from './bookings.repository';
import { Booking } from './entities/booking.entity';
import { LoggerModule } from '@app/common';

@Module({
  imports: [DatabaseModule, DatabaseModule.forFeature([Booking]), LoggerModule],
  controllers: [BookingsController],
  providers: [BookingsService, BookingsRepository],
})
export class BookingsModule {}
