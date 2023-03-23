const nextJest = require('next/jest')


const createJestConfig = nextJest({ dir: './' })

const config = {
  bail: true,
  verbose: true,
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  testRegex: '/*.spec.(js|ts|tsx)$',
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': 'ts-jest',
  },
  roots: [
    '<rootDir>/src',
  ],
  moduleFileExtensions: [
    'js',
    'ts',
    'tsx',
  ],
}


module.exports = createJestConfig(config)
