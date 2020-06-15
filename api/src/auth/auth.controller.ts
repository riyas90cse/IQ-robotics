import {Body, Controller, HttpException, HttpStatus, Post} from '@nestjs/common';
import {AuthService, LoginStatus, RegistrationStatus} from './auth.service';
import {CreateUserDto} from '../user/create-user.dto';
import {iif, Observable, of, throwError} from 'rxjs';
import {mergeMap} from 'rxjs/operators';
import {LoginUserDto} from '../user/login-user.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService
  ) {
  }
  @Post('register')
  register(@Body() createUserDto: CreateUserDto): Observable<RegistrationStatus> {
    return this.authService.register(createUserDto).pipe(
      mergeMap(
        result =>
        iif(
          () => result.success,
          of(result),
          throwError(
            new HttpException({
              error: result.message,
              status: HttpStatus.BAD_REQUEST
            }, HttpStatus.BAD_REQUEST)
          )
        )
      )
    )
  }

  @Post('login')
  login(@Body() loginUserDto: LoginUserDto): Observable<LoginStatus> {
    return this.authService.login(loginUserDto);
  }
}
