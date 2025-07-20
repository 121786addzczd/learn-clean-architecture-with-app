import { Book } from '../entities/books';

export interface BookRepositoryInterface {
  create(book: Book): Promise<Book>;
  // findById(id: string): Promise<Book | null>;
}
