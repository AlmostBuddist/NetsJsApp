module.exports = {
  app: {
    port: 8088,
    base_url: 'http://127.0.0.1',
    global_prefix: 'api',
    is_enable_swagger: '1',
    is_enable_logger: '1',
    health: {
      is_db_check: '1',
    },
  },
  db: {
    host: 'postgres',
    port: 5432,
    username: 'postgres',
    password: 'postgres',
    database: 'postgres',
  },
  orm: {
    paths: {
      models: 'dist/src/data/postgres/models',
      migrations: 'src/data/postgres/migrations',
    },
    settings: {
      type: 'postgres',
      synchronize: false,
      logging: false,
    },
  },
  jwt: {
    secret: 'secret',
  },
};
