import helmet from '@fastify/helmet';
import { Logger, ValidationError, ValidationPipe, VersioningType } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import * as config from 'config';

import ValidationException from '../../domain/exceptions/validation.exception';
import HEALTH_API_URL from '../http/constants/health.const';
import ApiVersionEnum from '../http/enums/api-version.enum';
import AppHttpExceptionFilter from '../http/exceptions-filters/app-http-exception.filter';
import DefaultHttpExceptionFilter from '../http/exceptions-filters/default-http-exception.filter';
import ServiceUnavailableFilter from '../http/exceptions-filters/service-unavailable.filter';
import UnhandledExceptionFilter from '../http/exceptions-filters/unhandle-http-exception.filter';
import ValidationHttpExceptionFilter from '../http/exceptions-filters/validation-http-exception.filter';
import HELMET_OPTIONS from '../http/helmet/helmet.options';
import LoggingInterceptor from '../http/interceptors/logging.interceptor';
import { getSwaggerPath, initializeSwaggerDocumentation } from '../utils/swagger.util';
import ApiModule from './api.module';

// eslint-disable-next-line @typescript-eslint/naming-convention
const IS_ENABLE_SWAGGER = Boolean(config.get('app.is_enable_swagger'));
const APP_GLOBAL_PREFIX: string = config.get('app.global_prefix');

const EXCEPTION_FILTERS = [
  new UnhandledExceptionFilter(),
  new AppHttpExceptionFilter(),
  new DefaultHttpExceptionFilter(),
  new ServiceUnavailableFilter(),
  new ValidationHttpExceptionFilter(),
];

/* Handle uncaught exceptions */
process
  .on('unhandledRejection', (reason) => {
    const logger = new Logger();

    logger.error('Unhandled Rejection at Promise');
    logger.error(reason);
  })
  .on('uncaughtException', (error) => {
    const logger = new Logger();

    logger.error('Uncaught Exception thrown');
    logger.error(error);
  });

async function bootstrap() {
  const logger = new Logger();
  const app = await NestFactory.create<NestFastifyApplication>(ApiModule, new FastifyAdapter(), {
    abortOnError: false,
  });

  await app.register(helmet, HELMET_OPTIONS);

  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: [ApiVersionEnum.V1],
    prefix: false,
  });

  app.setGlobalPrefix(APP_GLOBAL_PREFIX, {
    exclude: [`${HEALTH_API_URL.ROOT}${HEALTH_API_URL.CHILD}`],
  });

  app.useGlobalInterceptors(new LoggingInterceptor());

  app.useGlobalFilters(...EXCEPTION_FILTERS);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidUnknownValues: true,
      exceptionFactory: (errors: ValidationError[]) => new ValidationException({ details: errors }),
    }),
  );

  if (IS_ENABLE_SWAGGER) {
    initializeSwaggerDocumentation(app, APP_GLOBAL_PREFIX);
  }

  await app.listen(config.get('app.port'), '0.0.0.0');
  const url = await app.getUrl();

  logger.log(`Application is running on: ${url}/${APP_GLOBAL_PREFIX}`);

  if (IS_ENABLE_SWAGGER) {
    const swaggerPath = getSwaggerPath(APP_GLOBAL_PREFIX);

    logger.log(`Swagger is running on: ${url}/${swaggerPath}`);
  }
}

bootstrap().catch((e) => {
  const logger = new Logger();

  logger.error('Application start error!');
  logger.error(e);

  process.abort();
});
