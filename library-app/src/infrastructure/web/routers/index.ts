import { Router } from 'express';
import bookRoutes from './bookRouter';

const router = Router();

// ヘルスチェック
router.get('/health_check', (req, res) => {
  res.json({ message: 'Success Health Check!' });
});

// Book API
router.use('/books', bookRoutes);

export default router;
