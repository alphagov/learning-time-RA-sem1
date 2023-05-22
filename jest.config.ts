import type { JestConfigWithTsJest } from 'ts-jest'

const config: JestConfigWithTsJest = {
  coveragePathIgnorePatterns: ['/.yarn/', '/dist/'],
  preset: 'ts-jest',
  testMatch: ['<rootDir>/*.test.ts'],
  verbose: true
}

export default config
