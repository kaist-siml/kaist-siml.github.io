# Changes

## `src/componenets/Header.svelte`

```html
<header>
    <div class="content">
        <a class="brand" href="/home">SIML</a>
        <div class="nav">
            <a href="/home" class:current={segment === 'home'}>Home</a>
            <a href="/publication" class:current={segment === 'publication'}>Publication</a>
            <a href="/project" class:current={segment === 'project'}>Project</a>
            <a href="/people" class:current={segment === 'people'}>People</a>
        </div>
    </div>
</header>
```

## `src/server.js`

```javascript
import sirv from 'sirv';
import polka from 'polka';
import compression from 'compression';
import * as sapper from '@sapper/server';

const { PORT, NODE_ENV } = process.env;
const dev = NODE_ENV === 'development';

polka()
    .use(
        compression({ threshold: 0 }),
        sirv('static', { dev }),
        sirv('data', { dev }),
        sapper.middleware(),
    )
    .listen(PORT, err => {
        if (err) console.log('error', err);
    });
```

## `rollup.config.js`

```javascript
url({
    sourceDir: path.resolve(__dirname, 'src/node_modules/images'),
    publicPath: '/client/',
}),
```

```javascript
url({
    sourceDir: path.resolve(__dirname, 'src/node_modules/images'),
    publicPath: '/client/',
    emitFiles: false, // already emitted by client build
}),
```

## `package.json`

```json
{
    "export": "sapper export --entry='/ /404'",
    "postexport": "mv __sapper__/export/404/index.html __sapper__/export/404.html && rm -rf __sapper__/export/404",
    "deploy": "gh-pages -d __sapper__/export"
}
```
