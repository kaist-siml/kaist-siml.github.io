<script>
    import "../global.scss";
    import { page } from '$app/state';
    import Header from 'components/Header.svelte';
    import Footer from 'components/Footer.svelte';
    import { onMount } from 'svelte';

    let { children } = $props();

    // Derive segment for Header
    let segment = $derived(page.url.pathname.split('/')[1] || undefined);

    /* Inner link hack */
    onMount(async () => {
        const { default: bootstrap } = await import('bootstrap/dist/js/bootstrap.bundle.min.js');

        const updateInnerLinks = () => {
            const pathname = window.location.pathname.replace(/\/$/, '');
            document.querySelectorAll('a').forEach(a => {
                const hrefAttr = a.getAttribute('href');
                if (hrefAttr && hrefAttr.startsWith('#')) {
                    a.href = pathname + hrefAttr;
                }
            });
        };

        updateInnerLinks();
    });
</script>

<Header {segment} />
{@render children()}
<Footer />
