import { Rental } from '../entities/rental';

export interface RentalRepositoryInterface {
  create(rental: Rental): Promise<Rental>;
  findById(id: string): Promise<Rental | null>;
  findByUserId(userId: string): Promise<Rental[]>;
}
