import { Router } from 'express';
import { BookController } from '../presentation/bookController';
import { PrismaBookRepository } from '../dataAccess/prismaBookRepository';
import { BookService } from '../businessLogic/bookService';

const router = Router();

const bookRepository = new PrismaBookRepository();
const bookService = new BookService(bookRepository);
const bookController = new BookController(bookService);

// ヘルスチェック
router.get('/health_check', (req, res) => {
  res.json({ message: 'Success Health Check!' });
});

// Book API
router.post('/books', bookController.create.bind(bookController));
router.get('/books/:id', bookController.findById.bind(bookController));

export default router;
