import {
  Body,
  Controller,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { UserDto } from './dto/user.dto';
import { GetUser } from './get-user.decorator';
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
  @Post('/test')
  @UseGuards(AuthGuard())
  test(@GetUser() user) {
    console.log(user);
  }
}
