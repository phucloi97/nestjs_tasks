import { PipeTransform } from '@nestjs/common';
import { UserDto } from '../dto/user.dto';

export class UserPipe implements PipeTransform {
  transform(value: UserDto) {}
}
