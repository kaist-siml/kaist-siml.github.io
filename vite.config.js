import { readFileSync } from 'node:fs';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import YAML from 'yaml';

const yamlPlugin = () => ({
    name: 'yaml-loader',
    load(id) {
        const filePath = id.split('?', 1)[0];
        if (!/\.ya?ml$/.test(filePath)) return null;

        const data = YAML.parse(readFileSync(filePath, 'utf8'));
        return `export default ${JSON.stringify(data)}`;
    }
});

export default defineConfig({
    plugins: [sveltekit(), yamlPlugin()],
    css: {
        preprocessorOptions: {
            scss: {
                loadPaths: ['src']
            }
        }
    }
});
