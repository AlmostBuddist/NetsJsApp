import SexEnum from '../enums/sex.enum';

export default interface IUserFindFilter {
  readonly id?: number;
  readonly login?: string;
  readonly password?: string;
  readonly email?: string;
  readonly firstName?: string;
  readonly lastName?: string;
  readonly middleName?: string;
  readonly phoneNumber?: string;
  readonly sex?: SexEnum;
}
