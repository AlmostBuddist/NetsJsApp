import { Module } from '@nestjs/common';

import AuthService from '../../../domain/use-cases/auth.service';
import BcryptModule from './bcrypt.module';
import JwtModule from './jwt.module';
import UserModule from './user.module';

@Module({
  imports: [BcryptModule, JwtModule, UserModule],
  providers: [AuthService],
  exports: [AuthService],
})
export default class AuthModule {}
