module.exports = {
  env: {
    commonjs: true,
    es2021: true,
    node: true,
  },
  extends: ['airbnb-base', 'prettier', 'prettier/@typescript-eslint'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 12,
  },
  plugins: ['@typescript-eslint'],
  rules: {
    'no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
    'import/extensions': ['.js', '.jsx', '.json', '.ts', '.tsx'],
    'import/no-unresolved': 'off',
    'import/prefer-default-export': 'off',
  },
}
