import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver, Query } from '@nestjs/graphql';
import { AuthUser } from 'src/auth/auth.decorator';
import { AuthGuard } from 'src/auth/auth.guard';
import { User } from 'src/users/entities/user.entity';
import { CreateTodoArgs, CreateTodoResponse } from './dtos/create.dto';
import { DeleteTodoArgs, DeleteTodoResponse } from './dtos/delete.dto';
import { GetTodosArgs, GetTodosResponse } from './dtos/read.dto';
import { UpdateTodoArgs, UpdateTodoResponse } from './dtos/update.dto';
import { TodosService } from './todos.service';

@Resolver()
export class TodosResolver {
  constructor(private readonly todosService: TodosService) {}

  // Require Login
  @Mutation(returns => CreateTodoResponse)
  @UseGuards(AuthGuard)
  async createTodo(@AuthUser() authUser: User, @Args('args') args: CreateTodoArgs): Promise<CreateTodoResponse> {
    return this.todosService.createTodo(authUser, args);
  }

  @Query(returns => GetTodosResponse)
  @UseGuards(AuthGuard)
  async getTodos(@AuthUser() authUser: User, @Args('args') args: GetTodosArgs): Promise<GetTodosResponse> {
    return this.todosService.getTodos(authUser, args);
  }

  // Require Login
  @Mutation(returns => UpdateTodoResponse)
  @UseGuards(AuthGuard)
  async updateTodo(@Args('args') args: UpdateTodoArgs): Promise<UpdateTodoResponse> {
    return this.todosService.updateTodo(args);
  }

  // Require Login
  @Mutation(returns => DeleteTodoResponse)
  @UseGuards(AuthGuard)
  async deleteTodo(@Args('args') args: DeleteTodoArgs): Promise<DeleteTodoResponse> {
    return this.todosService.deleteTodo(args);
  }
}
