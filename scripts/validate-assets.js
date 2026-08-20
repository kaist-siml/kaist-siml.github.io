import { readFileSync, readdirSync, statSync } from 'node:fs';
import { extname, join, relative } from 'node:path';

const TEXT_EXTENSIONS = new Set(['.css', '.html', '.js', '.json', '.md', '.scss', '.svelte', '.txt', '.xml', '.yaml', '.yml']);
const ASSET_EXTENSIONS = new Set(['.bmp', '.gif', '.ico', '.jpeg', '.jpg', '.png', '.svg', '.webp']);
const SOURCE_ROOTS = ['data', 'scripts', 'src', 'static'];

const walk = directory => readdirSync(directory)
    .flatMap(name => {
        const path = join(directory, name);
        return statSync(path).isDirectory() ? walk(path) : [path];
    });

const sourceText = SOURCE_ROOTS
    .flatMap(walk)
    .filter(path => TEXT_EXTENSIONS.has(extname(path).toLowerCase()))
    .map(path => readFileSync(path, 'utf8'))
    .join('\n');

const unreferenced = walk('static')
    .filter(path => ASSET_EXTENSIONS.has(extname(path).toLowerCase()))
    .map(path => relative('static', path).replaceAll('\\', '/'))
    .filter(path => !sourceText.includes(path));

if (unreferenced.length > 0) {
    console.error('Unreferenced static image assets:');
    for (const path of unreferenced) console.error(`- static/${path}`);
    process.exit(1);
}

console.log('Static asset references passed.');
