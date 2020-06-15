import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {UserService} from '../user/user.service';
import {JwtService} from '@nestjs/jwt';
import {UserDto} from '../user/user.dto';
import {CreateUserDto} from '../user/create-user.dto';
import {LoginUserDto} from '../user/login-user.dto';
import {JwtPayload} from './jwt-stratergy.service';
import {Observable, of} from 'rxjs';
import {catchError, map} from 'rxjs/operators';

@Injectable()
export class AuthService {

  constructor(
    private userService: UserService,
    private readonly jwtService: JwtService
  ) {
  }
  register(userDto: CreateUserDto): Observable<RegistrationStatus> {
    return this.userService.create(userDto)
      .pipe(
        map(() => {
          return {
            success: true,
            message: 'user registered'
          }
        }),
        catchError(err => {
          return of({
            success: false,
            message: err,
          })
        })
      );
  }

  login(loginUserDto: LoginUserDto): Observable<LoginStatus> {
    return this.userService.findByLogin(loginUserDto).pipe(
      map(user => {
        const token = this._createToken(user);
        return {
          username: user.username, userId: user.id, ...token,
        };
      })
    );
  }

  async validateUser(payload: JwtPayload): Promise<UserDto> {
    const user = await this.userService.findByPayload(payload).toPromise();
    if (!user) {
      throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
    }
    return user;
  }

  private _createToken({ username }: UserDto): any {
    const user: JwtPayload = { username };
    const accessToken = this.jwtService.sign(user);
    return {
      expiresIn: process.env.EXPIRESIN,
      accessToken,
    };
  }
}


export interface RegistrationStatus {
  success: boolean;
  message: string;
}

export interface LoginStatus {
  username: string;
  userId: string
  expiresIn: number;
  accessToken: string;
}
