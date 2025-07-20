import { PrismaClient, Book } from "@prisma/client";

/**
 * Prisma を使って書籍データを管理するリポジトリクラス
 */
export class PrismaBookRepository {
  private prisma: PrismaClient;
  
  constructor() {
    this.prisma = new PrismaClient();
  }

  /**
   * 書籍を新規登録する。
   * @param title - 登録する書籍のタイトル
   * @returns 登録された書籍データ
   */
  async create(title: string): Promise<Book> {
    return await this.prisma.book.create({
      data: {
        title, 
        isAvailable: true 
      },
    });
  }

  /**
   * 書籍IDを指定して1件取得する。
   * @param id - 書籍のUUID
   * @returns 見つかった書籍データ、またはnull
   */
  async findById(id: string): Promise<Book | null> {
    return await this.prisma.book.findUnique({
      where: { id },
    });
  }
}
