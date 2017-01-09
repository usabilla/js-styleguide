module.exports = function () {
  return {
    files: ['lib/**/*.js', 'test/_mocks/**/*'],
    tests: ['test/**/*.spec.js'],
    testFramework: 'jasmine',
    env: {
      type: 'node',
      runner: '/Users/piet/.nvm/versions/node/v7.2.1/bin/node'
    }
  };
};
