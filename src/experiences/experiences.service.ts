import { Injectable } from '@nestjs/common';
import { User } from 'src/users/entities/user.entity';
import { UpdateExperienceArgs, UpdateExperienceResponse } from './dtos/update.dto';
import { Experience } from './entities/experience.entity';
import { ExperienceRepository } from './repositories/experience.repository';

@Injectable()
export class ExperiencesService {
  constructor(private readonly experiences: ExperienceRepository) {}

  createExperience(user: User): Promise<Experience> {
    return this.experiences.save(this.experiences.create({ user }));
  }

  async updateExperience({
    id,
    level,
    totalExp,
    expIncreaseRate,
  }: UpdateExperienceArgs): Promise<UpdateExperienceResponse> {
    try {
      const experience = await this.experiences.updateOneAndReturn(id, {
        ...(level && { level }),
        ...(totalExp && { totalExp }),
        ...(expIncreaseRate && { expIncreaseRate }),
      });
      return { ok: true, statusCode: 200, result: experience };
    } catch (error) {
      return { ok: false, statusCode: 400, message: error.message };
    }
  }
}
