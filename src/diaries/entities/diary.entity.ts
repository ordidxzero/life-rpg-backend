import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { IsBoolean, IsOptional } from 'class-validator';
import { User } from 'src/users/entities/user.entity';
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@InputType({ isAbstract: true })
@ObjectType()
export class Diary {
  @PrimaryGeneratedColumn('uuid')
  @Field(type => String)
  id: string;

  @CreateDateColumn()
  @Field(type => Date)
  createdAt: Date;

  @Column()
  @Field(type => String)
  title: string;

  @Column()
  @Field(type => String)
  body: string;

  @Column({ default: false })
  @IsBoolean()
  @IsOptional()
  @Field(type => Boolean, { nullable: true })
  isSecret: boolean;

  @ManyToOne(() => User, user => user.diaries)
  user: User;
}
