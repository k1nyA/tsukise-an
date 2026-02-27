/** @type {import('jest').Config} */
module.exports = {
  // This repository uses Vitest as the default runner.
  // Jest is kept as an explicit opt-in lane for *.jest.test.* files only.
  roots: ['<rootDir>/src'],
  testMatch: ['**/?(*.)+(jest.test).[jt]s?(x)'],
  passWithNoTests: true,
  testPathIgnorePatterns: [
    '/node_modules/',
    '/.next/',
    '/.claude/worktrees/',
    '/.claude-logs/',
  ],
};
