import { Module } from '@nestjs/common';
import * as Joi from 'joi';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ProjectsModule } from './projects/projects.module';
import { User } from './users/entities/user.entity';
import { Project } from './projects/entities/project.entity';
import { Todo } from './projects/entities/todo.entity';
import { CoreModule } from './core/core.module';
import { JwtModule } from './jwt/jwt.module';
import { TodosModule } from './todos/todos.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        DB_HOST: Joi.string().required(),
        DB_PORT: Joi.string().required(),
        DB_USERNAME: Joi.string().required(),
        DB_PASSWORD: Joi.string().required(),
        DB_NAME: Joi.string().valid('life_rpg').required(),
        JWT_SECRET: Joi.string().required(),
      }),
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [User, Project, Todo],
      synchronize: true,
      logging: true,
    }),
    GraphQLModule.forRoot({ autoSchemaFile: true }),
    UsersModule,
    ProjectsModule,
    CoreModule,
    JwtModule,
    TodosModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
