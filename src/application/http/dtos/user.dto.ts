import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { IsEmail, IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';

import User from '../../../domain/entities/user.entity';
import SexEnum from '../../../domain/enums/sex.enum';

export default class UserDto implements User {
  constructor(data?: Partial<UserDto>) {
    if (data) {
      Object.assign(this, data);
    }
  }

  @ApiProperty({ example: 1, required: false })
  @IsNumber()
  public readonly id?: number;

  @ApiProperty({ example: 'ivanov' })
  @IsString()
  public readonly login: string;

  @Exclude()
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

  @ApiProperty({ example: 'Иванович' })
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

  @Exclude()
  public readonly createdAt?: Date | string;

  @Exclude()
  public readonly updatedAt?: Date | string;

  @Exclude()
  public readonly deletedAt?: Date | string;
}
