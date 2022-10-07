import { HttpStatus } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

import { IHttpErrorResponseBody } from '../interfaces/http-response-body.interface';

export default class ErrorValidationDto implements IHttpErrorResponseBody {
  @ApiProperty({
    description: 'Http статус код',
    example: HttpStatus.BAD_REQUEST,
  })
  public readonly status: HttpStatus.BAD_REQUEST;

  @ApiProperty({
    description: 'Дата и время',
    example: new Date(),
  })
  public readonly timestamp: string;

  @ApiProperty({
    description: 'Тип ошибки',
    example: 'Bad request',
  })
  public readonly type: string;

  @ApiProperty({
    description: 'Название ошибки',
    example: 'Bad request',
  })
  public readonly title: string;

  @ApiProperty({
    description: 'Код ошибки',
    example: HttpStatus.BAD_REQUEST,
    required: false,
  })
  public readonly code?: string;
}
