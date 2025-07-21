import { RentalRepositoryInterface } from '../../../domain/repositories/rentalRepositoryInterface';
import { Rental } from '../../../domain/entities/rental';
import { ReturnBookRequestDto } from '../../dtos/rental/returnBookRequestDto';
import { ReturnBookResponseDto } from '../../dtos/rental/returnBookResponseDto';
import { ReturnBookUseCaseInterface } from './returnBookUseCaseInterface';
import { BookRepositoryInterface } from '../../../domain/repositories/bookRepositoryInterface';
import { TransactionManagerInterface } from '../../utils/transactionManagerInterface';

export class ReturnBookUseCase implements ReturnBookUseCaseInterface {
  constructor(
    private readonly rentalRepository: RentalRepositoryInterface,
    private readonly bookRepository: BookRepositoryInterface,
    private readonly transactionManager: TransactionManagerInterface
  ) {}

  async execute(requestDto: ReturnBookRequestDto): Promise<ReturnBookResponseDto> {
    return await this.transactionManager.run(async (ctx) => {
      const rental = await this.rentalRepository.findById(requestDto.id, ctx);
      if (!rental) {
        throw new Error('貸出記録が存在しません');
      }

      const book = await this.bookRepository.findById(rental.bookId, ctx);
      if (!book) {
        throw new Error('書籍が存在しません')
      }

      book.return();
      await this.bookRepository.update(book, ctx);

      rental.return();
      const updateRental = await this.rentalRepository.update(rental, ctx);

      return {
        id: updateRental.id,
        returnDate: updateRental.returnDate,
        createdAt: updateRental.createdAt,
        updatedAt: updateRental.updatedAt
      };
    });
  }
}
