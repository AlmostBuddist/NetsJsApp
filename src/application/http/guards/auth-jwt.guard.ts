import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';

import EXCEPTION_MESSAGES from '../../../domain/constants/exception-messages.const';
import AppExceptionCodesEnum from '../../../domain/enums/app-expection-codes.enum';
import AppException from '../../../domain/exceptions/app.exception';
import JwtLib from '../../../domain/libs/jwt.lib';

@Injectable()
export default class AuthJwtGuard implements CanActivate {
  constructor(private readonly jwtLib: JwtLib) {}

  public canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const { authorization } = request.headers;
    const token = this.jwtLib.getTokenFromHeader(authorization);

    if (!token) {
      throw new AppException(AppExceptionCodesEnum.UNAUTHORIZED, EXCEPTION_MESSAGES.UNAUTHORIZED);
    }

    request.user = this.jwtLib.verifyToken(token);

    return true;
  }
}
