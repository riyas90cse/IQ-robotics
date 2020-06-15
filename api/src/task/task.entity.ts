import {BeforeInsert, Column, Entity, OneToOne, PrimaryGeneratedColumn} from 'typeorm';
import {IsNotEmpty, IsOptional, IsString} from 'class-validator';
import {UserEntity} from '../user/user.entity';
import {v4 as uuidv4} from 'uuid';

@Entity({
  name: 'tasks'
})
export class TaskEntity {
  @PrimaryGeneratedColumn('uuid')
  @Column({
    type: 'uuid',
    nullable: false,
    primary: true
  })
  @IsOptional({
    groups: ['update']
  })
  id: string;

  @Column({
    type: 'varchar',
    unique: true,
    name: 'taskname',
    nullable: false
  })
  @IsOptional({
    groups: ['update']
  })
  @IsString()
  @IsNotEmpty()
  name: string

  @Column({
    type: 'text',
    name: 'status',
    nullable: false
  })
  @IsOptional({
    groups: ['update']
  })
  @IsString() @IsNotEmpty()
  status: string

  @Column({
    name: 'taskdetail',
    type: 'varchar'
  })
  @IsOptional({
    groups: ['update']
  })
  @IsString()
  details: string

  @Column({
    name: 'comments',
    type: 'varchar'
  })
  @IsOptional({
    groups: ['update']
  })
  @IsString()
  comments: string

  @Column({
    name: 'userid',
    nullable: false,
    unique: false
  })
  @IsOptional({
    groups: ['update']
  })
  @OneToOne(() => UserEntity, user => user.id)
  @IsString() @IsNotEmpty()
  userId: string

  @BeforeInsert()
  async hashing?(): Promise<void> {
    this.id = uuidv4();
  }
}
