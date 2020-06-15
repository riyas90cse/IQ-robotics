import {IsEmail, IsNotEmpty, IsString, IsUUID} from 'class-validator';

export class UserDto {
  @IsNotEmpty()  @IsUUID() id: string;
  @IsNotEmpty() @IsString() username: string;
  @IsNotEmpty() @IsString() name: string;
  @IsNotEmpty() @IsEmail() email: string;
}
