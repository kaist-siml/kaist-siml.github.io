<script>
    import Header from 'components/Header.svelte';
    import Footer from 'components/Footer.svelte';

    export let segment;

    /* Inner link hack */
    import { onMount } from 'svelte';

    onMount(() => {
        const pathname = window.location.pathname.replace(/\/$/, '');
        document.querySelectorAll('a').forEach(a => {
            if (a.hash && a.href.split('/').slice(-1)[0][0] === '#') {
                a.href = pathname + a.hash;
            }
        });
    });
</script>

<style lang="scss" global>
    @import "node_modules/modern-css-reset/dist/reset";
    @import "node_modules/bootstrap/scss/bootstrap";
    @import "utils/style";

    body {
        display: grid;
        grid-template-rows: [header-start] max-content [header-end] #{$blank} [main-start] 1fr [main-end] #{$blank} [footer-start] max-content [footer-end];
        grid-template-columns: [screen-start] 1fr [screen-end];

        font-family: Helvetica, sans-serif;
    }

    main {
        display: grid;

        grid-row: main;
        grid-column: screen;

        grid-template-columns: $page-grid-template-columns;
        grid-template-rows: [content-start] 1fr [content-end];
    }

    a {
        text-decoration: none;
    }

    h2 {
        font-size: 1.5rem;
    }
</style>

<template>
    <Header {segment} />
    <slot></slot>
    <Footer />
</template>
