import { Router } from 'express';
import { PrismaClient } from '@prisma/client';
import { UuidGenerator } from '../../../adapter/utils/uuidGenerator';
import { PrismaTransactionManager } from '../../../adapter/utils/prismaTransactionManager';
import { PrismaRentalRepository } from '../../../adapter/repositories/prismaRentalRepository';
import { PrismaBookRepository } from '../../../adapter/repositories/prismaBookRepository';
import { RentalBookUseCase } from '../../../application/useCases/rental/rentalBookUseCase';
import { RentalController } from '../../../adapter/controllers/rentalController';
import { ReturnBookUseCase } from '../../../application/useCases/rental/returnBookUseCase';

const router = Router();

const prisma = new PrismaClient();
const uuidGenerator = new UuidGenerator();
const transactionManager = new PrismaTransactionManager(prisma);
const rentalRepository = new PrismaRentalRepository(prisma);
const bookRepository = new PrismaBookRepository(prisma);
const rentalBookUseCase = new RentalBookUseCase(
  rentalRepository,
  bookRepository,
  uuidGenerator,
  transactionManager
);
const returnBookUseCase = new ReturnBookUseCase(
  rentalRepository,
  bookRepository,
  transactionManager
);
const rentalController = new RentalController(rentalBookUseCase, returnBookUseCase);
// ルーティング定義
router.post('/', rentalController.rentalBook.bind(rentalController));
router.post('/return', rentalController.returnBook.bind(rentalController));

export default router;
