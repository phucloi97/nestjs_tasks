import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { UserDto } from './dto/user.dto';
import { JwtPayload } from './jwt-payload.interface';
import { UserRepository } from './user.repository';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository) private userRepository: UserRepository,
    private jwtService: JwtService,
  ) {}
  async createUser(userDto: UserDto): Promise<any> {
    return await this.userRepository.signUp(userDto);
  }
  async signIn(userDto: UserDto): Promise<{ accessToken: string }> {
    const name: string = await this.userRepository.SignIn(userDto);
    const payload: JwtPayload = { name };
    const accessToken: string = await this.jwtService.sign(payload);
    return { accessToken };
  }
}
