import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto';

import {
  HASH_DEFAULT_ROUNDS,
  RANDOM_STRING_DEFAULT_LENGTH,
  SALT_DEFAULT_ROUNDS,
} from '../constants/bcrypt.const';
import IHash from '../interfaces/hash.interface';

@Injectable()
export default class BcryptLib {
  public async isCompare(
    data: string | Buffer,
    encrypted: string,
    salt?: string,
  ): Promise<boolean> {
    if (!salt) {
      return bcrypt.compare(data, encrypted);
    }

    const { hash } = await this.generateHashBySalt(data, salt);

    return hash === encrypted;
  }

  public generateHash(data: string | Buffer, rounds = HASH_DEFAULT_ROUNDS): Promise<string> {
    return bcrypt.hash(data, rounds);
  }

  public generateSalt(rounds = SALT_DEFAULT_ROUNDS): Promise<string> {
    return bcrypt.genSalt(rounds);
  }

  public generateRandomString(size = RANDOM_STRING_DEFAULT_LENGTH): string {
    return crypto.randomBytes(Math.ceil(size / 2)).toString('hex');
  }

  public async generateHashBySalt(data: string | Buffer, salt?: string): Promise<IHash> {
    const hashedData = await bcrypt.hash(data, salt);

    return { hash: hashedData };
  }
}
