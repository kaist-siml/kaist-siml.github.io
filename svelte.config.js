import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import path from 'node:path';

/** @type {import('@sveltejs/kit').Config} */
const config = {
    preprocess: vitePreprocess(),
    kit: {
        adapter: adapter({
            fallback: '404.html'
        }),
        alias: {
            data: path.resolve('data'),
            components: path.resolve('src/components'),
            utils: path.resolve('src/utils')
        }
    }
};

export default config;
