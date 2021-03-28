import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TodoRepository } from 'src/todos/repositories/todo.repository';
import { Project } from './entities/project.entity';
import { ProjectsResolver } from './projects.resolver';
import { ProjectsService } from './projects.service';
import { ProjectRepository } from './repositories/project.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Project, ProjectRepository, TodoRepository])],
  providers: [ProjectsService, ProjectsResolver],
})
export class ProjectsModule {}
