import { Module } from '@nestjs/common';

import JwtLib from '../../../domain/libs/jwt.lib';

@Module({
  providers: [JwtLib],
  exports: [JwtLib],
})
export default class JwtModule {}
