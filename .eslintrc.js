module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'airbnb-base',
  ],
  parserOptions: {
    ecmaVersion: 12,
  },
  rules: {
    'max-len': 1,
    'no-constant-condition': ['error', { checkLoops: false }],
    'no-nested-ternary': 0,
    'no-restricted-syntax': 0,
    'no-unused-vars': 0,
    'object-property-newline': 0,
    'prefer-const': 1,
    'quotes': [1, 'single'],
  },
};
