
module.exports = {
  env: {
    es2021: true
  },
  extends: [
    'plugin:react/recommended',
    'standard-with-typescript',
    'next/core-web-vitals'
  ],
  overrides: [
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    sourceType: 'module',
    tsconfigRootDir: __dirname,
    project: ['./tsconfig.json'],
  },
  plugins: [
    'react',
    'react-hooks'
  ],
  rules: {
	'@typescript-eslint/indent': 'off',
	'indent': ['error', 'tab'],
	 'no-tabs': 'off',
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn'
  }
}
