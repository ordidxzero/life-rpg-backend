import { CoreRepository } from 'src/core/repositories/core.repository';
import { EntityRepository } from 'typeorm';
import { Experience } from '../entities/experience.entity';

@EntityRepository(Experience)
export class ExperienceRepository extends CoreRepository<Experience> {}
