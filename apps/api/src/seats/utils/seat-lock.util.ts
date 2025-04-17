import { Injectable } from '@nestjs/common';
import { RedisService } from '../../redis/redis.service';

@Injectable()
export class SeatLockUtil {
  constructor(private readonly redisService: RedisService) {}

  async lockSeat(seatLockKey: string): Promise<boolean> {
    const isLocked = await this.redisService.set(seatLockKey, 'locked', 'NX', 'EX', 300);
    return isLocked === 'OK';
  }

  async unlockSeat(seatLockKey: string): Promise<void> {
    await this.redisService.del(seatLockKey);
  }
}
