import * as bcrypt from 'bcrypt';
import { Field, InputType, ObjectType, registerEnumType } from '@nestjs/graphql';
import { BeforeInsert, Column, CreateDateColumn, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Project } from 'src/projects/entities/project.entity';
import { InternalServerErrorException } from '@nestjs/common';
import { IsEmail, IsEnum, IsOptional, IsString } from 'class-validator';
import { Todo } from 'src/todos/entities/todo.entity';
import { Diary } from 'src/diaries/entities/diary.entity';
import { Experience } from 'src/experiences/entities/experience.entity';
import { YearExperience } from 'src/experiences/entities/year-experience.entity';

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

  @CreateDateColumn()
  @Field(type => Date)
  createdAt: Date;

  @Column()
  @Field(type => Date, { nullable: true, defaultValue: new Date() }) // 프론트엔드에서 date picker 구현 후 수정할 것
  birthDate: Date;

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

  @Column({ default: 'https://iupac.org/wp-content/uploads/2018/05/default-avatar.png' })
  @IsString()
  @IsOptional()
  @Field(type => String, { nullable: true })
  avatar: string; // 프로필 사진 -> social login의 avatar를 설정하거나 프로필 사진을 올릴 수 있도록 할 것

  @OneToMany(() => Project, project => project.user)
  @Field(type => [Project])
  projects: Project[];

  @OneToMany(() => Todo, todo => todo.user)
  @Field(type => [Todo])
  todos: Todo[];

  @OneToMany(() => Diary, diary => diary.user)
  @Field(type => [Diary])
  diaries: Diary[];

  @OneToOne(() => Experience, experience => experience.user)
  @Field(type => Experience)
  experience: Experience;

  @OneToMany(() => YearExperience, yearExperience => yearExperience.user)
  @Field(type => [YearExperience])
  yearExperiences: YearExperience[];

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
