module.exports = {
  env: {
    browser: true,
    es6: true,
  },
  extends: 'airbnb-base',
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaVersion: 2018,
  },
  rules: {
    "indent": ["error", "tab"],
    "func-names": ["error", "never"],
    "prefer-arrow-callback": [0],
    "quotes": ["error", "double"],
  },
};
