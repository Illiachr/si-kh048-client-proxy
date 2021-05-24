process.env.NODE_ENV = 'UNITTEST';
module.exports = {
    clearMocks: true,
    collectCoverage: true,
    collectCoverageFrom: [
        '../gateway/client-v1/apiproxy/resources/jsc/*.js'
    ],
    testEnvironment: 'node',
    testMatch: ['**/*.test.js']
};