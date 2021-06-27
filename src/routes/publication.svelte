<script>
    // import publications from 'data/publications.json';
    import publications from 'data/publications.bib';

    import Paper from 'components/Paper.svelte';

    const preprints = publications.filter(x => x.type === 'preprint');
    const conferences = publications.filter(x => x.type === 'article');

    const errors = publications.filter(x => (x.type !== 'preprint' && x.type !== 'article'));
</script>

<style lang="scss">
    @import "styles/util";

    main .content {
        grid-area: content;

        display: grid;

        grid-auto-flow: row;
        grid-auto-rows: max-content;
        grid-template-columns: 1fr;
        gap: $blank * 5;

        @include padding-y($blank * 2);

        h3 {
            @include padding-bottom($blank);
        }

        .list {
            display: grid;

            grid-auto-flow: row;
            grid-auto-rows: max-content;
            grid-auto-columns: 1fr;
            gap: $blank * 3;
        }
    }

    @include media-breakpoint-only(sm) {
        main .content {
            gap: $blank * 2;
        }
    }

    @include media-breakpoint-only(md) {
        main .content {
            gap: $blank * 3;
        }
    }
</style>

<main>
    <div class="content">
        {#if errors.length > 0}
            <div>
                <h1 style="color: red">Unknown types!</h1>
                <div class="list">
                    {#each errors as p}
                        <Paper paper={p} />
                    {/each}
                </div>
            </div>
        {/if}
        <div>
            <h3>Preprints</h3>
            <div class="list">
                {#each preprints as p}
                    <Paper paper={p} />
                {/each}
            </div>
        </div>
        <div>
            <h3>Conferences</h3>
            <div class="list">
                {#each conferences as p}
                    <Paper paper={p} />
                {/each}
            </div>
        </div>
    </div>
</main>
