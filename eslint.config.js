const { Linter } = require('eslint');
const typescriptParser = require('@typescript-eslint/parser');
const typescriptPlugin = require('@typescript-eslint/eslint-plugin');
const prettierPlugin = require('eslint-plugin-prettier');

module.exports = [
    {
        languageOptions: {
            parser: typescriptParser, // @typescript-eslint/parser를 사용
            parserOptions: {
                ecmaVersion: 2020,
                sourceType: 'module',
            },
        },
        plugins: {
            '@typescript-eslint': typescriptPlugin,
            prettier: prettierPlugin,
        },
        rules: {
            // 여기에 필요한 규칙을 추가하세요
            ...typescriptPlugin.configs.recommended.rules,
            'prettier/prettier': 'error',
        },
        files: ['src/**/*.{ts,js}', 'apps/**/*.{ts,js}', 'libs/**/*.{ts,js}', 'test/**/*.{ts,js}'],
    },
];
