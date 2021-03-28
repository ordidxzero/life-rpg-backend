import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class CoreResponse {
  @Field(type => Boolean)
  ok: boolean;

  @Field(type => Int)
  statusCode: number;

  @Field(type => String, { nullable: true })
  message?: string;
}
