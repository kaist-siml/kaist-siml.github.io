<script>
    const SITE_URL = 'https://siml.kaist.ac.kr';
    const DEFAULT_IMAGE = `${SITE_URL}/kaist.jpg`;

    let { title, description, path = '/', image = DEFAULT_IMAGE } = $props();
    let canonical = $derived(new URL(path, SITE_URL).href);
    let socialImage = $derived(image.startsWith('http') ? image : new URL(image, SITE_URL).href);
</script>

<svelte:head>
    <title>{title}</title>
    <meta name="description" content={description} />
    <link rel="canonical" href={canonical} />

    <meta property="og:type" content="website" />
    <meta property="og:site_name" content="KAIST SIML" />
    <meta property="og:title" content={title} />
    <meta property="og:description" content={description} />
    <meta property="og:url" content={canonical} />
    <meta property="og:image" content={socialImage} />

    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content={title} />
    <meta name="twitter:description" content={description} />
    <meta name="twitter:image" content={socialImage} />
</svelte:head>
