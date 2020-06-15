import { Module } from '@nestjs/common';
import { TaskController } from './task.controller';
import { TaskService } from './task.service';
import {TypeOrmModule} from '@nestjs/typeorm';
import {TaskEntity} from './task.entity';
import {AuthModule} from '../auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([TaskEntity]), AuthModule],
  controllers: [TaskController],
  providers: [TaskService],
  exports: [TypeOrmModule]
})
export class TaskModule {}
