import { Request, Response } from 'express';
import { RentalBookUseCaseInterface } from '../../application/useCases/rental/rentalBookUseCaseInterface';
import { RentalBookRequestDto } from '../../application/dtos/rental/rentalBookRequestDto'

export class RentalController {
  constructor(private readonly rentalBookUseCase: RentalBookUseCaseInterface) {}

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
}
