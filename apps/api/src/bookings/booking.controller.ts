import { Controller, Post, Get, Param, Body, HttpStatus, Res, UseGuards } from '@nestjs/common';
import { BookingService } from './booking.service';
import { CreateBookingDto } from './dto/create-booking.dto';
import { Response } from 'express';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('bookings')
export class BookingController {
  constructor(private readonly bookingService: BookingService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async createBooking(@Body() createBookingDto: CreateBookingDto, @Res() res: Response) {
    const booking = await this.bookingService.createBooking(createBookingDto);
    return res.status(HttpStatus.CREATED).json(booking);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async getBooking(@Param('id') id: string, @Res() res: Response) {
    const booking = await this.bookingService.getBookingById(id);
    return res.status(HttpStatus.OK).json(booking);
  }
}
