module.exports = {
  env: {
    es2021: true
  },
  extends: [
    'plugin:react/recommended',
    'standard-with-typescript',
    'next/core-web-vitals'
  ],
  ignorePatterns: ['eslintrc.js'],
  overrides: [
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    sourceType: 'module',
    tsconfigRootDir: __dirname
  },
  plugins: [
    'react',
    'react-hooks'
  ],
  rules: {
    'eol-last': 'off',
    '@typescript-eslint/indent': 'off',
    '@typescript-eslint/semi': 'off',
    indent: 'off',
    'no-tabs': 'off',
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn'
  }
}
