import { Module } from '@nestjs/common';

import TypeormRootModule from '../../adapters/typeorm/typeorm.module';
import AuthModule from '../di/modules/auth.module';
import BcryptModule from '../di/modules/bcrypt.module';
import HealthModule from '../di/modules/health.module';
import JwtModule from '../di/modules/jwt.module';
import UserModule from '../di/modules/user.module';
import AuthController from '../http/controllers/auth.controller';
import UserController from '../http/controllers/user.controller';

const USE_CASES_MODULES = [UserModule, AuthModule];
const LIBS_MODULES = [JwtModule, BcryptModule];

@Module({
  imports: [HealthModule, TypeormRootModule, ...USE_CASES_MODULES, ...LIBS_MODULES],
  controllers: [AuthController, UserController],
  providers: [],
  exports: [],
})
export default class ApiModule {}
