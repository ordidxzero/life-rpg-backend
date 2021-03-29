import { Field, InputType, ObjectType, PartialType, PickType } from '@nestjs/graphql';
import { CoreResponse } from 'src/core/dtos/response.dto';
import { Experience } from '../entities/experience.entity';
import { YearExperience } from '../entities/year-experience.entity';

@InputType()
export class UpdateExperienceArgs extends PickType(PartialType(Experience), ['level', 'exp', 'expIncreaseRate']) {
  @Field(type => String)
  id: string;
}
@InputType()
export class UpdateYearExperienceArgs extends PickType(PartialType(YearExperience), ['level', 'exp']) {
  @Field(type => String)
  id: string;
}

@ObjectType()
export class UpdateExperienceResponse extends CoreResponse {
  @Field(type => Experience, { nullable: true })
  result?: Experience;
}
@ObjectType()
export class UpdateYearExperienceResponse extends CoreResponse {
  @Field(type => YearExperience, { nullable: true })
  result?: YearExperience;
}
