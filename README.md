# SIML Website

Website of the KAIST Statistical Inference and Machine Learning Laboratory. It uses Svelte 5, SvelteKit, Vite, and Sass and is deployed as a static site.

## Requirements

- Node.js 22 or newer
- npm

## Development

```bash
npm install
npx playwright install chromium
npm run dev
```

Open `http://localhost:5173/`.

Before opening a pull request or deploying, run:

```bash
npm run predeploy
```

`npm run predeploy` validates YAML and static-asset references, runs unit and browser-level accessibility/interaction tests, checks Svelte and ESLint diagnostics, and creates a production build. Individual checks remain available through `npm run check`, `npm run lint`, `npm run build`, and `npm run test:e2e`.

## Project structure

```text
data/                  Editable site content
scripts/               Content validation and unit tests
tests/                 Playwright interaction and accessibility tests
src/actions/           Reusable DOM actions
src/components/        Shared and homepage components
src/routes/            Route-level composition
src/utils/             Content selectors and formatting helpers
static/                 Images, fonts, and public assets
```

Homepage sections are split into `HomeHero.svelte`, `ResearchCarousel.svelte`, and `JoinLab.svelte`. Route files should primarily compose components rather than contain section-specific behavior and styling.

## Updating content

### Publications

Edit `data/publication.yaml`.

1. Add the paper under `Conference`, `Journal`, or `Symposium and Workshop`.
2. Add a normalized `date` in `YYYY-MM` format; the unified stream is sorted from this field.
3. Use an HTTPS `url` as the card's only external destination.
4. Set `recent: true` for newly announced work that should have the gradient card and pulsing blue marker.
5. Remove `recent: true` from older work when it should return to a white card without the marker.
6. If a recent paper has no public destination yet, set `forthcoming: true`; otherwise validation fails. This renders the `To appear` badge.

The publication count, chronological stream, year separators, search/filter results, venue badges, and homepage count are derived automatically. Paper thumbnails remain in the data for possible future use but are not currently rendered.

### People

Edit the single `people` list in `data/people.yaml`. Every person appears exactly once.

For a new active member:

```yaml
- name: Example Person
  status: active
  role: ms # professor, postdoc, phd, or ms
  email: example@kaist.ac.kr
  url: https://example.com # optional
  image: image/people/example.jpg
  aliases: # optional publication-name variants
    - Example A. Person
```

When an active member becomes an alumnus, keep the same entry, change `status` to `alumni`, and add the graduation/departure year:

```yaml
- name: Example Person
  status: alumni
  role: ms
  year: 2027
  url: https://example.com
```

Keep alumni entries newest-first. Active/alumni counts, role groups, badges, alumni notes, and the homepage constellation are derived automatically. Every roster entry receives exactly one constellation dot, so adding or removing a person updates the particle count without component changes. Publication author highlights must match a roster name or alias.

### Homepage

Edit `data/home.yaml`.

- `news`: keep entries newest-first; set `current: true` only on updates that need the emphasized style and pulsing marker.
- `research`: card order and titles come directly from this list. Add an optimized `detail` image and alt text to make a topic expandable. Detail media is inserted only while its panel is open.
- `join`: controls recruitment copy and linked notes.

## Deployment

```bash
npm run predeploy
npm run deploy
```

The deployment workflow installs Chromium, runs validation, linting, the production build, Playwright interaction/accessibility coverage, and static asset-reference checks before publishing. Unreferenced images fail validation instead of silently inflating the deployment.
