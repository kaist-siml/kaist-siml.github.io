# Changes

## `src/componenets/Header.svelte`

No basepath

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

"/siml" basepath

```html
<header>
    <div class="content">
        <a class="brand" href="/siml/home">SIML</a>
        <div class="nav">
            <a href="/siml/home" class:current={segment === 'home'}>Home</a>
            <a href="/siml/publication" class:current={segment === 'publication'}>Publication</a>
            <a href="/siml/project" class:current={segment === 'project'}>Project</a>
            <a href="/siml/people" class:current={segment === 'people'}>People</a>
        </div>
    </div>
</header>
```

## `package.json`

No basepath

```json
{
    "export": "sapper export --entry='/ /404'",
    "postexport": "mv __sapper__/export/404/index.html __sapper__/export/404.html && rm -rf __sapper__/export/404",
    "deploy": "gh-pages -d __sapper__/export"
}
```

"/siml" basepath

```json
{
    "export": "BASE_PATH=siml sapper export --entry='/ /404' --basepath '/siml'",
    "postexport": "mv __sapper__/export/siml/404/index.html __sapper__/export/siml/404.html && rm -rf __sapper__/export/siml/404",
    "deploy": "gh-pages -d __sapper__/export/siml"
}
```
