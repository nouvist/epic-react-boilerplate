/**
 * @type {import('eslint').Linter.Config}
 */
const config = {
  extends: [
    'airbnb-typescript',
  ],
  plugins: ['prettier'],
  rules: {
    'prettier/prettier': 'warn',
  },
};

module.exports = config;
