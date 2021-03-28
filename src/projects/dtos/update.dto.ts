import { Field, InputType, ObjectType, PartialType, PickType } from '@nestjs/graphql';
import { CoreResponse } from 'src/core/dtos/response.dto';
import { Project } from '../entities/project.entity';

@InputType()
export class UpdateProjectArgs extends PickType(PartialType(Project), [
  'area',
  'startDate',
  'endDate',
  'title',
  'description',
]) {
  @Field(type => String)
  id: string;
}

@ObjectType()
export class UpdateProjectResponse extends CoreResponse {
  @Field(type => Project, { nullable: true })
  result?: Project;
}
