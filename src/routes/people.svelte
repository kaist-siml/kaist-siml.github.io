<script>
    import people from 'data/people.json';

    import Profile from 'components/Profile.svelte';
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
        <div>
            <h3>Professor</h3>
            <div class="row">
                {#each people.professor as person}
                    <Profile {...person} />
                {/each}
            </div>
        </div>
        <div>
            <h3>PhD Students</h3>
            <div class="row">
                {#each people.phd as person}
                    <Profile {...person} />
                {/each}
            </div>
        </div>
        <div>
            <h3>MS Students</h3>
            <div class="row row-cols-auto">
                {#each people.ms as person}
                    <Profile {...person} />
                {/each}
            </div>
        </div>
    </div>
</main>
