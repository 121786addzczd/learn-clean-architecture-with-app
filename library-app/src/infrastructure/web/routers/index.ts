import { Router } from 'express';
import bookRoutes from './bookRouter';
import userRoutes from './userRouter';
import rentalRoutes from './rentalRouter';

const router = Router();

// ヘルスチェック
router.get('/health_check', (req, res) => {
  res.json({ message: 'Success Health Check!' });
});

router.use('/books', bookRoutes);
router.use('/users', userRoutes);
router.use('/rentals', rentalRoutes);

export default router;
