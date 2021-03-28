import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Project } from 'src/projects/entities/project.entity';
import { User } from 'src/users/entities/user.entity';

@Entity()
@InputType({ isAbstract: true })
@ObjectType()
export class Todo {
  @PrimaryGeneratedColumn('uuid')
  @Field(type => String)
  id: string;

  @Column()
  @Field(type => String)
  name: string;

  @Column()
  @Field(type => String)
  description: string;

  @Column()
  @Field(type => Date)
  date: Date;

  @Column({ nullable: true })
  @Field(type => String, { nullable: true })
  startTime?: string;

  @Column({ nullable: true })
  @Field(type => String, { nullable: true })
  endTime?: string;

  @Column()
  @Field(type => Boolean, { nullable: true, defaultValue: false })
  done: boolean;

  @ManyToOne(() => Project, project => project.todos, { nullable: true })
  @Field(type => Project, { nullable: true })
  project?: Project;

  @ManyToOne(() => User, user => user.todos)
  @Field(type => User)
  user: User;
}
