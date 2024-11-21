import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';
import tsParser from '@typescript-eslint/parser';
import { FlatCompat } from '@eslint/eslintrc';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
  resolvePluginsRelativeTo: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

export default tseslint.config(
  ...compat.extends('airbnb', 'airbnb-typescript'),
  { ignores: ['node_modules', 'dist'] },
  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      parser: tsParser,
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        project: ['./tsconfig.app.json', './tsconfig.node.json'],
        tsconfigRootDir: __dirname,
      },
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': [
        'off',
        { allowConstantExport: true },
      ],
      'react/react-in-jsx-scope': 'off',
      'import/no-extraneous-dependencies': 'off',
      '@typescript-eslint/no-shadow': 'off',
      'react/function-component-definition': 'off',
      'import/order': 'off',
      'import/prefer-default-export': 'off',
      'object-curly-newline': 'off',
      'implicit-arrow-linebreak': 'off',
      'no-console': 'error',
      'react-hooks/exhaustive-deps': 'off',
      'no-param-reassign': 'off',
      'arrow-body-style': ['off', 'as-needed'],
      'no-nested-ternary': 'off',
      'react/jsx-one-expression-per-line': 'off',
      ' no-nested-ternary': 'off',
      'operator-linebreak': 'off',
    },
  },
);
