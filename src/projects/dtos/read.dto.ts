import { Field, InputType, ObjectType, PickType } from '@nestjs/graphql';
import { CoreResponse } from 'src/core/dtos/response.dto';
import { Project } from '../entities/project.entity';

@InputType()
export class GetProjectsArgs extends PickType(Project, ['done']) {}

@ObjectType()
export class GetProjectsResponse extends CoreResponse {
  @Field(type => [Project], { nullable: true })
  result?: Project[];
}
