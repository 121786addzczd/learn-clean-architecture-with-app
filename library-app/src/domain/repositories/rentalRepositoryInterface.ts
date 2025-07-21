import { Rental } from '../entities/rental';
import { TransactionContextInterface } from '../utils/transactionContextInterface';

export interface RentalRepositoryInterface {
  create(rental: Rental, ctx?:TransactionContextInterface): Promise<Rental>;
  findById(id: string, ctx?:TransactionContextInterface): Promise<Rental | null>;
  findByUserId(userId: string, ctx?:TransactionContextInterface): Promise<Rental[]>;
}
