import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import * as Joi from 'joi';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ProjectsModule } from './projects/projects.module';
import { User } from './users/entities/user.entity';
import { Project } from './projects/entities/project.entity';
import { Todo } from './todos/entities/todo.entity';
import { JwtModule } from './jwt/jwt.module';
import { TodosModule } from './todos/todos.module';
import { JwtMiddleware } from './jwt/jwt.middlewares';
import { AuthModule } from './auth/auth.module';
import { DiariesModule } from './diaries/diaries.module';
import { Diary } from './diaries/entities/diary.entity';
import { ExperiencesModule } from './experiences/experiences.module';
import { Experience } from './experiences/entities/experience.entity';

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
      entities: [User, Project, Todo, Diary, Experience],
      synchronize: true,
      logging: true,
    }),
    GraphQLModule.forRoot({
      autoSchemaFile: true,
      context: ({ req }) => ({ user: req.user }),
    }),
    JwtModule.forRoot({ jwtSecretKey: process.env.JWT_SECRET }),
    UsersModule,
    ProjectsModule,
    TodosModule,
    AuthModule,
    DiariesModule,
    ExperiencesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(JwtMiddleware).forRoutes({ path: '/graphql', method: RequestMethod.POST });
  }
}
