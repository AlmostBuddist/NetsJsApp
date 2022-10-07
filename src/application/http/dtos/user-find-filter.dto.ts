import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsOptional, IsString } from 'class-validator';

import SexEnum from '../../../domain/enums/sex.enum';
import IUserFindFilter from '../../../domain/interfaces/user-find-filter.interface';

export default class UserFindFilterDto implements IUserFindFilter {
  @ApiProperty({ example: 'ivanov', required: false })
  @IsString()
  @IsOptional()
  public readonly login?: string;

  @ApiProperty({ example: 'ivanov@email.ru', required: false })
  @IsString()
  @IsEmail()
  @IsOptional()
  public readonly email?: string;

  @ApiProperty({ example: 'Иван', required: false })
  @IsString()
  @IsOptional()
  public readonly firstName?: string;

  @ApiProperty({ example: 'Иванов', required: false })
  @IsString()
  @IsOptional()
  public readonly lastName?: string;

  @ApiProperty({ example: 'Иванович', required: false })
  @IsString()
  @IsOptional()
  public readonly middleName?: string;

  @ApiProperty({ example: '+79180000000', required: false })
  @IsString()
  @IsOptional()
  public readonly phoneNumber?: string;

  @ApiProperty({ enum: SexEnum, example: SexEnum.MALE, required: false })
  @IsString()
  @IsEnum(SexEnum)
  @IsOptional()
  public readonly sex?: SexEnum;
}
