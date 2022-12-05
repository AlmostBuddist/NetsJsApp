import type { Config } from '@jest/types';

// eslint-disable-next-line import/no-named-default
import { default as defaultConfig } from '../jest.config';

const config: Config.InitialOptions = {
  ...defaultConfig,
  testRegex: '.*.unit.spec.ts$',
};

export default config;
