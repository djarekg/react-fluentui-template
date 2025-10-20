import css from '@eslint/css';
import js from '@eslint/js';
import json from '@eslint/json';
import markdown from '@eslint/markdown';
import fluentuiEslintPlugin from '@fluentui/eslint-plugin-react-components';
import pluginReact from 'eslint-plugin-react';
import reactCompiler from 'eslint-plugin-react-compiler';
import reactHooks from 'eslint-plugin-react-hooks';
import { defineConfig } from 'eslint/config';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default defineConfig([
  tseslint.configs.recommended,
  pluginReact.configs.flat.recommended,
  reactCompiler.configs.recommended,
  reactHooks.configs.flat.recommended,
  {
    ignores: ['**/node_modules', '**/dist', '**/temp'],
  },
  {
    files: ['**/*.{js,mjs,ts,jsx,tsx}'],
    plugins: { js },
    extends: ['js/recommended'],
    rules: {
      'no-restricted-imports': [
        'error',
        {
          patterns: [{ regex: '^@mui/[^/]+$' }],
        },
      ],
      'no-unnecessary-use-callback': 'error',
      'react-compiler/react-compiler': 'error',
    },
  },
  {
    files: ['**/*.{js,mjs,ts,jsx,tsx}'],
    plugins: { pluginReact, fluentuiEslintPlugin },
    languageOptions: {
      globals: globals.browser,
    },
    extends: ['plugin:react/recommended', 'plugin:@fluentui/react-components/recommended'],
    rules: {
      'no-restricted-imports': [
        'error',
        {
          patterns: [{ regex: '^@fluentui/[^/]+$' }],
        },
      ],
      'no-unnecessary-use-callback': 'error',
      'react-compiler/react-compiler': 'error',
    },
  },
  {
    files: ['**/*.json'],
    plugins: { json },
    language: 'json/json',
    extends: ['json/recommended'],
  },
  {
    files: ['**/*.jsonc'],
    plugins: { json },
    language: 'json/jsonc',
    extends: ['json/recommended'],
  },
  {
    files: ['**/*.json5'],
    plugins: { json },
    language: 'json/json5',
    extends: ['json/recommended'],
  },
  {
    files: ['**/*.md'],
    plugins: { markdown },
    language: 'markdown/gfm',
    extends: ['markdown/recommended'],
  },
  {
    files: ['**/*.css'],
    plugins: { css },
    language: 'css/css',
    extends: ['css/recommended'],
  },
]);
