import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AuthUser } from 'src/auth/auth.decorator';
import { AuthGuard } from 'src/auth/auth.guard';
import { User } from 'src/users/entities/user.entity';
import { CreateProjectArgs, CreateProjectResponse } from './dtos/create.dto';
import { DeleteProjectArgs, DeleteProjectResponse } from './dtos/delete.dto';
import { GetProjectsArgs, GetProjectsResponse } from './dtos/read.dto';
import { UpdateProjectArgs, UpdateProjectResponse } from './dtos/update.dto';
import { ProjectsService } from './projects.service';

@Resolver()
export class ProjectsResolver {
  constructor(private readonly projectsService: ProjectsService) {}

  // Require Login
  @Mutation(returns => CreateProjectResponse)
  @UseGuards(AuthGuard)
  async createProject(
    @AuthUser() authUser: User,
    @Args('args') args: CreateProjectArgs,
  ): Promise<CreateProjectResponse> {
    return this.projectsService.createProject(authUser, args);
  }

  @Query(returns => GetProjectsResponse)
  @UseGuards(AuthGuard)
  async getProjects(@AuthUser() authUser: User, @Args('args') args: GetProjectsArgs): Promise<GetProjectsResponse> {
    return this.projectsService.getProjects(authUser, args);
  }

  @Mutation(returns => GetProjectsResponse)
  @UseGuards(AuthGuard)
  async updateProject(@Args('args') args: UpdateProjectArgs): Promise<UpdateProjectResponse> {
    return this.projectsService.updateProject(args);
  }

  // Require Login
  @Mutation(returns => DeleteProjectResponse)
  @UseGuards(AuthGuard)
  async deleteProject(@Args('args') args: DeleteProjectArgs): Promise<DeleteProjectResponse> {
    return this.projectsService.deleteProject(args);
  }
}
