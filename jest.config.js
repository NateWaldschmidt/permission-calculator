/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
export default {
    testEnvironment: 'node',
    // Mapping to SvelteKit's $lib directory mapping.
    moduleNameMapper: {
      "^\\@lib/(.*)": "<rootDir>/src/lib/$1",
      "^\\@components/(.*)": "<rootDir>/src/components/$1",
    },
  };