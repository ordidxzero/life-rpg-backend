import { Field, InputType, ObjectType, PartialType, PickType } from '@nestjs/graphql';
import { CoreResponse } from 'src/core/dtos/response.dto';
import { Experience } from '../entities/experience.entity';

@InputType()
export class UpdateExperienceArgs extends PickType(PartialType(Experience), ['level', 'totalExp', 'expIncreaseRate']) {
  @Field(type => String)
  id: string;
}

@ObjectType()
export class UpdateExperienceResponse extends CoreResponse {
  @Field(type => Experience, { nullable: true })
  result?: Experience;
}
