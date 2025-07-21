import { ReturnBookRequestDto } from '../../dtos/rental/returnBookRequestDto';
import { ReturnBookResponseDto } from '../../dtos/rental/returnBookResponseDto';

export interface ReturnBookUseCaseInterface {
  execute(requestDto: ReturnBookRequestDto): Promise<ReturnBookResponseDto>;
}
