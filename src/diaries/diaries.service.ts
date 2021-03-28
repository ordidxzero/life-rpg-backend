import { Injectable } from '@nestjs/common';
import { User } from 'src/users/entities/user.entity';
import { CreateDiaryArgs, CreateDiaryResponse } from './dtos/create.dto';
import { DeleteDiaryArgs, DeleteDiaryResponse } from './dtos/delete.dto';
import { GetDiariesArgs, GetDiariesResponse } from './dtos/read.dto';
import { UpdateDiaryArgs, UpdateDiaryResponse } from './dtos/update.dto';
import { DiaryRepository } from './repositories/diary.repository';

@Injectable()
export class DiariesService {
  constructor(private readonly diaries: DiaryRepository) {}

  async createDiary(authUser: User, diaryData: CreateDiaryArgs): Promise<CreateDiaryResponse> {
    try {
      const diary = await this.diaries.save(this.diaries.create({ ...diaryData, user: authUser }));
      return { ok: true, statusCode: 200, result: diary };
    } catch (error) {
      return { ok: false, statusCode: 400, message: error.message };
    }
  }

  async getDiaries(authUser: User, { isSecret }: GetDiariesArgs): Promise<GetDiariesResponse> {
    try {
      const diaries = await this.diaries.find({ where: { user: authUser, isSecret } });
      return { ok: true, statusCode: 200, result: diaries };
    } catch (error) {
      return { ok: false, statusCode: 400, message: error.message };
    }
  }

  async updateDiary({ id, isSecret }: UpdateDiaryArgs): Promise<UpdateDiaryResponse> {
    try {
      const diary = await this.diaries.updateOneAndReturn(id, { isSecret });
      return { ok: true, statusCode: 200, result: diary };
    } catch (error) {
      return { ok: false, statusCode: 400, message: error.message };
    }
  }

  async deleteDiary({ id }: DeleteDiaryArgs): Promise<DeleteDiaryResponse> {
    try {
      await this.diaries.delete(id);
      return { ok: true, statusCode: 200 };
    } catch (error) {
      return { ok: false, statusCode: 400, message: error.message };
    }
  }
}
