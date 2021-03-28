import * as bcrypt from 'bcrypt';
import { Field, Float, InputType, Int, ObjectType, registerEnumType } from '@nestjs/graphql';
import { BeforeInsert, Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Project } from 'src/projects/entities/project.entity';
import { InternalServerErrorException } from '@nestjs/common';
import { IsEmail, IsEnum, IsInt, IsString } from 'class-validator';
import { Todo } from 'src/projects/entities/todo.entity';

enum LoginMethod {
  Local = 'local',
  Kakao = 'kakao',
  Naver = 'naver',
  Google = 'google',
  Github = 'github',
  Apple = 'apple',
}

registerEnumType(LoginMethod, { name: 'LoginMethod' });

@Entity()
@InputType({ isAbstract: true })
@ObjectType()
export class User {
  @PrimaryGeneratedColumn('uuid')
  @Field(type => String)
  id: string;

  @Column()
  @Field(type => Date)
  startDate: Date; // 사용자가 태어난 날짜 or 앱을 시작한 날짜로 정할 수 있음

  @Column()
  @IsString()
  @Field(type => String)
  nickname: string;

  @Column()
  @IsEmail()
  @Field(type => String)
  email: string; // Social Login의 Response로 들어오는 email 정보를 활용할 것 -> null인 경우 해결 방법도 생각해볼 것

  @Column()
  @IsString()
  @Field(type => String)
  password: string;

  @Column({ type: 'enum', enum: LoginMethod })
  @IsEnum(LoginMethod)
  @Field(type => LoginMethod)
  loginMethod: LoginMethod;

  @Column()
  @IsString()
  @Field(type => String)
  avatar: string; // 프로필 사진 -> social login의 avatar를 설정하거나 프로필 사진을 올릴 수 있도록 할 것

  @Column()
  @IsInt()
  @Field(type => Int, { nullable: true, defaultValue: 1 })
  level: number; // 현재 레벨, 기본값 1

  @Column()
  @IsInt()
  @Field(type => Int, { nullable: true, defaultValue: 0 })
  totalExp: number; // 현재까지 모은 누적 경험치, 기본값 0

  @Column()
  @IsInt()
  @Field(type => Float, { nullable: true, defaultValue: 1 })
  expIncreaseRate: number; // 경험치 상승률, 기본값 1

  @OneToMany(() => Project, project => project.user)
  @Field(type => [Project])
  projects: Project[];

  @OneToMany(() => Todo, todo => todo.user)
  @Field(type => [Todo])
  todos: Todo[];

  @BeforeInsert()
  async hashPassword() {
    try {
      this.password = await bcrypt.hash(this.password, 10);
      return;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async checkPassword(password: string) {
    try {
      const ok = await bcrypt.compare(password, this.password);
      return ok;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }
}
