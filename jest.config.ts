/** @type {import('ts-jest').JestConfigWithTsJest} */

module.exports = {
   preset: "ts-jest",
   testEnvironment: "node",
   testMatch: ["**/**/*.test.ts"],
   testPathIgnorePatterns: ["/node_modules/"],
   verbose: true,
   forceExit: true,
   //  clearMocks: true

   // ESM support: https://kulshekhar.github.io/ts-jest/docs/guides/esm-support/
   extensionsToTreatAsEsm: [".ts"],
   transform: {
      // '^.+\\.[tj]sx?$' to process js/ts with `ts-jest`
      // '^.+\\.m?[tj]sx?$' to process js/ts/mjs/mts with `ts-jest`
      "^.+\\.tsx?$": [
         "ts-jest",
         {
            useESM: true,
         },
      ],
   },
   moduleNameMapper: {
      "^(\\.{1,2}/.*)\\.js$": "$1",
   },
};
