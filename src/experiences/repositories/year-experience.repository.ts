import { CoreRepository } from 'src/core/repositories/core.repository';
import { EntityRepository } from 'typeorm';
import { YearExperience } from '../entities/year-experience.entity';

@EntityRepository(YearExperience)
export class YearExperienceRepository extends CoreRepository<YearExperience> {}
