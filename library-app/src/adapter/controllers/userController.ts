import { Request, Response } from 'express';
import { CreateUserUseCaseInterface } from '../../application/useCases/user/createUserUseCaseInterface';
import { CreateUserRequestDto } from '../../application/dtos/user/createUserRequestDto'

export class UserController {
  constructor(private readonly createUserUseCase: CreateUserUseCaseInterface ) {}

  async createUser(req: Request, res: Response): Promise<void> {
    try {
      const requestDto: CreateUserRequestDto = {
        email: req.body.email as string,
      }
      const user = await this.createUserUseCase.execute(requestDto);
      res.status(201).json(user);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'ユーザーの作成に失敗しました' });
    }
  }
}
