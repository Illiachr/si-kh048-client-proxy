// eslint-disable-next-line no-undef
process.env.NODE_ENV = "UNITTEST";
module.exports = {
  clearMocks: true,
  collectCoverage: true,
  collectCoverageFrom: ["**/utils.js", "!**/node_modules/**", "!**/target/**"],
  testEnvironment: "node",
  testMatch: ["**/*.test.js"],
};
