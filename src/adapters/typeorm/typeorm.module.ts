import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as config from 'config';
import * as path from 'path';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

export const DATABASE_CONFIG: object = config.get('db');
export const TYPEORM_SETTINGS: object = config.get('orm.settings');
export const ENTITIES_PATH: string = config.get('orm.paths.models');
export const MIGRATIONS_PATH: string = config.get('orm.paths.migrations');

@Module({
  imports: [
    TypeOrmModule.forRoot({
      ...DATABASE_CONFIG,
      ...TYPEORM_SETTINGS,
      entities: [`${path.resolve(ENTITIES_PATH)}/*.model{.ts,.js}`],
      migrations: [`${path.resolve(MIGRATIONS_PATH)}/*.model{.ts,.js}`],
      namingStrategy: new SnakeNamingStrategy(),
    }),
  ],
})
export default class TypeormRootModule {}
