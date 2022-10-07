import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsInt, IsNumber, IsPositive } from 'class-validator';

export default class IdDto {
  @ApiProperty({ example: 1 })
  @IsNumber()
  @IsInt()
  @IsPositive()
  @Transform(({ value }) => value && parseInt(value, 10))
  public readonly id: number;
}
