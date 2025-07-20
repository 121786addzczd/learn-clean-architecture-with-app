import { Book } from '@prisma/client';
/**
 * 書籍サービスのインターフェース
 */
export interface BookServiceInterface {
  create(title: string): Promise<Book>;
  findById(id: string): Promise<Book | null>;
}
