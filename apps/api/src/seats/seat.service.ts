import { Injectable } from '@nestjs/common';
import { RedisService } from '../redis/redis.service';

@Injectable()
export class SeatService {
  constructor(private readonly redisService: RedisService) {}

  async getAvailableSeats(busId: string): Promise<any[]> {
    const seats = await this.redisService.getSeats(busId);
    return seats.filter(seat => !seat.locked);
  }

  async lockSeat(busId: string, seatNumber: string): Promise<boolean> {
    const seatLockKey = `bus:${busId}:seat:${seatNumber}`;
    return await this.redisService.lockSeat(seatLockKey);
  }

  async unlockSeat(busId: string, seatNumber: string): Promise<void> {
    const seatLockKey = `bus:${busId}:seat:${seatNumber}`;
    await this.redisService.unlockSeat(seatLockKey);
  }
}
