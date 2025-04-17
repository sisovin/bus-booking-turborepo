import { Injectable, Inject, forwardRef } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateBookingDto } from './dto/create-booking.dto';
import { BookingResponseDto } from './dto/booking-response.dto';
import { RedisService } from '../redis/redis.service';

@Injectable()
export class BookingService {
  constructor(
    private readonly prisma: PrismaService,
    @Inject(forwardRef(() => RedisService))
    private readonly redisService: RedisService,
  ) {}

  async createBooking(createBookingDto: CreateBookingDto): Promise<BookingResponseDto> {
    const { userId, busId, seatNumber } = createBookingDto;

    // Lock the seat in Redis
    const seatLockKey = `bus:${busId}:seat:${seatNumber}`;
    const isSeatLocked = await this.redisService.lockSeat(seatLockKey);
    if (!isSeatLocked) {
      throw new Error('Seat is already booked');
    }

    try {
      // Start a Prisma transaction
      const booking = await this.prisma.$transaction(async (prisma) => {
        // Check if the seat is already booked
        const existingBooking = await prisma.booking.findFirst({
          where: { busId, seatNumber },
        });
        if (existingBooking) {
          throw new Error('Seat is already booked');
        }

        // Create the booking
        return await prisma.booking.create({
          data: {
            userId,
            busId,
            seatNumber,
          },
        });
      });

      // Return the booking response
      return new BookingResponseDto(booking);
    } finally {
      // Unlock the seat in Redis
      await this.redisService.unlockSeat(seatLockKey);
    }
  }

  async getBookingById(id: string): Promise<BookingResponseDto> {
    const booking = await this.prisma.booking.findUnique({
      where: { id },
    });
    if (!booking) {
      throw new Error('Booking not found');
    }
    return new BookingResponseDto(booking);
  }
}
