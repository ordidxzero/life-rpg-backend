import { CoreRepository } from 'src/core/repositories/core.repository';
import { EntityRepository, FindOneOptions } from 'typeorm';
import { User } from '../entities/user.entity';

@EntityRepository(User)
export class UserRepository extends CoreRepository<User> {
  async exists(options?: FindOneOptions<User>): Promise<boolean> {
    const user = await this.findOne(options);
    return Boolean(user);
  }
}
