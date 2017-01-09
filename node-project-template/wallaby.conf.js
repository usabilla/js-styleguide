module.exports = function () {
  return {
    files: ['lib/**/*.js', 'test/_mocks/**/*'],
    tests: ['test/**/*.spec.js'],
    testFramework: 'jasmine',
    env: {
      type: 'node',
      // runner: 'path/to/your/node/executable'
    }
  };
};
