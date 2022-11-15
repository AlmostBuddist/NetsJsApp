import type { Config } from '@jest/types';

// eslint-disable-next-line import/no-named-default
import { default as defaultConfig } from '../jest.config';

const config: Config.InitialOptions = {
  ...defaultConfig,
  testRegex: '.*.integration.spec.ts$',
};

export default config;
