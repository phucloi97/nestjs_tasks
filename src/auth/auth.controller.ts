import {
  Body,
  Controller,
  Get,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserDto } from './dto/user.dto';
import { UserPipe } from './pipes/user-validation.pipe';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post()
  //   @UsePipes(UserPipe)
  @UsePipes(new ValidationPipe({ transform: true }))
  getAuth(@Body() userDto: UserDto) {
    return this.authService.createUser(userDto);
  }
}
