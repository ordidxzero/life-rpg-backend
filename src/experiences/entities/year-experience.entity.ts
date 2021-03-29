import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';
import { IsInt, IsNumber, IsOptional } from 'class-validator';
import { User } from 'src/users/entities/user.entity';

@Entity()
@InputType({ isAbstract: true })
@ObjectType()
export class YearExperience {
  @PrimaryGeneratedColumn('uuid')
  @Field(type => String)
  id: string;

  @Column({ default: 1 })
  @IsInt()
  @IsOptional()
  @Field(type => Int, { nullable: true })
  level: number; // 누적 레벨, 기본값 1

  @Column({ default: 0 })
  @IsNumber()
  @IsOptional()
  @Field(type => Number, { nullable: true })
  exp: number; // 누적 경험치, 기본값 0

  @Column({ default: new Date().getFullYear() })
  @Field(type => Int, { nullable: true })
  year: number;

  @ManyToOne(type => User, user => user.experience, { onDelete: 'CASCADE' })
  @Field(type => User)
  user: User;
}
