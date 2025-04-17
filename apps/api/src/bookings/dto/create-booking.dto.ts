import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class CreateBookingDto {
  @IsUUID()
  @IsNotEmpty()
  userId: string;

  @IsUUID()
  @IsNotEmpty()
  busId: string;

  @IsString()
  @IsNotEmpty()
  seatNumber: string;
}
