module.exports = {
  root: true,
  extends: ['@fullstacksjs'],
  rules: {
    '@typescript-eslint/naming-convention': [
      'warn',
      {
        selector: 'enumMember',
        format: ['UPPER_CASE'],
      },
    ],
  },
};
