module.exports = {
  env: {
    node: true,
  },
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  extends: ['prettier'],
  rules: {
    'max-len': ['warn', { code: 100 }],
    quotes: ['error', 'single', {avoidEscape: true}],
    'object-curly-spacing': ['error', 'always'],
  },

  overrides: [{ files: ['**/*.ts'] }],

}
