import {UserEntity} from '../user/user.entity';
import {UserDto} from '../user/user.dto';

export function toUserDto(data: UserEntity): UserDto {
  const { id, username, email, name } = data;
  return  {id, username, email, name};
}
