import { capitalize, lowerCaseFirst } from '../utils';

export function generateUseCaseInterface(
  entityName: string,
  useCaseName: string
) {
  const content = `
import { ${capitalize(
    useCaseName
  )}RequestDto } from '../../dtos/${lowerCaseFirst(
    entityName
  )}/${lowerCaseFirst(useCaseName)}RequestDto';
import { ${capitalize(
    useCaseName
  )}ResponseDto } from '../../dtos/${lowerCaseFirst(
    entityName
  )}/${lowerCaseFirst(useCaseName)}ResponseDto';

export interface ${capitalize(useCaseName)}UseCaseInterface {
  execute(requestDto: ${capitalize(useCaseName)}RequestDto): Promise<${capitalize(
    useCaseName
  )}ResponseDto>;
}
`;
  return content.trim() + '\n';
}

export function generateUseCase(entityName: string, useCaseName: string) {
  const content = `
import { ${capitalize(
    entityName
  )}RepositoryInterface } from '../../../domain/repositories/${lowerCaseFirst(
    entityName
  )}RepositoryInterface';
import { ${capitalize(
    entityName
  )} } from '../../../domain/entities/${lowerCaseFirst(entityName)}';
import { ${capitalize(
    useCaseName
  )}RequestDto } from '../../dtos/${lowerCaseFirst(
    entityName
  )}/${lowerCaseFirst(useCaseName)}RequestDto';
import { ${capitalize(
    useCaseName
  )}ResponseDto } from '../../dtos/${lowerCaseFirst(
    entityName
  )}/${lowerCaseFirst(useCaseName)}ResponseDto';
import { ${capitalize(useCaseName)}UseCaseInterface } from './${lowerCaseFirst(
    useCaseName
  )}UseCaseInterface';

export class ${capitalize(useCaseName)}UseCase implements ${capitalize(
    useCaseName
  )}UseCaseInterface {
  constructor(private readonly ${lowerCaseFirst(
    entityName
  )}Repository: ${capitalize(entityName)}RepositoryInterface) {}

  async execute(requestDto: ${capitalize(
    useCaseName
  )}RequestDto): Promise<${capitalize(useCaseName)}ResponseDto> {
    // Implement usecase logic
  }
}
`;
  return content.trim() + '\n';
}

export function generateRequestDto(useCaseName: string) {
  const content = `
export interface ${capitalize(useCaseName)}RequestDto {
  // Add properties for ${lowerCaseFirst(useCaseName)} request
}
`;
  return content.trim() + '\n';
}

export function generateResponseDto(useCaseName: string) {
  const content = `
export interface ${capitalize(useCaseName)}ResponseDto {
  // Add properties for ${lowerCaseFirst(useCaseName)} response
}
`;
  return content.trim() + '\n';
}
