import { PrismaClient } from '@prisma/client';
import { Book } from '../../domain/entities/book';
import { BookRepositoryInterface } from '../../domain/repositories/bookRepositoryInterface';

/**
 * Prisma を使って書籍データを管理するリポジトリクラス
 */
export class PrismaBookRepository  implements BookRepositoryInterface {
  constructor(private readonly prisma: PrismaClient) {}

  /**
   * 書籍を新規登録する。
   * @param title - 登録する書籍のタイトル
   * @returns 登録された書籍データ
   */
  async create(book: Book): Promise<Book> {
    const createdBook = await this.prisma.book.create({
      data: {
        id: book.id,
        title: book.title,
        isAvailable: book.isAvailable,
        createdAt: book.createdAt,
        updatedAt: book.updatedAt
      },
    });

    return new Book(
      createdBook.id,
      createdBook.title,
      createdBook.isAvailable,
      createdBook.createdAt,
      createdBook.updatedAt
    );
  }

  /**
   * 書籍IDを指定して1件取得する。
   * @param id - 書籍のUUID
   * @returns 見つかった書籍データ、またはnull
   */
  // async findById(id: string): Promise<Book | null> {
  //   return await this.prisma.book.findUnique({
  //     where: { id },
  //   });
  // }
}
