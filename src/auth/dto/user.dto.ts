import { IsString, MaxLength, MinLength } from 'class-validator';

export class UserDto {
  @IsString()
  @MinLength(3)
  name: string;
  @IsString()
  @MinLength(6)
  @MaxLength(16)
  password: string;
}
