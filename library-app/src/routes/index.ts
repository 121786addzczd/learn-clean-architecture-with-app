import { Router } from 'express';

const router = Router();

router.get('/', (req, res) => {
  res.json({ message: 'Hello world!' });
});

router.get('/health_check', (req, res) => {
  res.json({ message: 'Success Health Check!' });
});

export default router;
