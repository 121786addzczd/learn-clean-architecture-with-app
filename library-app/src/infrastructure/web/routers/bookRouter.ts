import { Router } from 'express';
import { BookController } from '../../../adapter/controllers/bookController';
import { PrismaBookRepository } from '../../../adapter/repositories/prismaBookRepository';
import { PrismaClient } from '@prisma/client';
import { UuidGenerator } from '../../../adapter/utils/uuidGenerator';
import { AddBookUseCase } from '../../../application/useCases/book/addBookUseCase';

const router = Router();

// DI
const prisma = new PrismaClient();
const uuidGenerator = new UuidGenerator();
const bookRepository = new PrismaBookRepository(prisma);
const addBookUseCase = new AddBookUseCase(bookRepository, uuidGenerator);
const bookController = new BookController(addBookUseCase);

// ルーティング定義
router.post('/', bookController.create.bind(bookController));
// router.get('/books/:id', bookController.findById.bind(bookController));

export default router;
