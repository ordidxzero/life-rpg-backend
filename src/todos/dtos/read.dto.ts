import { Field, InputType, ObjectType, PickType } from '@nestjs/graphql';
import { CoreResponse } from 'src/core/dtos/response.dto';
import { Todo } from '../entities/todo.entity';

@InputType()
export class GetTodosArgs extends PickType(Todo, ['date']) {}

@ObjectType()
export class GetTodosResponse extends CoreResponse {
  @Field(type => [Todo], { nullable: true })
  result?: Todo[];
}
