import assert from 'node:assert/strict';
import test from 'node:test';
import { getBadges } from '../src/utils/publications.js';

test('workshop publications never inherit main-conference venue badges', () => {
    const badges = getBadges({
        type: 'Symposium and Workshop',
        label: 'ICLR 2026 Example Workshop, 2026'
    });

    assert.deepEqual(badges.map(badge => badge.label), ['Symposium & Workshop']);
    assert.equal(badges.some(badge => badge.label === 'ICLR'), false);
});

test('known workshop names do not receive shorthand venue badges', () => {
    const badges = getBadges({
        type: 'Symposium and Workshop',
        label: 'ICML workshop on Structured Probabilistic Inference & Generative Modeling, 2026'
    });

    assert.deepEqual(badges.map(badge => badge.label), ['Symposium & Workshop']);
});
