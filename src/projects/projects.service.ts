import { Injectable } from '@nestjs/common';
import { User } from 'src/users/entities/user.entity';
import { CreateProjectArgs, CreateProjectResponse } from './dtos/create.dto';
import { DeleteProjectArgs, DeleteProjectResponse } from './dtos/delete.dto';
import { UpdateProjectArgs, UpdateProjectResponse } from './dtos/update.dto';
import { GetProjectsArgs, GetProjectsResponse } from './dtos/read.dto';
import { ProjectRepository } from './repositories/project.repository';

@Injectable()
export class ProjectsService {
  constructor(private readonly projects: ProjectRepository) {}

  async createProject(authUser: User, { ...projectData }: CreateProjectArgs): Promise<CreateProjectResponse> {
    try {
      const project = await this.projects.save(this.projects.create({ ...projectData, user: authUser }));
      return { ok: true, statusCode: 200, result: project };
    } catch (error) {
      return { ok: false, statusCode: 400, message: error.message };
    }
  }

  async getProjects(authUser: User, { done }: GetProjectsArgs): Promise<GetProjectsResponse> {
    try {
      const projects = await this.projects.find({ where: { user: authUser, done } });
      return { ok: true, statusCode: 200, result: projects };
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
