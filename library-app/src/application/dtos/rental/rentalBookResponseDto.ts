export interface RentalBookResponseDto {
  id: string;
  bookId: string;
  userId: string;
  rentalDate: Date;
  dueDate: Date;
  createdAt: Date;
  updatedAt: Date;
}
