// jest.config.js

module.exports = {
  preset: 'react-native',
  testEnvironment: 'node',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  transformIgnorePatterns: [
    'node_modules/(?!react-native|react-native-reanimated|react-native-gesture-handler|native-base|react-clone-referenced-element|react-native-router-flux|react-navigation)',
  ],
  setupFiles: ['<rootDir>/src/util/jestSetup.js'],
  setupFilesAfterEnv: ['@testing-library/jest-native/extend-expect'],
  coveragePathIgnorePatterns: ['b2cClient.ts', 'storybook', 'stories'],
};
