import { Module } from '@nestjs/common';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStratery } from './jwt.stratery';
import { UserRepository } from './user.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserRepository]),
    PassportModule.register({ defaultStrategy: 'jwt' }), //config passport su dung strategy jwt
    JwtModule.register({
      //config jwt
      secret: 'mstart',
      signOptions: {
        expiresIn: 3600,
      },
    }),
  ], // truyen vao repository not entity
  controllers: [AuthController],
  providers: [AuthService, JwtStratery],
  exports: [PassportModule], //cac dich vu nay se duoc su dung chung khi import module
})
export class AuthModule {}
