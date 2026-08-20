<script>
    import { page } from '$app/state';
    import Header from 'components/Header.svelte';
    import Footer from 'components/Footer.svelte';

    let segment = $derived(page.url.pathname.split('/')[1] || undefined);
    let isNotFound = $derived(page.status === 404);
    let errorTitle = $derived(isNotFound ? 'Page not found' : 'Something went wrong');
    let errorMessage = $derived(isNotFound
        ? 'The page you are looking for does not exist.'
        : 'The site encountered an unexpected error. Please try again later.');
</script>

<svelte:head>
    <title>{errorTitle} — SIML</title>
    <meta name="description" content={errorMessage} />
    <meta name="robots" content="noindex, nofollow" />
</svelte:head>

<Header {segment} />

<main id="main-content" tabindex="-1">
    <section class="error-content">
        <p>{page.status}</p>
        <h1>{errorTitle}</h1>
        <span>{errorMessage}</span>
        <a href="/">Return home</a>
    </section>
</main>

<Footer />

<style lang="scss">
    @use "utils/variables" as *;

    .error-content {
        grid-area: content;
        min-height: 55vh;
        display: grid;
        place-content: center;
        justify-items: center;
        text-align: center;
    }

    p {
        margin: 0 0 .5rem;
        color: $kaist-dark-blue;
        font-size: .7rem;
        font-weight: 700;
        letter-spacing: .15em;
    }

    h1 {
        margin: 0;
        font-size: clamp(2.5rem, 7vw, 5rem);
        letter-spacing: -.06em;
    }

    span {
        margin-top: .75rem;
        color: rgba($black, .72);
    }

    a {
        margin-top: 1.5rem;
        padding: .7rem 1rem;
        border-radius: 999px;
        color: $kaist-white;
        background: $kaist-dark-blue;
        font-size: .78rem;
        font-weight: 700;
    }
</style>
