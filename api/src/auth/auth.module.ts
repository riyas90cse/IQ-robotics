import {forwardRef, Module} from '@nestjs/common';
import {PassportModule} from '@nestjs/passport';
import {UserModule} from '../user/user.module';
import {JwtModule} from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import {JwtStratergy} from './jwt-stratergy.service';

@Module({
  imports: [
    forwardRef(() => UserModule),
    PassportModule.register({
      defaultStrategy: 'jwt',
      property: 'user',
      session: false,
    }),
    JwtModule.register({
      secret: process.env.SECRETKEY, signOptions: {
        expiresIn: process.env.EXPIRESIN,
      },
    }),
  ],
  providers: [AuthService, JwtStratergy],
  exports: [
    PassportModule,
    JwtModule
  ],
  controllers: [AuthController],
})
export class AuthModule {}
