import { CoreRepository } from 'src/core/repositories/core.repository';
import { EntityRepository } from 'typeorm';
import { Project } from '../entities/project.entity';

@EntityRepository(Project)
export class ProjectRepository extends CoreRepository<Project> {}
