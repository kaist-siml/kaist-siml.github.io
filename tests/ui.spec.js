import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';
import { readFileSync } from 'node:fs';
import YAML from 'yaml';

const people = YAML.parse(readFileSync('data/people.yaml', 'utf8')).people;
const peopleCount = people.length;
const firstPersonName = people[0].name;

test.describe('homepage interactions', () => {
    test.beforeEach(async ({ page }) => {
        await page.emulateMedia({ reducedMotion: 'reduce' });
        await page.goto('/');
        await expect(page.locator('#research')).toHaveAttribute('data-ready', 'true', { timeout: 15_000 });
    });

    test('carousel detail manages drag, focus, and rotation controls', async ({ page }) => {
        const trigger = page.getByRole('button', {
            name: /Reliable Foundation Models.*Show topic overview/
        });
        const box = await trigger.boundingBox();
        if (!box) throw new Error('Expandable research card is not visible');

        await page.mouse.move(box.x + box.width * .7, box.y + box.height / 2);
        await page.mouse.down();
        await page.mouse.move(box.x + box.width * .35, box.y + box.height / 2, { steps: 5 });
        await page.mouse.up();
        await expect(page.getByRole('figure')).toHaveCount(0);

        await page.reload();
        await expect(page.locator('#research')).toHaveAttribute('data-ready', 'true');
        const freshTrigger = page.getByRole('button', {
            name: /Reliable Foundation Models.*Show topic overview/
        });
        await freshTrigger.click();
        const closeButton = page.getByRole('button', { name: 'Close research topic overview' });
        await expect(closeButton).toBeFocused();
        await expect(page.getByRole('button', { name: 'Next research area' })).toBeDisabled();
        await expect(page.getByRole('button', { name: 'Previous research area' })).toBeDisabled();

        await page.keyboard.press('Escape');
        await expect(freshTrigger).toBeFocused();
        await expect(page.getByRole('figure')).toHaveCount(0);
    });

    test('keeps balanced hero spacing on large screens', async ({ page }) => {
        await page.setViewportSize({ width: 1920, height: 1440 });
        const title = await page.locator('.hero-copy h1').boundingBox();
        const news = await page.locator('.hero-news').boundingBox();
        const actions = await page.locator('.hero-actions').boundingBox();
        const statistics = await page.locator('.hero-meta').boundingBox();

        expect(title).not.toBeNull();
        expect(news).not.toBeNull();
        expect(actions).not.toBeNull();
        expect(statistics).not.toBeNull();
        expect(news.x - (title.x + title.width)).toBeGreaterThanOrEqual(64);
        expect(statistics.y - (actions.y + actions.height)).toBeGreaterThanOrEqual(32);
        expect(statistics.y - (actions.y + actions.height)).toBeLessThanOrEqual(96);
    });

    test('maps the full roster to the interactive constellation', async ({ page }) => {
        const constellation = page.getByRole('button', {
            name: new RegExp(`Interactive lab constellation with ${peopleCount} researchers`)
        });
        await expect(constellation).toHaveAttribute('data-people-count', String(peopleCount));
        await constellation.focus();
        await page.keyboard.press('Enter');
        await expect(page.locator('.particle-announcement')).toHaveText(firstPersonName);
    });

    test('renders meaningful statistic text and passes critical accessibility checks', async ({ page }) => {
        await expect(page.locator('.hero-meta > div').first()).toContainText(/\d+/);
        await expect(page.locator('.hero-meta > div').first()).toContainText('Research works');

        const results = await new AxeBuilder({ page })
            .withTags(['wcag2a', 'wcag2aa'])
            .analyze();
        const seriousViolations = results.violations.filter(({ impact }) =>
            impact === 'serious' || impact === 'critical'
        );
        expect(seriousViolations).toEqual([]);
    });
});

test.describe('publication discovery and structure', () => {
    test.beforeEach(async ({ page }) => {
        await page.emulateMedia({ reducedMotion: 'reduce' });
        await page.goto('/publication/');
    });

    test('shows the first year, filters results, and exposes status text', async ({ page }) => {
        await expect(page.locator('.year-separator').first()).toContainText('2026');
        await expect(page.getByText('Recently accepted publication', { exact: true }).first()).toBeAttached();
        await expect(page.locator('.paper-link').first()).toHaveAttribute('tabindex', '-1');

        await page.getByLabel('Search publications').fill('Bridging the missing-modality gap');
        await expect(page.getByText('1 result', { exact: true })).toBeVisible();
        const addedPaper = page.getByRole('heading', { name: /Bridging the missing-modality gap/i });
        await expect(addedPaper).toBeVisible();
        await expect(addedPaper.locator('a')).toHaveAttribute(
            'href',
            'https://openreview.net/forum?id=ATL8VtvYWd'
        );

        await page.locator('.publication-tools select').selectOption('Journal');
        await expect(page.getByText('No publications match these filters.')).toBeVisible();
    });

    test('linked publication cards use one consistent full-card hit target', async ({ page }) => {
        const card = page.locator('.paper-item.clickable').first();
        const expectedUrl = await card.locator('.paper-link').getAttribute('href');
        for (const selector of ['h3', '.authors', '.venue', '.paper-badges']) {
            const hitUrl = await card.locator(selector).evaluate(element => {
                const bounds = element.getBoundingClientRect();
                const hitTarget = document.elementFromPoint(
                    bounds.left + bounds.width / 2,
                    bounds.top + bounds.height / 2
                );
                return hitTarget?.closest('.paper-link')?.getAttribute('href') || null;
            });
            expect(hitUrl).toBe(expectedUrl);
        }
    });

    test('passes critical accessibility checks', async ({ page }) => {
        const results = await new AxeBuilder({ page })
            .withTags(['wcag2a', 'wcag2aa'])
            .analyze();
        const seriousViolations = results.violations.filter(({ impact }) =>
            impact === 'serious' || impact === 'critical'
        );
        expect(seriousViolations).toEqual([]);
    });
});

test('linked people cards use one consistent full-card hit target', async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto('/people/');

    const card = page.locator('article.linked .profile-card').first();
    const expectedUrl = await card.locator('.profile-link').getAttribute('href');
    for (const selector of ['.portrait', '.role', '.name', '.email']) {
        const hitUrl = await card.locator(selector).evaluate(element => {
            const bounds = element.getBoundingClientRect();
            const hitTarget = document.elementFromPoint(
                bounds.left + bounds.width / 2,
                bounds.top + bounds.height / 2
            );
            return hitTarget?.closest('.profile-link')?.getAttribute('href') || null;
        });
        expect(hitUrl).toBe(expectedUrl);
    }
});

test('hero headings do not overflow at 320px with enlarged text', async ({ page }) => {
    await page.setViewportSize({ width: 320, height: 900 });
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto('/');
    await page.locator('html').evaluate(element => element.style.fontSize = '200%');

    const dimensions = await page.evaluate(() => ({
        pageOverflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
        titleOverflow: document.querySelector('#hero-title').scrollWidth
            - document.querySelector('#hero-title').clientWidth
    }));
    expect(dimensions.pageOverflow).toBeLessThanOrEqual(1);
    expect(dimensions.titleOverflow).toBeLessThanOrEqual(1);
});
