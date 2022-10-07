import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export const getSwaggerPath = (prefix: string): string => {
  const pathSeparator = prefix.length && prefix.charAt(prefix.length - 1) !== '/' ? '/' : '';

  return `${prefix}${pathSeparator}swagger`;
};

export const initializeSwaggerDocumentation = (
  app: INestApplication,
  globalPrefix: string,
): void => {
  const swaggerPath = getSwaggerPath(globalPrefix);
  const swaggerConfig = new DocumentBuilder()
    .setTitle('Nest.JS template application')
    .setDescription('Nest.JS template application description')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);

  SwaggerModule.setup(swaggerPath, app, document);
};
