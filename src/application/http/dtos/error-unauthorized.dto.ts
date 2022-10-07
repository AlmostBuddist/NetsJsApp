import { HttpStatus } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

import { IHttpErrorResponseBody } from '../interfaces/http-response-body.interface';

export default class ErrorUnauthorizedDto implements IHttpErrorResponseBody {
  @ApiProperty({
    description: 'Http статус код',
    example: HttpStatus.UNAUTHORIZED,
  })
  public readonly status: HttpStatus.UNAUTHORIZED;

  @ApiProperty({
    description: 'Дата и время',
    example: new Date(),
  })
  public readonly timestamp: string;

  @ApiProperty({
    description: 'Тип ошибки',
    example: 'Unauthorized',
  })
  public readonly type: string;

  @ApiProperty({
    description: 'Название ошибки',
    example: 'Unauthorized',
  })
  public readonly title: string;

  @ApiProperty({
    description: 'Код ошибки',
    example: HttpStatus.UNAUTHORIZED,
    required: false,
  })
  public readonly code?: string;
}
