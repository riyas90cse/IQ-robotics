import {IsEmail, IsNotEmpty, IsOptional, IsString} from 'class-validator';

export class CreateUserDto {
  @IsOptional({
    groups: ['update']
  })
  @IsNotEmpty() @IsString() username: string;
  @IsOptional({
    groups: ['update']
  })
  @IsNotEmpty() @IsString() name: string;
  @IsOptional({
    groups: ['update']
  })
  @IsNotEmpty() @IsString() password: string;
  @IsOptional({
    groups: ['update']
  })
  @IsNotEmpty() @IsEmail() email: string;
}
