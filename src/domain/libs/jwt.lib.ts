import { Injectable } from '@nestjs/common';
import * as config from 'config';
import { Jwt, JwtPayload, sign, SignOptions, verify } from 'jsonwebtoken';

import HTTP_HEADERS from '../../application/http/constants/http-headers.const';

const JWT_SECRET: string = config.get('jwt.secret');

@Injectable()
export default class JwtLib {
  public generateToken(payload: object, options?: SignOptions): string {
    return sign(payload, JWT_SECRET, options);
  }

  public verifyToken(token: string): Jwt | JwtPayload | string {
    return verify(token, JWT_SECRET);
  }

  public getTokenFromHeader(header: string): string {
    return header && header.replace(HTTP_HEADERS.BEARER_TOKEN_PREFIX, '');
  }
}
