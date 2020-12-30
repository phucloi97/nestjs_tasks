import { Optional } from '@nestjs/common';
import { Max, Min } from 'class-validator';

export class UserDto {
  name: string;
  @Optional()
  @Min(8)
  @Max(16)
  password: string;
}
