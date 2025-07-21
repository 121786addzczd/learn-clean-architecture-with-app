import { Router } from 'express';
import bookRoutes from './bookRouter';
import userRoutes from './userRouter';

const router = Router();

// ヘルスチェック
router.get('/health_check', (req, res) => {
  res.json({ message: 'Success Health Check!' });
});

router.use('/books', bookRoutes);
router.use('/users', userRoutes);

export default router;
