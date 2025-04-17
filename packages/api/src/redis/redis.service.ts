import { Injectable } from '@nestjs/common';
import * as Redis from 'ioredis';

@Injectable()
export class RedisService {
  private readonly redisClient: Redis.Redis;

  constructor() {
    this.redisClient = new Redis({
      host: process.env.REDIS_HOST || 'localhost',
      port: parseInt(process.env.REDIS_PORT, 10) || 6379,
    });
  }

  async lockSeat(seatLockKey: string): Promise<boolean> {
    const isLocked = await this.redisClient.set(seatLockKey, 'locked', 'NX', 'EX', 300);
    return isLocked === 'OK';
  }

  async unlockSeat(seatLockKey: string): Promise<void> {
    await this.redisClient.del(seatLockKey);
  }

  async getSeats(busId: string): Promise<any[]> {
    const seats = await this.redisClient.hgetall(`bus:${busId}:seats`);
    return Object.keys(seats).map(seatNumber => ({
      number: seatNumber,
      locked: seats[seatNumber] === 'locked',
    }));
  }
}
