import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { TaskModule } from './task/task.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import {configService} from './config.service';
import {Connection} from 'typeorm';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    UserModule, 
    TaskModule,
    // TypeOrmModule.forRoot({
    //   type: 'mysql',
    //   host: 'SG-mysqldb-2521-master.servers.mongodirector.com',
    //   port: 3306,
    //   username: 'sgroot',
    //   password: 'qUAiNIb7s5NHzk_w',
    //   database: 'user-task-criud',
    //   entities: [UserEntity],
    //   synchronize: true,
    //   autoLoadEntities: true
    // }),
    TypeOrmModule.forRoot(configService.getTypeOrmConfig()),
    AuthModule
  ],
  controllers: [AppController],
  providers: [AppService],
  exports: [UserModule]
})
export class AppModule {
  constructor(private connection: Connection) {}
}
