import { Injectable } from '@nestjs/common';
import { ExperiencesService } from 'src/experiences/experiences.service';
import { JwtService } from 'src/jwt/jwt.service';
import { CreateUserArgs, CreateUserResponse } from './dtos/create.dto';
import { LoginArgs, LoginResponse } from './dtos/login.dto';
import { User } from './entities/user.entity';
import { UserRepository } from './repositories/user.repository';

@Injectable()
export class UsersService {
  constructor(
    private readonly users: UserRepository,
    private readonly jwtService: JwtService,
    private readonly experiencesService: ExperiencesService,
  ) {}

  findById(id: string): Promise<User> {
    return this.users.findOne({ id });
  }

  async createUser(args: CreateUserArgs): Promise<CreateUserResponse> {
    const { email } = args;
    try {
      const isExists = await this.users.exists({ where: { email } });
      if (isExists) {
        throw Error('User already exists with email');
      }
      const user = await this.users.save(this.users.create(args));
      await this.experiencesService.createExperience(user);
      return { ok: true, statusCode: 200, result: user };
    } catch (error) {
      return { ok: false, statusCode: 400, message: error.message };
    }
  }

  async login({ email, password }: LoginArgs): Promise<LoginResponse> {
    try {
      const user = await this.users.findOne({ where: { email } });
      if (!user) {
        throw Error('User not found');
      }
      const isPasswordMatch = await user.checkPassword(password);
      if (!isPasswordMatch) {
        throw Error('Password is wrong');
      }
      const token = this.jwtService.sign(user.id);
      return { ok: true, statusCode: 200, token };
    } catch (error) {
      return { ok: false, statusCode: 400, message: error.message };
    }
  }
}
