import { Injectable } from '@nestjs/common';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';
import { BookingsRepository } from './bookings.repository';
import { Booking } from './entities/booking.entity';

@Injectable()
export class BookingsService {
  constructor(protected bookingsRopsitory: BookingsRepository) {}

  async create(createBookingDto: CreateBookingDto) {
    const booking = new Booking({
      ...createBookingDto,
      timestamp: new Date(),
      userId: 'uhouyotjhio',
    });
    return this.bookingsRopsitory.create(booking);
  }

  async findAll() {
    return this.bookingsRopsitory.find({});
  }

  async findOne(id: string) {
    return this.bookingsRopsitory.findOne({ id });
  }

  async update(id: string, updateBookingDto: UpdateBookingDto) {
    return this.bookingsRopsitory.findOneAndUpdate(
      { id },
      { ...updateBookingDto },
    );
  }

  async remove(id: string) {
    return this.bookingsRopsitory.findOneAndDelete({ id });
  }
}
