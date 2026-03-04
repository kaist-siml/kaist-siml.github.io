<script>
    import people from 'data/people.yaml';
    import Profile from 'components/Profile.svelte';
</script>

<style lang="scss">
    @import "utils/variables";

    .content {
        grid-area: content;
        max-width: 100%;

        display: grid;

        grid-auto-flow: row;
        grid-auto-rows: max-content;
        grid-template-columns: 1fr;
        gap: $blank * 3;

        @include padding-x(0);

    }

    .section-card {
        border: 1px solid #eee;
        border-radius: 15px;
        padding: 2.5rem;
        background-color: #fff;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
    }

    h2 {
        margin-top: 0;
        margin-bottom: 2rem;
        font-weight: 600;
        color: $kaist-dark-blue;
    }

    a {
        @include decorate-a;
    }

    @include media-breakpoint-only(xs) {
        .content {
            gap: $blank * 2;

            @include padding-x($blank * 1);
        }

        .section-card {
            padding: 1rem;
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
        <div class="section-card">
            <h2>Professor</h2>
            <div class="row">
                {#each people.professor as person}
                    <Profile {...person} />
                {/each}
            </div>
        </div>
        <div class="section-card">
            <h2>Postdocs</h2>
            <div class="row">
                {#each people.postdoc as person}
                    <Profile {...person} />
                {/each}
            </div>
        </div>
        <div class="section-card">
            <h2>PhD Students</h2>
            <div class="row">
                {#each people.phd as person}
                    <Profile {...person} />
                {/each}
            </div>
        </div>
        <div class="section-card">
            <h2>MS Students</h2>
            <div class="row row-cols-auto">
                {#each people.ms as person}
                    <Profile {...person} />
                {/each}
            </div>
        </div>
        <div class="section-card">
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
