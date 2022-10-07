import { Injectable } from '@nestjs/common';

import AppExceptionCodesEnum from '../enums/app-expection-codes.enum';
import AppException from '../exceptions/app.exception';
import ITokenInterface from '../interfaces/token.interface';
import BcryptLib from '../libs/bcrypt.lib';
import JwtLib from '../libs/jwt.lib';
import { TSignin } from '../types/signin.type';
import { TSignup } from '../types/signup.type';
import UserService from './user.service';

@Injectable()
export default class AuthService {
  constructor(
    private readonly jwtLib: JwtLib,
    private readonly bcryptLib: BcryptLib,
    private readonly userService: UserService,
  ) {}

  public async signin(incomingData: TSignin): Promise<ITokenInterface> {
    const user = await this.userService.findOne({
      login: incomingData.login,
    });
    const isComparePasswords = await this.bcryptLib.isCompare(incomingData.password, user.password);

    if (!isComparePasswords) {
      throw new AppException(AppExceptionCodesEnum.BAD_REQUEST, `Неправильный логин или пароль`);
    }

    const token = this.jwtLib.generateToken({ id: user.id });

    return { token };
  }

  public async signup(incomingData: TSignup): Promise<boolean> {
    const isLoginExist = await this.userService.findOne({
      login: incomingData.login,
    });

    if (isLoginExist) {
      throw new AppException(
        AppExceptionCodesEnum.BAD_REQUEST,
        `Пользователь с login = ${incomingData.login} уже существует`,
      );
    }

    await this.userService.create(incomingData);

    return true;
  }
}
