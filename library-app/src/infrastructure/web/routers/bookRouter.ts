import { Router } from 'express';
import { BookController } from '../../../adapter/controllers/bookController';
import { PrismaBookRepository } from '../../../adapter/repositories/prismaBookRepository';
import { PrismaClient } from '@prisma/client';
import { UuidGenerator } from '../../../adapter/utils/uuidGenerator';
import { AddBookUseCase } from '../../../application/useCases/book/addBookUseCase';
import { FindBookByIdUseCase } from '../../../application/useCases/book/findBookByIdUseCase';

const router = Router();

// DI
const prisma = new PrismaClient();
const uuidGenerator = new UuidGenerator();
const bookRepository = new PrismaBookRepository(prisma);
const addBookUseCase = new AddBookUseCase(bookRepository, uuidGenerator);
const findBookByIdUseCase = new FindBookByIdUseCase(bookRepository);
const bookController = new BookController(addBookUseCase, findBookByIdUseCase);

// ルーティング定義
router.post('/', bookController.create.bind(bookController));
router.get('/:id', bookController.findById.bind(bookController));

export default router;
