import { PrismaClient } from '@prisma/client';
import { Rental } from '../../domain/entities/rental';
import { RentalRepositoryInterface } from '../../domain/repositories/rentalRepositoryInterface';
import { TransactionContextInterface } from '../../domain/utils/transactionContextInterface';

export class PrismaRentalRepository implements RentalRepositoryInterface {
  constructor(private readonly prisma: PrismaClient) {}

  async create(rental: Rental, ctx?: TransactionContextInterface): Promise<Rental> {
    const prisma = ctx ? (ctx as PrismaClient) : this.prisma;
    const createdRental = await prisma.rental.create({
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

  async findByUserId(userId: string, ctx?: TransactionContextInterface): Promise<Rental[]> {
    const prisma = ctx ? (ctx as PrismaClient) : this.prisma;
    const foundRentals = await prisma.rental.findMany({
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

  async update(rental: Rental, ctx?: TransactionContextInterface): Promise<Rental> {
    const prisma = ctx ? (ctx as PrismaClient) : this.prisma;

    const updateRental = await prisma.rental.update({
      where: { id: rental.id },
      data: { returnDate: rental.returnDate }
    });

    return new Rental(
      updateRental.id,
      updateRental.bookId,
      updateRental.userId,
      updateRental.rentalDate,
      updateRental.returnDate,
      updateRental.createdAt,
      updateRental.updatedAt
    );
  }
}
