import { Injectable } from '@nestjs/common';
import { TodoRepository } from 'src/todos/repositories/todo.repository';
import { CreateProjectArgs, CreateProjectResponse } from './dtos/create.dto';
import { DeleteProjectArgs, DeleteProjectResponse } from './dtos/delete.dto';
import { UpdateProjectArgs, UpdateProjectResponse } from './dtos/update.dto';
import { ProjectRepository } from './repositories/project.repository';

@Injectable()
export class ProjectsService {
  constructor(private readonly todos: TodoRepository, private readonly projects: ProjectRepository) {}
  hi() {
    return 'Hello World!';
  }

  async createProject({ ...projectData }: CreateProjectArgs): Promise<CreateProjectResponse> {
    try {
      const project = await this.projects.save(this.projects.create(projectData));
      return { ok: true, statusCode: 200, result: project };
    } catch (error) {
      return { ok: false, statusCode: 400, message: error.message };
    }
  }

  async updateProject({
    id,
    area,
    title,
    startDate,
    endDate,
    description,
  }: UpdateProjectArgs): Promise<UpdateProjectResponse> {
    try {
      const project = await this.projects.updateOneAndReturn(id, {
        ...(title && { title }),
        ...(description && { description }),
        ...(area && { area }),
        ...(startDate && { startDate }),
        ...(endDate && { endDate }),
      });
      return { ok: true, statusCode: 200, result: project };
    } catch (error) {
      return { ok: false, statusCode: 400, message: error.message };
    }
  }

  async deleteProject({ id }: DeleteProjectArgs): Promise<DeleteProjectResponse> {
    try {
      await this.projects.delete(id);
      return { ok: true, statusCode: 200 };
    } catch (error) {
      return { ok: false, statusCode: 400, message: error.message };
    }
  }
}
