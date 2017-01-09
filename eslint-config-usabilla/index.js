module.exports = {
  extends: 'eslint:recommended',
  parserOptions: {
    ecmaVersion: 6
  },
  env: {
    node: true
  },
  rules: {
    quotes: ['error', 'single'],
    indent: [error, 2, {SwitchCase: 1}],
    'space-before-function-paren': ['error', 'never']
  }
};
