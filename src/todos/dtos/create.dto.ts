import { Field, InputType, ObjectType, PickType } from '@nestjs/graphql';
import { CoreResponse } from 'src/core/dtos/response.dto';
import { Todo } from '../entities/todo.entity';

@InputType()
export class CreateTodoArgs extends PickType(Todo, ['name', 'description', 'date', 'startTime', 'endTime']) {
  @Field(type => String, { nullable: true })
  projectId?: string;
}

@ObjectType()
export class CreateTodoResponse extends CoreResponse {
  @Field(type => Todo, { nullable: true })
  result?: Todo;
}
