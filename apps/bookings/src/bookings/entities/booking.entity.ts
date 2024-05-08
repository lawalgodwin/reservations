import { AbstractEntity } from '@app/common/database';
import { Column, Entity } from 'typeorm';

@Entity()
export class Booking extends AbstractEntity<Booking> {
  @Column()
  timestamp: Date;

  @Column()
  startDate: Date;

  @Column()
  endDate: Date;

  @Column()
  userId: string;

  @Column()
  placeId: string;

  @Column()
  invoiceId: string;
}
