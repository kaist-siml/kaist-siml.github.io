<script>
    import people from 'data/people.yaml';
    import Profile from 'components/Profile.svelte';
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

    }

    a {
        @include decorate-a;
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
  <title>SIML - People</title>
</svelte:head>

<main>
    <div class="content">
        <div>
            <h2>Professor</h2>
            <div class="row">
                {#each people.professor as person}
                    <Profile {...person} />
                {/each}
            </div>
        </div>
        <div>
            <h2>Postdocs</h2>
            <div class="row">
                {#each people.postdoc as person}
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
        <div>
            <h2>Alumni</h2>
            <ul>
            {#each people.alumni as person}
            <li>
            <b>{#if person.url} <a href={person.url} target="_blank">{person.name}</a> {:else} {person.name} {/if}</b>
            {person.note}
            </li>
            {/each}
            </ul>
        </div>
    </div>
</main>
