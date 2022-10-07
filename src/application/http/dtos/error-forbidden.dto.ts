import { HttpStatus } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

import { IHttpErrorResponseBody } from '../interfaces/http-response-body.interface';

export default class ErrorForbiddenDto implements IHttpErrorResponseBody {
  @ApiProperty({
    description: 'Http статус код',
    example: HttpStatus.FORBIDDEN,
  })
  public readonly status: HttpStatus.FORBIDDEN;

  @ApiProperty({
    description: 'Дата и время',
    example: new Date(),
  })
  public readonly timestamp: string;

  @ApiProperty({
    description: 'Тип ошибки',
    example: 'Forbidden',
  })
  public readonly type: string;

  @ApiProperty({
    description: 'Название ошибки',
    example: 'Forbidden',
  })
  public readonly title: string;

  @ApiProperty({
    description: 'Код ошибки',
    example: HttpStatus.FORBIDDEN,
    required: false,
  })
  public readonly code?: string;
}
