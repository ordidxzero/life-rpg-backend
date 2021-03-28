import { Field, InputType, ObjectType, PickType } from '@nestjs/graphql';
import { CoreResponse } from 'src/core/dtos/response.dto';
import { Diary } from '../entities/diary.entity';

@InputType()
export class GetDiariesArgs extends PickType(Diary, ['isSecret']) {}

@ObjectType()
export class GetDiariesResponse extends CoreResponse {
  @Field(type => [Diary])
  result?: Diary[];
}
