import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DiariesResolver } from './diaries.resolver';
import { DiariesService } from './diaries.service';
import { Diary } from './entities/diary.entity';
import { DiaryRepository } from './repositories/diary.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Diary, DiaryRepository])],
  providers: [DiariesService, DiariesResolver],
})
export class DiariesModule {}
