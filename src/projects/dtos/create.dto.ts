import { Field, InputType, ObjectType, PickType } from '@nestjs/graphql';
import { CoreResponse } from 'src/core/dtos/response.dto';
import { Project } from '../entities/project.entity';

@InputType()
export class CreateProjectArgs extends PickType(Project, ['title', 'area', 'startDate', 'endDate']) {}

@ObjectType()
export class CreateProjectResponse extends CoreResponse {
  @Field(type => Project, { nullable: true })
  result?: Project;
}
