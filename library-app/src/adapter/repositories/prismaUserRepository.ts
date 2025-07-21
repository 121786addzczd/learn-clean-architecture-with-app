import { PrismaClient } from '@prisma/client';
import { User } from '../../domain/entities/user';
import { UserRepositoryInterface } from '../../domain/repositories/userRepositoryInterface';

export class PrismaUserRepository implements UserRepositoryInterface {
  constructor(private readonly prisma: PrismaClient) {}

  async create(user: User): Promise<User> {
    const createdUser = await this.prisma.user.create({
      data: {
        id: user.id,
        email: user.email,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      },
    });

    return new User(
      createdUser.id,
      createdUser.email,
      createdUser.createdAt,
      createdUser.updatedAt
    );
  }
}
