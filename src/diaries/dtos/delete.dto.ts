import { InputType, ObjectType, PickType } from '@nestjs/graphql';
import { CoreResponse } from 'src/core/dtos/response.dto';
import { Diary } from '../entities/diary.entity';

@InputType()
export class DeleteDiaryArgs extends PickType(Diary, ['id']) {}

@ObjectType()
export class DeleteDiaryResponse extends CoreResponse {}
