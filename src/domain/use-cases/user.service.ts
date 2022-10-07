import { Injectable } from '@nestjs/common';

import UserRepository from '../../data/postgres/repositories/user.repository';
import User from '../entities/user.entity';
import AppExceptionCodesEnum from '../enums/app-expection-codes.enum';
import AppException from '../exceptions/app.exception';
import IUserCreate from '../interfaces/user-create.interface';
import IUserUpdate from '../interfaces/user-update.interface';
import BcryptLib from '../libs/bcrypt.lib';

@Injectable()
export default class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly bcryptLib: BcryptLib,
  ) {}

  public async findOneById(id: number): Promise<User> {
    const user = await this.userRepository.findOneById(id);

    if (!user) {
      throw new AppException(
        AppExceptionCodesEnum.NOT_FOUND,
        `Пользователь с id = ${id} не найден`,
      );
    }

    return user;
  }

  public findOne(filter: Partial<User>): Promise<User> {
    return this.userRepository.findOne(filter);
  }

  public findMany(filter: Partial<User>): Promise<User[]> {
    return this.userRepository.findMany(filter);
  }

  public async create(incomingData: IUserCreate): Promise<User> {
    const passwordHash = await this.bcryptLib.generateHash(incomingData.password);

    return this.userRepository.create({
      ...incomingData,
      password: passwordHash,
    });
  }

  public async update(id: number, incomingData: IUserUpdate): Promise<boolean> {
    const isUserExist = await this.isUserExist({ id });

    if (!isUserExist) {
      throw new AppException(
        AppExceptionCodesEnum.NOT_FOUND,
        `Пользователь с id = ${id} не найден`,
      );
    }

    return this.userRepository.update(id, incomingData);
  }

  public async deleteById(id: number): Promise<boolean> {
    const isUserExist = await this.isUserExist({ id });

    if (!isUserExist) {
      throw new AppException(
        AppExceptionCodesEnum.NOT_FOUND,
        `Пользователь с id = ${id} не найден`,
      );
    }

    return this.userRepository.delete(id);
  }

  public async isUserExist(filter: Partial<User>): Promise<boolean> {
    const user = await this.userRepository.findOne(filter);

    return Boolean(user);
  }
}
