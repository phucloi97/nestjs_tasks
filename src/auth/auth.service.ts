import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserDto } from './dto/user.dto';
import { User } from './user.entity';
import { UserRepository } from './user.repository';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository) private userRepository: UserRepository,
  ) {}
  async createUser(userDto: UserDto): Promise<any> {
    return await this.userRepository.signUp(userDto);
  }
  async signIn(userDto: UserDto): Promise<any> {
    return await this.userRepository.SignIn(userDto);
  }
}
