import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import UserModel from '../../../data/postgres/models/user.model';
import UserRepository from '../../../data/postgres/repositories/user.repository';
import UserService from '../../../domain/use-cases/user.service';
import BcryptModule from './bcrypt.module';

@Module({
  imports: [TypeOrmModule.forFeature([UserModel]), BcryptModule],
  providers: [UserService, UserRepository],
  exports: [UserService],
})
export default class UserModule {}
