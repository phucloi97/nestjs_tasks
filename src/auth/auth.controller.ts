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

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post('/signup')
  //   @UsePipes(UserPipe)
  @UsePipes(new ValidationPipe({ transform: true }))
  signUp(@Body() userDto: UserDto) {
    return this.authService.createUser(userDto);
  }
  @Post('/signin')
  @UsePipes(new ValidationPipe({ transform: true }))
  signIn(@Body() userDto: UserDto) {
    return this.authService.signIn(userDto);
  }
}
