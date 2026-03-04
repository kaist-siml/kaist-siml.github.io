# SIML Website

This project is based on [Svelte 5](https://svelte.dev), [SvelteKit](https://kit.svelte.dev), [Vite](https://vitejs.dev), [Bootstrap](https://getbootstrap.com) and [sapper-blog-template](https://github.com/Charca/sapper-blog-template).

## Setup

```bash
npm install
npm run dev
```

## Structure

```bash
root
├ data                 # Content of website (yaml, md, etc..)
├ src
│ ├ components         # Shared Svelte components
│ ├ routes             # SvelteKit routes (+page.svelte, etc..)
│ ├ utils              # SCSS and JS utilities
│ └ app.html           # Main HTML template
├ static               # Static assets (images, fonts, etc..)
├ svelte.config.js     # SvelteKit configuration
├ vite.config.js       # Vite configuration
└ package.json         # NPM configuration
```

The majority of time, you may work with `data`, `src/components`, and `src/routes`.
