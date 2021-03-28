import { Field, InputType, ObjectType, PickType } from '@nestjs/graphql';
import { CoreResponse } from 'src/core/dtos/response.dto';
import { Diary } from '../entities/diary.entity';

@InputType()
export class UpdateDiaryArgs extends PickType(Diary, ['id', 'isSecret']) {}

@ObjectType()
export class UpdateDiaryResponse extends CoreResponse {
  @Field(type => Diary)
  result?: Diary;
}
