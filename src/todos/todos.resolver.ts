import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { CreateTodoArgs, CreateTodoResponse } from './dtos/create.dto';
import { DeleteTodoArgs, DeleteTodoResponse } from './dtos/delete.dto';
import { UpdateTodoArgs, UpdateTodoResponse } from './dtos/update.dto';
import { TodosService } from './todos.service';

@Resolver()
export class TodosResolver {
  constructor(private readonly todosService: TodosService) {}

  // Require Login
  @Mutation(returns => CreateTodoResponse)
  async createTodo(@Args('args') args: CreateTodoArgs): Promise<CreateTodoResponse> {
    return this.todosService.createTodo(args);
  }

  // Require Login
  @Mutation(returns => UpdateTodoResponse)
  async updateTodo(@Args('args') args: UpdateTodoArgs): Promise<UpdateTodoResponse> {
    return this.todosService.updateTodo(args);
  }

  // Require Login
  @Mutation(returns => DeleteTodoResponse)
  async deleteTodo(@Args('args') args: DeleteTodoArgs): Promise<DeleteTodoResponse> {
    return this.todosService.deleteTodo(args);
  }
}
