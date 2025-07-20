import { Book } from '@prisma/client';
import { BookRepositoryInterface } from '../dataAccess/bookRepositoryInterface';
import { BookServiceInterface } from './bookServiceInterface';

export class BookService implements BookServiceInterface {
  constructor(private readonly bookRepository: BookRepositoryInterface) {}

  /**
   * 書籍を新規登録する。
   * @param title - 登録する書籍のタイトル
   * @returns 登録された書籍データ
   */
  async create(title: string): Promise<Book> {
    return await this.bookRepository.create(title);
  }

  /**
   * 書籍IDを指定して1件取得する。
   * @param id - 書籍のUUID
   * @returns 見つかった書籍データ、またはnull
   */
  async findById(id: string): Promise<Book | null> {
    return await this.bookRepository.findById(id);
  }
}
