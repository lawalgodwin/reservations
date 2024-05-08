import { AbstractRepository } from '@app/common/database';
import { Booking } from './entities/booking.entity';
import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class BookingsRepository extends AbstractRepository<Booking> {
  protected readonly logger = new Logger(BookingsRepository.name);
  constructor(
    @InjectRepository(Booking)
    bookingRepository: Repository<Booking>,
  ) {
    super(bookingRepository);
  }
}
