import { Test } from '@nestjs/testing';
import { plainToInstance } from 'class-transformer';

import BcryptModule from '../../src/application/di/modules/bcrypt.module';
import UserDto from '../../src/application/http/dtos/user.dto';
import UserRepository from '../../src/data/postgres/repositories/user.repository';
import User from '../../src/domain/entities/user.entity';
import UserService from '../../src/domain/use-cases/user.service';
import {
  USER_MOCK,
  USER_MOCK_SCHEMA,
  USER_REPOSITORY_CREATE_FN_MOCK,
  USER_RESPONSE_MOCK,
  USERS_REPOSITORY_MOCK,
} from './user.mock';

describe('User Service', () => {
  let userService: UserService;

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [BcryptModule],
      providers: [
        UserService,
        {
          provide: UserRepository,
          useValue: USERS_REPOSITORY_MOCK,
        },
      ],
    }).compile();

    userService = module.get<UserService>(UserService);
  });

  describe('User Service', () => {
    it('Создание пользователя - types', async () => {
      USERS_REPOSITORY_MOCK.create = USER_REPOSITORY_CREATE_FN_MOCK;

      const expectedResult = await userService.create(USER_MOCK);

      expect(expectedResult).toMatchObject(USER_MOCK_SCHEMA);
    });

    it('Создание пользователя - data', async () => {
      USERS_REPOSITORY_MOCK.create = USER_REPOSITORY_CREATE_FN_MOCK;

      const user = await userService.create(USER_MOCK);

      expect(user?.id).toEqual(1);
      expect(user?.password).not.toEqual(USER_MOCK.password);

      const expectedResult = plainToInstance(UserDto, user);

      expect(expectedResult).toEqual(USER_RESPONSE_MOCK);
    });

    it('Поиск пользователя - types', async () => {
      USERS_REPOSITORY_MOCK.findOneById = jest.fn().mockImplementationOnce(
        (id: number): User =>
          new User({
            id,
            ...USER_MOCK,
          }),
      );

      const expectedResult = await userService.findOneById(USER_MOCK.id);

      expect(expectedResult).toMatchObject(USER_MOCK_SCHEMA);
    });

    it('Поиск пользователя - data', async () => {
      USERS_REPOSITORY_MOCK.findOneById = jest.fn().mockImplementationOnce(
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        (id: number): User =>
          new User({
            ...USER_MOCK,
          }),
      );

      const expectedResult = await userService.findOneById(USER_MOCK.id);

      expect(expectedResult).toEqual(USER_MOCK);
    });

    it('Поиск пользователя - failed', async () => {
      USERS_REPOSITORY_MOCK.findOneById = jest
        .fn()
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        .mockImplementationOnce((id: number): User => undefined);

      try {
        await userService.findOneById(USER_MOCK.id);
      } catch (expectedError) {
        expect(expectedError.message).toBe(`Пользователь с id = ${USER_MOCK.id} не найден`);
      }
    });
  });
});
