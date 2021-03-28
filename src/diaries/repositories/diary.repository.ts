import { CoreRepository } from 'src/core/repositories/core.repository';
import { EntityRepository } from 'typeorm';
import { Diary } from '../entities/diary.entity';

@EntityRepository(Diary)
export class DiaryRepository extends CoreRepository<Diary> {}
