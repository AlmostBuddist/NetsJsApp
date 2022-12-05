import User from '../../src/domain/entities/user.entity';
import SexEnum from '../../src/domain/enums/sex.enum';
import IUserCreate from '../../src/domain/interfaces/user-create.interface';

export const USERS_REPOSITORY_MOCK = {
  findOneById: jest.fn(),
  findOne: jest.fn(),
  findMany: jest.fn(),
  create: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
  softDeleteById: jest.fn(),
};

const USER_TEST_DATA = {
  id: 1,
  login: 'test',
  email: 'test@test.com',
  firstName: 'test',
  lastName: 'test',
  middleName: 'test',
  phoneNumber: 'test',
  sex: SexEnum.MALE,
};

export const USER_MOCK = {
  ...USER_TEST_DATA,
  password: 'test',
};

export const USER_RESPONSE_MOCK = {
  ...USER_TEST_DATA,
};

export const USER_MOCK_SCHEMA = {
  id: expect.any(Number),
  login: expect.any(String),
  password: expect.any(String),
  email: expect.any(String),
  firstName: expect.any(String),
  lastName: expect.any(String),
  middleName: expect.any(String),
  phoneNumber: expect.any(String),
  sex: expect.any(String),
};

export const USER_REPOSITORY_CREATE_FN_MOCK = jest.fn().mockImplementation(
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
