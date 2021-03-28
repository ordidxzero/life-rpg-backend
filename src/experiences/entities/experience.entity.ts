import { Field, Float, InputType, Int, ObjectType } from '@nestjs/graphql';
import { IsInt, IsOptional } from 'class-validator';
import { User } from 'src/users/entities/user.entity';
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@InputType({ isAbstract: true })
@ObjectType()
export class Experience {
  @PrimaryGeneratedColumn('uuid')
  @Field(type => String)
  id: string;

  @Column({ default: 1 })
  @IsInt()
  @IsOptional()
  @Field(type => Int, { nullable: true })
  level: number; // 현재 레벨, 기본값 1

  @Column({ default: 0 })
  @IsInt()
  @IsOptional()
  @Field(type => Int, { nullable: true })
  totalExp: number; // 현재까지 모은 누적 경험치, 기본값 0

  @Column({ default: 1 })
  @IsInt()
  @IsOptional()
  @Field(type => Float, { nullable: true })
  expIncreaseRate: number; // 경험치 상승률, 기본값 1

  @OneToOne(type => User, user => user.experience, { onDelete: 'CASCADE' })
  @JoinColumn()
  @Field(type => User)
  user: User;
}
