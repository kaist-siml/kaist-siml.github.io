import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const SITE_URL = 'https://siml.kaist.ac.kr';

test('robots.txt points crawlers to the sitemap', async () => {
    const robots = await readFile('static/robots.txt', 'utf8');
    assert.match(robots, /User-agent: \*/);
    assert.match(robots, new RegExp(`Sitemap: ${SITE_URL.replaceAll('.', '\\.')}/sitemap\\.xml`));
});

test('sitemap contains every public route', async () => {
    const sitemap = await readFile('static/sitemap.xml', 'utf8');
    for (const path of ['/', '/publication/', '/people/']) {
        assert.match(sitemap, new RegExp(`<loc>${SITE_URL.replaceAll('.', '\\.')}${path}</loc>`));
    }
});
