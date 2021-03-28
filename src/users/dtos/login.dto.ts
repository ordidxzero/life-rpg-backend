import { Field, InputType, ObjectType, PickType } from '@nestjs/graphql';
import { CoreResponse } from 'src/core/dtos/response.dto';
import { User } from '../entities/user.entity';

@InputType()
export class LoginArgs extends PickType(User, ['email', 'password']) {}

@ObjectType()
export class LoginResponse extends CoreResponse {
  @Field(type => String, { nullable: true })
  token?: string;
}
