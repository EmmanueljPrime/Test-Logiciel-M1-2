/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  // On cherche les tests dans le dossier src
  roots: ['<rootDir>/src'],
  // On considère comme test tout fichier finissant par .test.ts ou .spec.ts
  testMatch: [
    "**/__tests__/**/*.+(ts|tsx|js)",
    "**/?(*.)+(spec|test).+(ts|tsx|js)"
  ],
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest"
  },
  // Active la couverture de code si tu veux voir quelles lignes sont testées
  collectCoverage: false, 
  coverageDirectory: "coverage",
  coverageProvider: "v8"
};
