import {BadRequestException, HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {TaskEntity} from './task.entity';
import {FindOneOptions, Repository} from 'typeorm';
import {from, iif, Observable, of, throwError} from 'rxjs';
import {mergeMap} from 'rxjs/operators';
import {taskNotFound, userNotFound} from '../user/user-error-message.utils';
import {isNotEmpty} from 'class-validator';

@Injectable()
export class TaskService {
    constructor(
      @InjectRepository(TaskEntity) private readonly task: Repository<TaskEntity>
    ) {}

    findAll(userId?: string): Observable<TaskEntity[]> {
      return from(this.task.find(
        userId ? {where: {userId}} : undefined
      ));
    }

    findOne(options?: FindOneOptions): Observable<TaskEntity> {
      return from(
        this.task.findOne(options)
      );
    }

    findById(id: string): Observable<TaskEntity> {
      return this.findOne({where: {id}}).pipe(
        mergeMap(res => {
          return iif(
            () => res !== undefined,
            of(res),
            throwError(new HttpException({
              status: HttpStatus.NOT_FOUND,
              error: userNotFound(id)
            }, HttpStatus.NOT_FOUND))
          )
        })
      );
    }

    create(taskDto: Partial<TaskEntity>): Observable<TaskEntity> {
      const user: TaskEntity = this.task.create(taskDto);
      return this.findOne({where: {name: user.name}}).pipe(
        mergeMap(res => {
          return isNotEmpty(res)
            ?  throwError(
              new BadRequestException(`${taskDto.name} already exists`)
            )
            : from(
              this.task.save(user)
            )
        })
      );
    }

    update(id: string, task: Partial<TaskEntity>): Observable<void> {
      return from(
        this.task.update(id, task)
      ).pipe(
        mergeMap(
          res =>
            iif(
              () => res.affected === 0,
              throwError(
                new HttpException({
                  status: HttpStatus.NOT_FOUND,
                  error: taskNotFound(task.name, 'name'),
                }, HttpStatus.NOT_FOUND)
              ),
              of()
            )
        )
      );
    }

  delete(id: string): Observable<void> {
    return from(
      this.task.delete(id)
    ).pipe(
      mergeMap(res =>
        iif(
          () => res.affected === 0,
          throwError(
            new HttpException({
              status: HttpStatus.NOT_FOUND,
              error: userNotFound(id),
            }, HttpStatus.NOT_FOUND)
          ),
          of()
        )
      )
    )
  }

  count(userId: string): Observable<number> {
      return from(
        this.task.count({
          where: {userId}
        })
      )
  }
}
