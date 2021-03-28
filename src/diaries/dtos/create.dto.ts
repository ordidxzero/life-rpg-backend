import { Field, InputType, ObjectType, PickType } from '@nestjs/graphql';
import { CoreResponse } from 'src/core/dtos/response.dto';
import { Diary } from '../entities/diary.entity';

@InputType()
export class CreateDiaryArgs extends PickType(Diary, ['title', 'body', 'isSecret']) {}

@ObjectType()
export class CreateDiaryResponse extends CoreResponse {
  @Field(type => Diary, { nullable: true })
  result?: Diary;
}
