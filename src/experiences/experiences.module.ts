import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Experience } from './entities/experience.entity';
import { YearExperience } from './entities/year-experience.entity';
import { ExperiencesResolver } from './experiences.resolver';
import { ExperiencesService } from './experiences.service';
import { ExperienceRepository } from './repositories/experience.repository';
import { YearExperienceRepository } from './repositories/year-experience.repository';
import { YearExperiencesService } from './year-experiences.service';

@Module({
  imports: [TypeOrmModule.forFeature([Experience, YearExperience, ExperienceRepository, YearExperienceRepository])],
  providers: [ExperiencesService, YearExperiencesService, ExperiencesResolver],
  exports: [ExperiencesService],
})
@Global()
export class ExperiencesModule {}
