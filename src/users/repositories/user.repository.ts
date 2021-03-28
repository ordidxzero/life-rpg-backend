import { EntityRepository, FindOneOptions, Repository } from 'typeorm';
import { User } from '../entities/user.entity';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async exists(options?: FindOneOptions<User>): Promise<boolean> {
    const user = await this.findOne(options);
    return Boolean(user);
  }
}
