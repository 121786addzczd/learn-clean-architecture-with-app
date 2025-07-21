import { Router } from 'express';
import { PrismaClient } from '@prisma/client';
import { UuidGenerator } from '../../../adapter/utils/uuidGenerator';
import { PrismaUserRepository } from '../../../adapter/repositories/prismaUserRepository';
import { CreateUserUseCase } from '../../../application/useCases/user/createUserUseCase';
import { UserController } from '../../../adapter/controllers/userController';

const router = Router();
// DI
const prisma = new PrismaClient();
const uuidGenerator = new UuidGenerator();
const userRepository = new PrismaUserRepository(prisma);
const createUserUseCase = new CreateUserUseCase(userRepository, uuidGenerator);
const userController = new UserController(createUserUseCase);
// ルーティング定義
router.post('/', userController.createUser.bind(userController));

export default router;
