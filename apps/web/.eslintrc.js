module.exports = {
  root: true,
  extends: [],  // Remove the Uniswap config temporarily
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2022,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    }
  },
  plugins: ['@typescript-eslint'],
  rules: {
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-unused-vars': 'off'
  },
  overrides: [
    {
      files: ['**/*.ts', '**/*.tsx'],
      rules: {
        'no-restricted-imports': ['error', {
          paths: [
            {
              name: 'expo-modules-core',
              message: 'Please use web-specific alternatives where possible.'
            }
          ]
        }]
      }
    }
  ]
}
