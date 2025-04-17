import { Controller, Get, Param, Res, HttpStatus } from '@nestjs/common';
import { SeatService } from './seat.service';
import { Response } from 'express';

@Controller('seats')
export class SeatController {
  constructor(private readonly seatService: SeatService) {}

  @Get(':busId')
  async getAvailableSeats(@Param('busId') busId: string, @Res() res: Response) {
    try {
      const seats = await this.seatService.getAvailableSeats(busId);
      return res.status(HttpStatus.OK).json(seats);
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Failed to fetch available seats' });
    }
  }
}
