import { Field, InputType, ObjectType, PartialType, PickType } from '@nestjs/graphql';
import { CoreResponse } from 'src/core/dtos/response.dto';
import { Todo } from '../entities/todo.entity';

@InputType()
export class UpdateTodoArgs extends PickType(PartialType(Todo), [
  'name',
  'description',
  'date',
  'startTime',
  'endTime',
  'done',
]) {
  @Field(type => String)
  id: string;
  @Field(type => String, { nullable: true })
  projectId?: string;
}

@ObjectType()
export class UpdateTodoResponse extends CoreResponse {
  @Field(type => Todo, { nullable: true })
  result?: Todo;
}
