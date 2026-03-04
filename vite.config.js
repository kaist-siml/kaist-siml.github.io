import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import yaml from '@modyfi/vite-plugin-yaml';
import { readFileSync } from 'fs';
import { basename, resolve } from 'path';
import { marked } from 'marked';

const renderer = new marked.Renderer();
const linkRenderer = renderer.link;

renderer.link = (href, title, text) => {
    const html = linkRenderer.call(renderer, href, title, text);

    if (!href) return html;

    if (href.indexOf('/') === 0) {
        return html;
    } else if (href.indexOf('#') === 0) {
        return `<a onclick="document.location.hash='${href.substring(1)}';" href="javascript:;">${text}</a>`;
    }

    return html.replace(/^<a /, '<a target="_blank" rel="nofollow" ');
};

marked.setOptions({ renderer });

const markdownPlugin = () => ({
    name: 'markdown-loader',
    transform(code, id) {
        if (!id.endsWith('.md')) return null;

        const result = marked(code);
        const html = typeof result === 'string' ? result : result.html;
        const exportFromModule = JSON.stringify({ html });

        return {
            code: `export default ${exportFromModule}`,
            map: { mappings: '' }
        };
    }
});

export default defineConfig({
	plugins: [
        sveltekit(),
        yaml(),
        markdownPlugin()
    ],
    css: {
        preprocessorOptions: {
            scss: {
                includePaths: ['src', 'node_modules'],
                quietDeps: true,
                silenceDeprecations: ['import', 'global-builtin', 'color-functions', 'if-function', 'abs-percent', 'function-units']
            }
        }
    },
    server: {
        fs: {
            allow: [
                resolve('.'),
                resolve('data')
            ]
        }
    }
});
