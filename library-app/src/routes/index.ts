import { Router } from 'express';
import { BookController } from '../presentation/bookController';

const router = Router();

const bookController = new BookController();

// ヘルスチェック
router.get('/health_check', (req, res) => {
  res.json({ message: 'Success Health Check!' });
});

// Book API
router.post('/books', bookController.create.bind(bookController));
router.get('/books/:id', bookController.findById.bind(bookController));

export default router;
