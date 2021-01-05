import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { JwtPayload } from './jwt-payload.interface';
import { UserRepository } from './user.repository';

@Injectable()
export class JwtStratery extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(UserRepository) private userRepository: UserRepository,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'mstart',
    });
  }
  async validate(payload: JwtPayload) {
    //function nayf gan user vao req giong middleware ben express
    console.log('[stratary]: trigger');
    let { name } = payload;
    const user = await this.userRepository.findOne({ name });
    if (user) {
      return user;
    } else {
      throw new UnauthorizedException();
    }
  }
}
