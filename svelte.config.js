import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import path from 'path';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: vitePreprocess({
        script: true,
        style: {
            css: {
                preprocessorOptions: {
                    scss: {
                        includePaths: ['src', 'node_modules'],
                    }
                }
            }
        }
    }),

	kit: {
		adapter: adapter({
			fallback: '404.html'
		}),
		alias: {
			'data': path.resolve('data'),
			'components': path.resolve('src/components'),
			'utils': path.resolve('src/utils'),
		},
        prerender: {
            handleHttpError: ({ path, referrer, message }) => {
                // ignore certain errors
                if (path === '/[object Object]' || path === '/%5Bobject%20Object%5D') return;

                // otherwise fail the build
                throw new Error(message);
            }
        }
	},
	onwarn: (warning, handler) => {
		if (warning.code === 'css-unused-selector') return;
		handler(warning);
	}
};

export default config;
