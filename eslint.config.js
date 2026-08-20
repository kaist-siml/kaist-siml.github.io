import js from '@eslint/js';
import globals from 'globals';
import svelte from 'eslint-plugin-svelte';

export default [
    {
        ignores: ['.svelte-kit/**', 'build/**', 'node_modules/**']
    },
    js.configs.recommended,
    ...svelte.configs['flat/recommended'],
    {
        languageOptions: {
            globals: {
                ...globals.browser,
                ...globals.node
            }
        },
        rules: {
            'svelte/no-at-html-tags': 'off',
            'svelte/no-navigation-without-resolve': 'off'
        }
    }
];
