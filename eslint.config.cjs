const globals = require('globals');
const eslintPlugin = require('@typescript-eslint/eslint-plugin');
const tseslint = require('typescript-eslint');
const eslint = require('@eslint/js');
const parser = require('@typescript-eslint/parser');
const simpleImportSort = require('eslint-plugin-simple-import-sort');

module.exports = [
  ...tseslint.configs.recommended,
  eslint.configs.recommended,
  {
    ignores: [
      'dist/**/*',
      '.prettierrc.cjs',
      'eslint.config.cjs',
      'playwright.config.cjs',
    ],
  },
  {
    files: ['src/**/*.ts'],
    languageOptions: {
      globals: {
        ...globals.browser,
        // process 等使えるように認識させる
        ...globals.node,
      },
      parser,
    },
    plugins: {
      '@typescript-eslint': eslintPlugin,
      'simple-import-sort': simpleImportSort,
    },
    rules: {
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          varsIgnorePattern: '^_',
          ignoreRestSiblings: true,
        },
      ],
      'simple-import-sort/imports': 'error',
      'simple-import-sort/exports': 'error',
    },
  },
];
