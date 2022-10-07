import SexEnum from '../enums/sex.enum';

export default interface IUserUpdate {
  readonly login?: string;
  readonly email?: string;
  readonly firstName?: string;
  readonly lastName?: string;
  readonly middleName?: string;
  readonly phoneNumber?: string;
  readonly sex?: SexEnum;
}
