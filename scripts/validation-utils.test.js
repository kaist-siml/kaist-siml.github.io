import assert from 'node:assert/strict';
import test from 'node:test';
import { isAllowedHttpUrl } from '../src/utils/urls.js';
import { hasAllowedAuthorMarkup } from './validation-utils.js';

test('URL validation allows only HTTP(S)', () => {
    assert.equal(isAllowedHttpUrl('https://example.com/paper'), true);
    assert.equal(isAllowedHttpUrl('http://example.com/paper'), true);
    assert.equal(isAllowedHttpUrl('javascript:alert(1)'), false);
    assert.equal(isAllowedHttpUrl('data:text/html,<script>alert(1)</script>'), false);
    assert.equal(isAllowedHttpUrl('file:///etc/passwd'), false);
    assert.equal(isAllowedHttpUrl('not a URL'), false);
});

test('author markup permits only simple bold highlights', () => {
    assert.equal(hasAllowedAuthorMarkup('Alice, <b>Bob</b>†'), true);
    assert.equal(hasAllowedAuthorMarkup('<b>Alice</b>, <b>Bob</b>'), true);
    assert.equal(hasAllowedAuthorMarkup('<script>alert(1)</script>'), false);
    assert.equal(hasAllowedAuthorMarkup('<b onclick="alert(1)">Alice</b>'), false);
    assert.equal(hasAllowedAuthorMarkup('<b><i>Alice</i></b>'), false);
});
