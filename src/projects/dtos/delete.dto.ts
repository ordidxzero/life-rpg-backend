import { InputType, ObjectType, PickType } from '@nestjs/graphql';
import { CoreResponse } from 'src/core/dtos/response.dto';
import { Project } from '../entities/project.entity';

@InputType()
export class DeleteProjectArgs extends PickType(Project, ['id']) {}

@ObjectType()
export class DeleteProjectResponse extends CoreResponse {}
