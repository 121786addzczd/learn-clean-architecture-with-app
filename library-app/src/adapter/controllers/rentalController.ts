import { Request, Response } from 'express';
import { RentalBookUseCaseInterface } from '../../application/useCases/rental/rentalBookUseCaseInterface';
import { RentalBookRequestDto } from '../../application/dtos/rental/rentalBookRequestDto'
import { ReturnBookUseCaseInterface } from '../../application/useCases/rental/returnBookUseCaseInterface';
import { ReturnBookRequestDto } from '../../application/dtos/rental/returnBookRequestDto';

export class RentalController {
  constructor(
    private readonly rentalBookUseCase: RentalBookUseCaseInterface,
    private readonly returnBookUseCase: ReturnBookUseCaseInterface
  ) {}

  async rentalBook(req: Request, res: Response): Promise<void> {
    try {
      const requestDto: RentalBookRequestDto = {
        bookId: req.body.bookId,
        userId: req.body.userId
      };
      const rental = await this.rentalBookUseCase.execute(requestDto);
      
      res.status(201).json(rental);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: '書籍の貸出に失敗しました' });
    }
  }

  async returnBook(req: Request, res: Response): Promise<void> {
    try {
      const requestDto: ReturnBookRequestDto = {
        id: req.body.id,
      };
      const rental = await this.returnBookUseCase.execute(requestDto);
      
      res.status(200).json(rental);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: '書籍の返却に失敗しました' });
    }
  }
}
