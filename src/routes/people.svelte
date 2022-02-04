<script>
  import people from 'data/people.yaml';

  import Profile from 'components/Profile.svelte';
</script>

<style lang="scss">
    @import "utils/style";

    .container {
        grid-area: content;
        max-width: 100%;

        display: grid;

        grid-auto-flow: row;
        grid-auto-rows: max-content;
        grid-template-columns: 1fr;
        gap: $blank * 5;

        @include padding-x(0);
    }

    @include media-breakpoint-only(xs) {
        .container {
            gap: $blank * 2;

            @include padding-x($blank * 1);
        }
    }

    @include media-breakpoint-only(sm) {
        .container {
            gap: $blank * 2;
        }
    }

    @include media-breakpoint-only(md) {
        .container {
            gap: $blank * 3;
        }
    }
</style>

<svelte:head>
  <title>SIML - People</title>
</svelte:head>

<main>
    <div class="container">
        <div>
            <h2>Professor</h2>
            <div class="row">
                {#each people.professor as person}
                    <Profile {...person} />
                {/each}
            </div>
        </div>
        <div>
            <h2>PhD Students</h2>
            <div class="row">
                {#each people.phd as person}
                    <Profile {...person} />
                {/each}
            </div>
        </div>
        <div>
            <h2>MS Students</h2>
            <div class="row row-cols-auto">
                {#each people.ms as person}
                    <Profile {...person} />
                {/each}
            </div>
        </div>
    </div>
</main>
