import { Field, InputType, ObjectType, PickType } from '@nestjs/graphql';
import { CoreResponse } from 'src/core/dtos/response.dto';
import { User } from '../entities/user.entity';

@InputType()
export class CreateUserArgs extends PickType(User, [
  'email',
  'password',
  'loginMethod',
  'nickname',
  'startDate',
  'avatar',
]) {}

@ObjectType()
export class CreateUserResponse extends CoreResponse {
  @Field(type => User)
  result?: User;
}
