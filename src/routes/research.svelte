<script>
    import research from 'data/research.yaml';
</script>

<style lang="scss">
    @import "utils/style";

    .content {
        grid-area: content;
        max-width: 100%;

        display: grid;

        grid-auto-flow: row;
        grid-auto-rows: max-content;
        grid-template-columns: 1fr;
        gap: $blank * 5;

        @include padding-x(0);

        div {
            h2 {
                margin-bottom: $blank * 2;
            }

            p {
                text-align: justify;
            }

            img {
                width: 100%;
                height: auto;
                @include margin-y($blank);
            }
        }
    }

    @include media-breakpoint-only(xs) {
        .content {
            gap: $blank * 2;

            @include padding-x($blank * 1);
        }
    }

    @include media-breakpoint-only(sm) {
        .content {
            gap: $blank * 2;
        }
    }

    @include media-breakpoint-only(md) {
        .content {
            gap: $blank * 3;
        }
    }
</style>

<svelte:head>
  <title>SIML - Research</title>
</svelte:head>

<main>
    <div class="content">
        {#each research as topic}
            <div>
                <h2>{topic.name}</h2>
                <p>{topic.description}</p>
                <img src={topic.image || 'image/dummy_wide.svg'} alt="...">
            </div>
        {/each}
    </div>
</main>
