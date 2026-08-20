import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import YAML from 'yaml';
import { isAllowedHttpUrl } from '../src/utils/urls.js';
import { hasAllowedAuthorMarkup } from './validation-utils.js';

const CONTENT_FILES = {
    home: 'data/home.yaml',
    people: 'data/people.yaml',
    publications: 'data/publication.yaml'
};
const PUBLICATION_TYPES = ['Conference', 'Journal', 'Symposium and Workshop'];
const PEOPLE_STATUSES = ['active', 'alumni'];
const PEOPLE_ROLES = ['professor', 'postdoc', 'phd', 'ms'];

const errors = [];
const readYaml = file => YAML.parse(readFileSync(resolve(file), 'utf8'));
const assert = (condition, message) => {
    if (!condition) errors.push(message);
};

const validateUrl = (value, context) => {
    if (!value) return;
    assert(isAllowedHttpUrl(value), `${context} must use an http: or https: URL: ${value}`);
};

const validateImage = (image, context) => {
    if (!image) return;
    const path = image.replace(/^\//, '');
    assert(existsSync(resolve('static', path)), `${context} references missing image: ${image}`);
};

const getPublicationYear = label => Number(String(label || '').match(/20\d{2}/g)?.at(-1) || 0);

const validateHome = home => {
    assert(Array.isArray(home.news) && home.news.length > 0, 'home.news must be a non-empty array');
    for (const [index, item] of (home.news || []).entries()) {
        const context = `home.news[${index}]`;
        assert(/^\d{4}\.\d{2}$/.test(item.date), `${context} has an invalid date`);
        assert(Boolean(item.message), `${context} is missing its message`);
        assert(item.current === undefined || typeof item.current === 'boolean', `${context}.current must be boolean`);
        if (index > 0) {
            assert(item.date <= home.news[index - 1].date, 'home.news must be sorted newest first');
        }
    }

    assert(Array.isArray(home.research) && home.research.length > 0, 'home.research must be a non-empty array');
    const researchTitles = new Set();
    for (const [index, item] of (home.research || []).entries()) {
        const context = `home.research[${index}]`;
        assert(Boolean(item.title), `${context} is missing its title`);
        assert(!researchTitles.has(item.title), `${context} duplicates title: ${item.title}`);
        researchTitles.add(item.title);
        if (item.detail) {
            assert(Boolean(item.detail.image), `${context}.detail is missing its image`);
            assert(Boolean(item.detail.alt), `${context}.detail is missing alt text`);
            validateImage(item.detail.image, `${context}.detail`);
        }
    }

    assert(Boolean(home.join?.intro), 'home.join.intro is required');
    assert(Array.isArray(home.join?.points) && home.join.points.length > 0, 'home.join.points must be a non-empty array');
    for (const [itemIndex, item] of (home.join?.points || []).entries()) {
        assert(Array.isArray(item.segments) && item.segments.length > 0, `home.join.points[${itemIndex}] needs segments`);
        for (const [segmentIndex, segment] of (item.segments || []).entries()) {
            const context = `home.join.points[${itemIndex}].segments[${segmentIndex}]`;
            assert(Boolean(segment.text), `${context} needs text`);
            validateUrl(segment.href, context);
        }
    }
};

const validatePeople = data => {
    assert(Array.isArray(data.people), 'people.people must be an array');
    const names = new Set();
    const publicationNames = new Set();
    const emails = new Set();
    let previousAlumniYear = Infinity;

    for (const [index, person] of (data.people || []).entries()) {
        const context = `people.people[${index}]`;
        assert(Boolean(person.name), `${context} is missing a name`);
        assert(!names.has(person.name), `${context} duplicates name: ${person.name}`);
        assert(!publicationNames.has(person.name), `${context} duplicates publication name: ${person.name}`);
        names.add(person.name);
        publicationNames.add(person.name);
        assert(person.aliases === undefined || Array.isArray(person.aliases), `${context}.aliases must be an array`);
        for (const alias of person.aliases || []) {
            assert(Boolean(alias), `${context} has an empty alias`);
            assert(!publicationNames.has(alias), `${context} duplicates publication name: ${alias}`);
            publicationNames.add(alias);
        }
        assert(PEOPLE_STATUSES.includes(person.status), `${context} has an invalid status: ${person.status}`);
        assert(PEOPLE_ROLES.includes(person.role), `${context} has an invalid role: ${person.role}`);
        validateUrl(person.url, context);

        if (person.status === 'active') {
            assert(Boolean(person.email), `${context} is missing an email`);
            assert(Boolean(person.image), `${context} is missing an image`);
            assert(!emails.has(person.email), `${context} duplicates email: ${person.email}`);
            emails.add(person.email);
            validateImage(person.image, context);
        }

        if (person.status === 'alumni') {
            assert(Number.isInteger(person.year) && person.year >= 2000, `${context} has an invalid alumni year`);
            assert(person.year <= previousAlumniYear, 'Alumni must be sorted newest first');
            previousAlumniYear = person.year;
        }
    }

    return publicationNames;
};

const validatePublications = (publications, publicationNames) => {
    for (const type of PUBLICATION_TYPES) {
        assert(Array.isArray(publications[type]), `publication.${type} must be an array`);
        const titles = new Set();
        let previousYear = Infinity;

        for (const [index, paper] of (publications[type] || []).entries()) {
            const context = `publication.${type}[${index}]`;
            const year = getPublicationYear(paper.label);
            assert(Boolean(paper.name), `${context} is missing a title`);
            assert(Boolean(paper.author), `${context} is missing authors`);
            assert(hasAllowedAuthorMarkup(paper.author), `${context} contains unsupported author markup`);
            for (const match of String(paper.author).matchAll(/<b>([^<>]+)<\/b>/g)) {
                const author = match[1].replace(/[†*]+$/g, '').trim();
                assert(publicationNames.has(author), `${context} highlights an author absent from people.yaml: ${author}`);
            }
            assert(/^20\d{2}-(0[1-9]|1[0-2])$/.test(paper.date || ''), `${context} has an invalid normalized date`);
            assert(year > 0, `${context} is missing a publication year`);
            assert(Number(paper.date?.slice(0, 4)) === year, `${context} date and label years do not match`);
            assert(year <= previousYear, `publication.${type} must be sorted newest first`);
            previousYear = year;
            assert(!titles.has(paper.name), `${context} duplicates title: ${paper.name}`);
            titles.add(paper.name);
            assert(paper.recent === undefined || typeof paper.recent === 'boolean', `${context}.recent must be boolean`);
            assert(paper.forthcoming === undefined || typeof paper.forthcoming === 'boolean', `${context}.forthcoming must be boolean`);
            assert(!paper.recent || paper.url || paper.forthcoming, `${context} is recent but has no URL or forthcoming label`);
            assert(paper.links === undefined, `${context} uses obsolete links; use url instead`);
            validateUrl(paper.url, context);
            if (paper.url) {
                assert(new URL(paper.url).protocol === 'https:', `${context} must use HTTPS: ${paper.url}`);
            }
            validateImage(paper.image, context);
        }
    }
};

const home = readYaml(CONTENT_FILES.home);
const people = readYaml(CONTENT_FILES.people);
const publications = readYaml(CONTENT_FILES.publications);

validateHome(home);
const publicationNames = validatePeople(people);
validatePublications(publications, publicationNames);

if (errors.length > 0) {
    console.error(`Data validation failed with ${errors.length} error(s):`);
    for (const error of errors) console.error(`- ${error}`);
    process.exit(1);
}

console.log('Data validation passed.');
