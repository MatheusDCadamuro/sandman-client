module.exports = {
    testEnvironment: 'jest-environment-jsdom',
    setupFilesAfterEnv: ['<rootDir>/.jest/setup-tests.js'],
    moduleNameMapper: {
        '\\.(png|svg|eot|ttf|gif)$': '<rootDir>/.jest/mock/fileMock.js',
        '\\.(css|less|scss|sss|styl)$': 'identity-obj-proxy',
    },
}