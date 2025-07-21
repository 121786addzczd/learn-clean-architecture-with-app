import { User } from '../entities/user';

export interface UserRepositoryInterface {
  create(user: User): Promise<User>;
}
