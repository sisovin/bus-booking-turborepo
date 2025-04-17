export class BookingResponseDto {
  id: string;
  userId: string;
  busId: string;
  seatNumber: string;
  createdAt: Date;
  updatedAt: Date;

  constructor(partial: Partial<BookingResponseDto>) {
    Object.assign(this, partial);
  }
}
