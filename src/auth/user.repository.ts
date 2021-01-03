import { Repository, EntityRepository } from 'typeorm';
import { UserDto } from './dto/user.dto';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';
import {
  ConflictException,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async signUp(userDto: UserDto) {
    const { name, password } = userDto;
    const salt = await bcrypt.genSalt();
    const user = new User();
    user.salt = salt;
    user.name = name;
    user.password = await this.hashPassword(password, salt);
    try {
      await user.save();
    } catch (err) {
      if (err.code === '23505') {
        throw new ConflictException('user exist');
      } else throw new InternalServerErrorException();
    }
  }
  async SignIn(userDto: UserDto) {
    const { name, password } = userDto;
    const user = await this.findOne({ name: name });
    if (user) {
      const match = await this.hashPassword(password, user.salt);
      if (match) {
        return user;
      } else {
        throw new UnauthorizedException();
      }
    } else {
      return new UnauthorizedException();
    }
  }
  private async hashPassword(password: string, salt: string): Promise<string> {
    return await bcrypt.hash(password, salt);
  }
}
