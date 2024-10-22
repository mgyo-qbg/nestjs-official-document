import { Linter } from 'eslint';
import typescriptParser from '@typescript-eslint/parser';
import typescriptPlugin from '@typescript-eslint/eslint-plugin';
import prettierPlugin from 'eslint-plugin-prettier';

export default [
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
