import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Experience } from './entities/experience.entity';
import { ExperiencesResolver } from './experiences.resolver';
import { ExperiencesService } from './experiences.service';
import { ExperienceRepository } from './repositories/experience.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Experience, ExperienceRepository])],
  providers: [ExperiencesService, ExperiencesResolver],
  exports: [ExperiencesService],
})
@Global()
export class ExperiencesModule {}
