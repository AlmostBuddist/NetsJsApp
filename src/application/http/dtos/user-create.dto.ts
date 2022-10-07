import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsOptional, IsString } from 'class-validator';

import SexEnum from '../../../domain/enums/sex.enum';
import IUserCreate from '../../../domain/interfaces/user-create.interface';

export default class UserCreateDto implements IUserCreate {
  @ApiProperty({ example: 'ivanov' })
  @IsString()
  public readonly login: string;

  @ApiProperty({ example: 'Qwerty12345' })
  @IsString()
  public readonly password: string;

  @ApiProperty({ example: 'ivanov@email.ru' })
  @IsString()
  @IsEmail()
  public readonly email: string;

  @ApiProperty({ example: 'Иван' })
  @IsString()
  public readonly firstName: string;

  @ApiProperty({ example: 'Иванов' })
  @IsString()
  public readonly lastName: string;

  @ApiProperty({ example: 'Иванович', required: false })
  @IsString()
  @IsOptional()
  public readonly middleName?: string;

  @ApiProperty({ example: '+79180000000', required: false })
  @IsString()
  @IsOptional()
  public readonly phoneNumber?: string;

  @ApiProperty({ enum: SexEnum, example: SexEnum.MALE })
  @IsString()
  @IsEnum(SexEnum)
  public readonly sex: SexEnum;
}
