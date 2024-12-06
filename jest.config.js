/** 
 * Jest configuration for TypeScript testing
 * Configures the test environment, file extensions, and test patterns
 */

module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  moduleFileExtensions: ["ts", "js"],
  testMatch: ["**/tests/**/*.test.ts"],
};