module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node', // or 'jsdom' if you're testing front-end code
  globals: {
    'ts-jest': {
      tsconfig: 'tsconfig.json', // Ensure ts-jest uses your tsconfig.json
    }
  },
  transform: {
    '^.+\\.tsx?$': 'babel-jest', // Use ts-jest for TypeScript files
    '^.+\\.js$': 'babel-jest',
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'json'], // Add ts, tsx extensions
  transformIgnorePatterns: ['node_modules/(?!your-es6-module)'], // Optional: If you have ES6 modules in `node_modules`
};