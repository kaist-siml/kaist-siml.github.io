<script>
    import CountUp from 'components/CountUp.svelte';

    let {
        eyebrow,
        title,
        count,
        countLabel,
        secondaryCount,
        secondaryCountLabel
    } = $props();
</script>

<header class="page-heading">
    <div>
        <p>{eyebrow}</p>
        <h1>{title}</h1>
    </div>
    <div class="page-stats">
        <span><strong><CountUp value={count} /></strong> {countLabel}</span>
        {#if secondaryCount !== undefined}
            <span><strong><CountUp value={secondaryCount} delay={120} /></strong> {secondaryCountLabel}</span>
        {/if}
    </div>
</header>

<style lang="scss">
    @use "utils/variables" as *;

    .page-heading {
        padding: .5rem .25rem 1rem;
        display: flex;
        align-items: end;
        justify-content: space-between;
        gap: 2rem;
    }

    p {
        margin: 0 0 .4rem;
        color: $kaist-dark-blue;
        font-size: .68rem;
        font-weight: 700;
        letter-spacing: .15em;
        text-transform: uppercase;
    }

    h1 {
        margin: 0;
        color: $black;
        font-size: clamp(2.2rem, 4vw, 3.7rem);
        font-weight: 500;
        letter-spacing: -.055em;
        line-height: 1;
    }

    .page-stats {
        display: flex;
        align-items: center;
        gap: 1.5rem;
    }

    .page-stats span {
        color: rgba($black, .72);
        font-size: .7rem;
        letter-spacing: .08em;
        white-space: nowrap;
        text-transform: uppercase;
    }

    strong {
        margin-right: .3rem;
        color: $kaist-dark-blue;
        font-size: 1.05rem;
    }

    @media (max-width: 720px) {
        .page-heading {
            align-items: start;
            flex-direction: column;
            gap: .75rem;
        }

        .page-stats { flex-wrap: wrap; gap: .65rem 1.25rem; }
    }
</style>
