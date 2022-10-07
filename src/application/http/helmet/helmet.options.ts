import helmet, { FastifyHelmetOptions } from '@fastify/helmet';

const HELMET_OPTIONS: FastifyHelmetOptions = {
  global: true,
  xssFilter: false, // X-XSS-Protection устанавливается вручную.
  contentSecurityPolicy: {
    directives: {
      ...helmet.contentSecurityPolicy.getDefaultDirectives(),
      'script-src': [`'self'`, `https: 'unsafe-inline'`],
    },
  },
};

export default HELMET_OPTIONS;
