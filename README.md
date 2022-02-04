# SIML Website

This project is based on [Svelte](https://svelte.dev), [SAPPER](https://sapper.svelte.dev), [rollup.js](https://rollupjs.org/guide/en/), [Bootstrap](https://getbootstrap.com) and [sapper-blog-template](https://github.com/Charca/sapper-blog-template).

## Setup

```bash
npm install
npm run init
```

## Run development server

```bash
npm run dev
```

## Export static page

```bash
npm run export
```

Note that `301` on `index.html` and `404` on `404/index.html` are expected.

To test the exported site,

```bash
npm run serve
```

## Lint

```bash
npm run lint
npm run lint-fix  # lint with --fix option
```

Please try to keep code conventions.

## Deploy

*Do not deploy to public repository. If you want to test deployment, use your own repository.*

```bash
npm run deploy
```

## Project Structure

```bash
root
├ data
├ src
│ ├ components         # Individual components
│ ├ routes             # Pages of website (index, people, etc..)
│ ├ utils              # Utilities
│ ├ client.js          # Sapper related file (You may not need to change it)
│ ├ server.js          # Sapper related file (You may not need to change it)
│ ├ service-worker.js  # Sapper related file (You may not need to change it)
│ └ template.html      # Template of all pages
├ static               # Static files
├ .eslintignore        # ESLint related file
├ .eslintrc.js         # ESLint config file
├ .gitignore           # GIT related file
├ package-lock.json    # NPM related file
├ package.json         # NPM related file
├ rollup.config.js     # Rollup config file
└ svelte.config.js     # Svelte config file for VSCode
```

The majority of time, you may work with `components` and `routes`.
