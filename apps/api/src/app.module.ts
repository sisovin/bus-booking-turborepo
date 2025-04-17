import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { BookingModule } from './bookings/booking.module';
import { BusModule } from './buses/bus.module';
import { SeatModule } from './seats/seat.module';
import { SharedModule } from './shared/shared.module';

@Module({
  imports: [
    AuthModule,
    BookingModule,
    BusModule,
    SeatModule,
    SharedModule,
  ],
})
export class AppModule {}
