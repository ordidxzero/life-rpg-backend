import { InputType, ObjectType, PickType } from '@nestjs/graphql';
import { CoreResponse } from 'src/core/dtos/response.dto';
import { Todo } from '../entities/todo.entity';

@InputType()
export class DeleteTodoArgs extends PickType(Todo, ['id']) {}

@ObjectType()
export class DeleteTodoResponse extends CoreResponse {}
