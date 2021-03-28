import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectRepository } from 'src/projects/repositories/project.repository';
import { Todo } from './entities/todo.entity';
import { TodoRepository } from './repositories/todo.repository';
import { TodosResolver } from './todos.resolver';
import { TodosService } from './todos.service';

@Module({
  imports: [TypeOrmModule.forFeature([Todo, TodoRepository, ProjectRepository])],
  providers: [TodosService, TodosResolver],
})
export class TodosModule {}
