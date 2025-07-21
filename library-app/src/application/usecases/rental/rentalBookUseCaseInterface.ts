import { RentalBookRequestDto } from '../../dtos/rental/rentalBookRequestDto';
import { RentalBookResponseDto } from '../../dtos/rental/rentalBookResponseDto';

export interface RentalBookUseCaseInterface {
  execute(requestDto: RentalBookRequestDto): Promise<RentalBookResponseDto>;
}
