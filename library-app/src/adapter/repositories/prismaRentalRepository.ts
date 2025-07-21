import { PrismaClient } from '@prisma/client';
import { Rental } from '../../domain/entities/rental';
import { RentalRepositoryInterface } from '../../domain/repositories/rentalRepositoryInterface';

export class PrismaRentalRepository implements RentalRepositoryInterface {
  constructor(private readonly prisma: PrismaClient) {}

  async create(rental: Rental): Promise<Rental> {
    const createdRental = await this.prisma.rental.create({
      data: {
        bookId: rental.bookId,
        userId: rental.userId,
        rentalDate: rental.rentalDate,
        dueDate: rental.dueDate,
        returnDate: rental.returnDate,
        createdAt: rental.createdAt,
        updatedAt: rental.updatedAt
      },
    });

    return new Rental(
      createdRental.id,
      createdRental.bookId,
      createdRental.userId,
      createdRental.rentalDate,
      createdRental.returnDate,
      createdRental.createdAt,
      createdRental.updatedAt
    );
  }

  async findById(id: string): Promise<Rental | null> {
    const foundRental = await this.prisma.rental.findUnique({
      where: { id },
    });

    if (!foundRental) return null;

    return new Rental(
      foundRental.id,
      foundRental.bookId,
      foundRental.userId,
      foundRental.rentalDate,
      foundRental.returnDate,
      foundRental.createdAt,
      foundRental.updatedAt
    );
  }

  async findByUserId(userId: string): Promise<Rental[]> {
    const foundRentals = await this.prisma.rental.findMany({
      where: { userId },
    });

    return foundRentals.map(
      (foundRental) =>
        new Rental(
          foundRental.id,
          foundRental.bookId,
          foundRental.userId,
          foundRental.rentalDate,
          foundRental.returnDate,
          foundRental.createdAt,
          foundRental.updatedAt
        )
    );
  }
}
