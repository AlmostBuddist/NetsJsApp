import { Test } from '@nestjs/testing';
import { plainToInstance } from 'class-transformer';

import BcryptModule from '../../src/application/di/modules/bcrypt.module';
import UserDto from '../../src/application/http/dtos/user.dto';
import UserRepository from '../../src/data/postgres/repositories/user.repository';
import User from '../../src/domain/entities/user.entity';
import SexEnum from '../../src/domain/enums/sex.enum';
import IUserCreate from '../../src/domain/interfaces/user-create.interface';
import UserService from '../../src/domain/use-cases/user.service';

describe('User Service', () => {
  let userService: UserService;

  const usersRepositoryMock = {
    findOneById: jest.fn(),
    findOne: jest.fn(),
    findMany: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
    softDeleteById: jest.fn(),
  };

  const testUserData = {
    login: 'test',
    password: 'test',
    email: 'test@test.com',
    firstName: 'test',
    lastName: 'test',
    middleName: 'test',
    phoneNumber: 'test',
    sex: SexEnum.MALE,
  };

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [BcryptModule],
      providers: [
        UserService,
        {
          provide: UserRepository,
          useValue: usersRepositoryMock,
        },
      ],
    }).compile();

    userService = module.get<UserService>(UserService);
  });

  describe('User Service', () => {
    it('Создание пользователя', async () => {
      usersRepositoryMock.create = jest.fn().mockImplementationOnce(
        ({
          login,
          password,
          email,
          firstName,
          lastName,
          middleName,
          phoneNumber,
          sex,
        }: IUserCreate): User =>
          new User({
            id: 1,
            login,
            email,
            firstName,
            lastName,
            middleName,
            phoneNumber,
            sex,
            password,
          }),
      );

      const result = {
        id: 1,
        login: 'test',
        email: 'test@test.com',
        firstName: 'test',
        lastName: 'test',
        middleName: 'test',
        phoneNumber: 'test',
        sex: SexEnum.MALE,
      };

      const user = await userService.create(testUserData);

      expect(user?.id).toEqual(1);
      expect(user?.password).not.toEqual(testUserData.password);

      const cleanedUserData = plainToInstance(UserDto, user);

      expect(cleanedUserData).toEqual(result);
    });

    it('Поиск пользователя - success', async () => {
      usersRepositoryMock.findOneById = jest.fn().mockImplementationOnce(
        (id: number): User =>
          new User({
            id,
            ...testUserData,
          }),
      );

      const result = {
        id: 1,
        login: 'test',
        password: 'test',
        email: 'test@test.com',
        firstName: 'test',
        lastName: 'test',
        middleName: 'test',
        phoneNumber: 'test',
        sex: SexEnum.MALE,
      };

      const user = await userService.findOneById(1);

      expect(user).toEqual(result);
    });

    it('Поиск пользователя - failed', async () => {
      usersRepositoryMock.findOneById = jest
        .fn()
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        .mockImplementationOnce((id: number): User => undefined);

      const id = 1;

      try {
        await userService.findOneById(id);
      } catch (err) {
        expect(err.message).toBe(`Пользователь с id = ${id} не найден`);
      }
    });
  });
});
