import { IsEmail } from 'class-validator';

export class CreateTaskdto {
  @IsEmail()
  title: string;
  description: string;
}
