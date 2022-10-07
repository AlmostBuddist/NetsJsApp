import IUserCreate from '../interfaces/user-create.interface';

export type TSignin = Pick<IUserCreate, 'login' | 'password'>;
