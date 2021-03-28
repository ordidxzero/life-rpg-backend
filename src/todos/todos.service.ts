import { Injectable } from '@nestjs/common';
import { TodoRepository } from 'src/todos/repositories/todo.repository';
import { CreateTodoArgs, CreateTodoResponse } from './dtos/create.dto';
import { DeleteTodoArgs, DeleteTodoResponse } from './dtos/delete.dto';
import { UpdateTodoArgs, UpdateTodoResponse } from './dtos/update.dto';
import { ProjectRepository } from 'src/projects/repositories/project.repository';
import { GetTodosArgs, GetTodosResponse } from './dtos/read.dto';
import { Between } from 'typeorm';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class TodosService {
  constructor(private readonly todos: TodoRepository, private readonly projects: ProjectRepository) {}

  async createTodo(authUser: User, { projectId, ...todoData }: CreateTodoArgs): Promise<CreateTodoResponse> {
    try {
      const project = await this.projects.findOne({ id: projectId });
      const todo = await this.todos.save(this.todos.create({ ...todoData, project, user: authUser }));
      return { ok: true, result: todo, statusCode: 200 };
    } catch (error) {
      return { ok: false, statusCode: 400, message: error.message };
    }
  }

  async getTodos(authUser: User, { date }: GetTodosArgs): Promise<GetTodosResponse> {
    const today = new Date(date.setHours(0, 0, 0, 0));
    const tomorrow = new Date(date.setHours(24, 0, 0, 0));
    const todos = await this.todos.find({ where: { date: Between(today, tomorrow), user: authUser } });
    return { ok: true, statusCode: 200, result: todos };
  }

  async updateTodo({
    name,
    done,
    description,
    id,
    startTime,
    endTime,
    date,
    projectId,
  }: UpdateTodoArgs): Promise<UpdateTodoResponse> {
    try {
      const project = await this.projects.findOne({ id: projectId });
      const todo = await this.todos.updateOneAndReturn(id, {
        ...(name && { name }),
        ...(done && { done }),
        ...(description && { description }),
        ...(startTime && { startTime }),
        ...(endTime && { endTime }),
        ...(date && { date }),
        ...(projectId && { project }),
      });
      return { ok: true, statusCode: 200, result: todo };
    } catch (error) {
      return { ok: false, statusCode: 400, message: error.message };
    }
  }

  async deleteTodo({ id }: DeleteTodoArgs): Promise<DeleteTodoResponse> {
    try {
      await this.todos.delete(id);
      return { ok: true, statusCode: 200 };
    } catch (error) {
      return { ok: false, statusCode: 400, message: error.message };
    }
  }
}
