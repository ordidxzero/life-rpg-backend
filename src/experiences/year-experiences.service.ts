import { Injectable } from '@nestjs/common';
import { User } from 'src/users/entities/user.entity';
import { UpdateYearExperienceArgs, UpdateYearExperienceResponse } from './dtos/update.dto';
import { YearExperience } from './entities/year-experience.entity';
import { YearExperienceRepository } from './repositories/year-experience.repository';

@Injectable()
export class YearExperiencesService {
  constructor(private readonly yearExperiences: YearExperienceRepository) {}

  createYearExperience(user: User): Promise<YearExperience> {
    return this.yearExperiences.save(this.yearExperiences.create({ user }));
  }

  async updateYearLevel({ id, level }: UpdateYearExperienceArgs): Promise<UpdateYearExperienceResponse> {
    try {
      const yearExperience = await this.yearExperiences.updateOneAndReturn(id, { level });
      return { ok: true, statusCode: 200, result: yearExperience };
    } catch (error) {
      return { ok: false, statusCode: 400, message: error.message };
    }
  }

  async updateYearExp({ id, level, exp }: UpdateYearExperienceArgs): Promise<UpdateYearExperienceResponse> {
    try {
      const yearExperience = await this.yearExperiences.updateOneAndReturn(id, { exp });
      return { ok: true, statusCode: 200, result: yearExperience };
    } catch (error) {
      return { ok: false, statusCode: 400, message: error.message };
    }
  }

  async updateYearExperience({ id, level, exp }: UpdateYearExperienceArgs): Promise<UpdateYearExperienceResponse> {
    try {
      const yearExperience = await this.yearExperiences.updateOneAndReturn(id, {
        ...(level && { level }),
        ...(exp && { exp }),
      });
      return { ok: true, statusCode: 200, result: yearExperience };
    } catch (error) {
      return { ok: false, statusCode: 400, message: error.message };
    }
  }
}
