module.exports = {
  'extends': 'eslint:recommended',
  'parserOptions': {
    'ecmaVersion': 6,
  },
  'env': {
    'node': true,
    'es6': true,
  },
  'rules': {
    'arrow-parens': ['error', 'always'],
    'quotes': ['error', 'single'],
    'indent': ['error', 2, {'SwitchCase': 1}],
    'space-before-function-paren': ['error', 'never'],
    'comma-dangle': ['error', 'always-multiline'],
    'eol-last': ['error', 'always'],
    'no-unused-vars': ['error', { 'ignoreRestSiblings': true }],
  },
};
