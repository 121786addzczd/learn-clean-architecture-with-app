import { RentalRepositoryInterface } from '../../../domain/repositories/rentalRepositoryInterface';
import { Rental } from '../../../domain/entities/rental';
import { RentalBookRequestDto } from '../../dtos/rental/rentalBookRequestDto';
import { RentalBookResponseDto } from '../../dtos/rental/rentalBookResponseDto';
import { RentalBookUseCaseInterface } from './rentalBookUseCaseInterface';
import { BookRepositoryInterface } from '../../../domain/repositories/bookRepositoryInterface';
import { IdGeneratorInterface } from '../../../domain/utils/idGeneratorInterface';
import { TransactionManagerInterface } from '../../utils/transactionManagerInterface';

export class RentalBookUseCase implements RentalBookUseCaseInterface {
  constructor(
    private readonly rentalRepository: RentalRepositoryInterface,
    private readonly bookRepository: BookRepositoryInterface,
    private readonly idGenerator: IdGeneratorInterface,
    private readonly transactionManager: TransactionManagerInterface
  ) {}

  async execute(requestDto: RentalBookRequestDto): Promise<RentalBookResponseDto> {
    return await this.transactionManager.run(async (ctx) => {
      const book = await this.bookRepository.findById(requestDto.bookId, ctx);
      if (!book) {
        throw new Error('書籍が見つかりません');
      }
      book.rental();

      const rentals = await this.rentalRepository.findByUserId(requestDto.userId, ctx);
      if (rentals.filter(rental => rental.returnDate === null).length >= 5) {
        throw new Error('既に上限まで貸し出されています');
      }

      await this.bookRepository.update(book, ctx);

      const newRental = new Rental(
        this.idGenerator.generate(),
        requestDto.bookId,
        requestDto.userId,
        new Date()
      );
      const createdRental = await this.rentalRepository.create(newRental, ctx);

      return {
        id: createdRental.id,
        bookId: createdRental.bookId,
        userId: createdRental.userId,
        rentalDate: createdRental.rentalDate,
        dueDate: createdRental.dueDate,
        createdAt: createdRental.createdAt,
        updatedAt: createdRental.updatedAt
      };
    })
    
  }
}
