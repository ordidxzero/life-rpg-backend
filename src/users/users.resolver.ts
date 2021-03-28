import { Mutation, Resolver } from '@nestjs/graphql';
import { CreateUserArgs, CreateUserResponse } from './dtos/create.dto';
import { LoginArgs, LoginResponse } from './dtos/login.dto';
import { UsersService } from './users.service';

@Resolver()
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Mutation(returns => CreateUserResponse)
  async createUser(args: CreateUserArgs): Promise<CreateUserResponse> {
    return this.usersService.createUser(args);
  }

  @Mutation(returns => LoginResponse)
  async login(args: LoginArgs): Promise<LoginResponse> {
    return this.usersService.login(args);
  }
}
