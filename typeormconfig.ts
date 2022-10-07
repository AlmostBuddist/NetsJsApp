import * as config from 'config';
import * as path from 'path';
import { DataSource } from 'typeorm';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

export const DATABASE_CONFIG: object = config.get('db');
export const TYPEORM_SETTINGS: object = config.get('orm.settings');
export const ENTITIES_PATH: string = config.get('orm.paths.models');
export const MIGRATIONS_PATH: string = config.get('orm.paths.migrations');

export default new DataSource({
  ...(DATABASE_CONFIG as PostgresConnectionOptions),
  ...TYPEORM_SETTINGS,
  entities: [`${path.resolve(ENTITIES_PATH)}/*{.ts,.js}`],
  migrations: [`${path.resolve(MIGRATIONS_PATH)}/*{.ts,.js}`],
  migrationsTableName: 'migrations',
  namingStrategy: new SnakeNamingStrategy(),
});
