import { Injectable } from '@nestjs/common';
import { TodoRepository } from 'src/todos/repositories/todo.repository';
import { CreateTodoArgs, CreateTodoResponse } from './dtos/create.dto';
import { DeleteTodoArgs, DeleteTodoResponse } from './dtos/delete.dto';
import { UpdateTodoArgs, UpdateTodoResponse } from './dtos/update.dto';
import { ProjectRepository } from 'src/projects/repositories/project.repository';

@Injectable()
export class TodosService {
  constructor(private readonly todos: TodoRepository, private readonly projects: ProjectRepository) {}

  async createTodo({ projectId, ...todoData }: CreateTodoArgs): Promise<CreateTodoResponse> {
    try {
      const project = await this.projects.findOne({ id: projectId });
      const todo = await this.todos.save(this.todos.create({ ...todoData, project }));
      return { ok: true, result: todo, statusCode: 200 };
    } catch (error) {
      return { ok: false, statusCode: 400, message: error.message };
    }
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
