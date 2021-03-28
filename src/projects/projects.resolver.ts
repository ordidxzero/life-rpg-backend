import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateProjectArgs, CreateProjectResponse } from './dtos/create.dto';
import { DeleteProjectArgs, DeleteProjectResponse } from './dtos/delete.dto';
import { ProjectsService } from './projects.service';

@Resolver()
export class ProjectsResolver {
  constructor(private readonly projectsService: ProjectsService) {}

  @Query(returns => String)
  hi() {
    return this.projectsService.hi();
  }

  // Require Login
  @Mutation(returns => CreateProjectResponse)
  async createProject(@Args('args') args: CreateProjectArgs): Promise<CreateProjectResponse> {
    return this.projectsService.createProject(args);
  }

  // Require Login
  @Mutation(returns => DeleteProjectResponse)
  async deleteProject(@Args('args') args: DeleteProjectArgs): Promise<DeleteProjectResponse> {
    return this.projectsService.deleteProject(args);
  }
}
