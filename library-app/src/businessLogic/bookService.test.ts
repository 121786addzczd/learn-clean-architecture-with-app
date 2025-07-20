import { BookRepositoryInterface } from '../dataAccess/bookRepositoryInterface';
import { BookService } from './bookService';
import { Book } from '@prisma/client';

const mockBookRepository: jest.Mocked<BookRepositoryInterface> = {
  create: jest.fn(),
  findById: jest.fn(),
};

describe('BookService', () => {
  let bookService: BookService;

  beforeEach(() => {
    bookService = new BookService(mockBookRepository);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('書籍の登録が成功する', async () => {
    const bookTitle = 'Test Book';
    const newBook: Book = {
      id: '1',
      title: bookTitle,
      isAvailable: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    mockBookRepository.create.mockResolvedValue(newBook);

    const result = await bookService.create(bookTitle);
    
    expect(result).toEqual(newBook);
    // 期待する引数で呼び出されているか確認
    expect(mockBookRepository.create).toHaveBeenCalledWith(bookTitle);
  });

  it ('データベースに存在する書籍IDで検索すると取得できる', async () => {
    const bookId = '1';
    const bookTitle = 'Test Book';
    const foundBook: Book = {
      id: bookId,
      title: bookTitle,
      isAvailable: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    mockBookRepository.findById.mockResolvedValue(foundBook);

    const result = await bookService.findById(bookId);
    
    expect(result).toEqual(foundBook);
    expect(mockBookRepository.findById).toHaveBeenCalledWith(bookId);
  });

  it('存在しない書籍IDで検索するとnullを返す', async () => {
    const notFoundBookId = 'not-found-id';
    mockBookRepository.findById.mockResolvedValue(null);

    const result = await bookService.findById(notFoundBookId);
    
    expect(result).toBeNull();
    expect(mockBookRepository.findById).toHaveBeenCalledWith(notFoundBookId);
  });
})
