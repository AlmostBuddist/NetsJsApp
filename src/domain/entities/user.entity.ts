import SexEnum from '../enums/sex.enum';

export default class User {
  constructor(data?: User) {
    if (data) {
      Object.assign(this, data);
    }
  }

  public readonly id?: number;

  public readonly login: string;

  public readonly password: string;

  public readonly email: string;

  public readonly firstName: string;

  public readonly lastName: string;

  public readonly middleName?: string;

  public readonly phoneNumber?: string;

  public readonly sex: SexEnum;

  public readonly createdAt?: Date | string;

  public readonly updatedAt?: Date | string;

  public readonly deletedAt?: Date | string;
}
