import { CoreRepository } from 'src/core/repositories/core.repository';
import { DeepPartial, EntityRepository } from 'typeorm';
import { Todo } from '../entities/todo.entity';

@EntityRepository(Todo)
export class TodoRepository extends CoreRepository<Todo> {
  createMany(entitiesLike: DeepPartial<Todo>[]): Todo[] {
    const todos = entitiesLike.map(entity => this.create(entity));
    return todos;
  }
}
