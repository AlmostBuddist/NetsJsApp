import { HttpStatus } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

import { IHttpErrorResponseBody } from '../interfaces/http-response-body.interface';

export default class ErrorInternalServerDto implements IHttpErrorResponseBody {
  @ApiProperty({
    description: 'Http статус код',
    example: HttpStatus.INTERNAL_SERVER_ERROR,
  })
  public readonly status: HttpStatus.INTERNAL_SERVER_ERROR;

  @ApiProperty({
    description: 'Дата и время',
    example: new Date(),
  })
  public readonly timestamp: string;

  @ApiProperty({
    description: 'Тип ошибки',
    example: 'Internal server error',
  })
  public readonly type: string;

  @ApiProperty({
    description: 'Название ошибки',
    example: 'Internal server error',
  })
  public readonly title: string;

  @ApiProperty({
    description: 'Код ошибки',
    example: HttpStatus.INTERNAL_SERVER_ERROR,
    required: false,
  })
  public readonly code?: string;
}
