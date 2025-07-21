import { capitalize, lowerCaseFirst } from '../utils';

export function generateEntity(name: string): string {
  const content = `
export class ${capitalize(name)} {
  constructor(
    private _id: string,
    // Add other properties as needed
  ) {}

  get id(): string {
    return this._id;
  }
}
  `;

  return content.trim() + '\n';
}

export function generateRepositoryInterface(name: string): string {
  const content = `
import { ${capitalize(name)} } from '../entities/${lowerCaseFirst(name)}';

export interface ${capitalize(name)}RepositoryInterface {
  create(${lowerCaseFirst(name)}: ${capitalize(name)}): Promise<${capitalize(name)}>;
  findById(id: string): Promise<${capitalize(name)} | null>;
  // Add other methods as needed
}
  `;

  return content.trim() + '\n';
}


