import { Module } from '@nestjs/common';

import BcryptLib from '../../../domain/libs/bcrypt.lib';

@Module({
  providers: [BcryptLib],
  exports: [BcryptLib],
})
export default class BcryptModule {}
