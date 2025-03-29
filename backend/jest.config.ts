import type { Config } from 'jest';

const config: Config = {
  preset: 'ts-jest',
  testEnvironment: 'bun',
  roots: ['<rootDir>/tests/backend'],
  moduleFileExtensions: ['ts', 'js'],
  transform: { '^.+\\.ts$': 'ts-jest' },
};

export default config;
