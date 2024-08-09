const config = {
    collectCoverage: true,
    collectCoverageFrom: [
        "src/**/*.{js,jsx}",
        "src/**/*.{ts,tsx}",
        "!vendor/**/*.{ts,tsx}",
        "!**/node_modules/**",
    ],
    coverageProvider: "babel",
    preset: 'ts-jest',
    testEnvironment: 'node',
    roots: ['src'],
    globals: {
        'ts-jest': {
            tsconfig: 'tsconfig.test.json',
        },
    },
    testRegex: './src/tests/.*.test.ts$',
    verbose: true,
};

module.exports = config;