import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';
import { Todo } from 'src/todos/entities/todo.entity';
import { User } from 'src/users/entities/user.entity';
import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@InputType({ isAbstract: true })
@ObjectType()
export class Project {
  @PrimaryGeneratedColumn('uuid')
  @Field(type => String)
  id: string;

  @CreateDateColumn()
  @Field(type => Date)
  createdAt: Date; // 프로젝트 생성 날짜

  @Column()
  @Field(type => Date, { nullable: true })
  startDate?: Date; // 프로젝트 시작 날짜

  @Column()
  @Field(type => Date)
  endDate: Date; // 프로젝트 마감 날짜

  @Column()
  @Field(type => String)
  title: string; // 프로젝트 타이틀

  @Column()
  @Field(type => String)
  description: string; // 프로젝트 설명

  @Column()
  @Field(type => String)
  area: string; // 분야를 설정해서 radar graph로 분야별 경험치를 표시해주면 좋을 듯

  @Column()
  @Field(type => Int, { nullable: true, defaultValue: 0 })
  exp: number; // 프로젝트를 통해서 얻은 경험치

  @Column()
  @Field(type => Boolean, { defaultValue: false })
  done: boolean;

  @ManyToOne(() => User, user => user.projects)
  user: User;

  @OneToMany(() => Todo, todo => todo.project)
  todos: Todo[];
}
