import { HttpStatus } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

import { IHttpErrorResponseBody } from '../interfaces/http-response-body.interface';

export default class ErrorNotFoundDto implements IHttpErrorResponseBody {
  @ApiProperty({
    description: 'Http статус код',
    example: HttpStatus.NOT_FOUND,
  })
  public readonly status: HttpStatus.NOT_FOUND;

  @ApiProperty({
    description: 'Дата и время',
    example: new Date(),
  })
  public readonly timestamp: string;

  @ApiProperty({
    description: 'Тип ошибки',
    example: 'Not found',
  })
  public readonly type: string;

  @ApiProperty({
    description: 'Название ошибки',
    example: 'Not found',
  })
  public readonly title: string;

  @ApiProperty({
    description: 'Код ошибки',
    example: HttpStatus.NOT_FOUND,
    required: false,
  })
  public readonly code?: string;
}
