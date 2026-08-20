<script>
    import people from 'data/people.yaml';
    import { reveal } from '../../actions/reveal.js';
    import Profile from 'components/Profile.svelte';
    import PageHeading from 'components/PageHeading.svelte';
    import Header from 'components/Header.svelte';
    import Footer from 'components/Footer.svelte';
    import Seo from 'components/Seo.svelte';
    import { getAlumniNote, getRoleLabel, organizePeople } from 'utils/people.js';
    import { getSafeExternalUrl } from 'utils/urls.js';

    const { active, alumni, byRole } = organizePeople(people);
</script>

<Seo
    title="People — KAIST SIML"
    description="Professor, researchers, students, and alumni of the KAIST SIML Laboratory."
    path="/people/"
/>

<Header segment="people" />

<main id="main-content" tabindex="-1">
    <div class="content">
        <PageHeading
            eyebrow="Our team"
            title="People at SIML"
            count={active.length}
            countLabel="active researchers"
            secondaryCount={alumni.length}
            secondaryCountLabel="alumni"
        />

        <div class="active-roster" aria-label="Active SIML researchers">
            <div class="professor-grid">
                {#each byRole.professor as person (person.email)}
                    <Profile {...person} role={getRoleLabel(person.role)} featured={true} />
                {/each}
            </div>

            <div class="people-grid">
                {#each [...byRole.postdoc, ...byRole.phd, ...byRole.ms] as person, index (person.email)}
                    <Profile
                        {...person}
                        role={getRoleLabel(person.role)}
                        revealDelay={(index % 3) * 90}
                    />
                {/each}
            </div>
        </div>

        <section class="section-card alumni-section">
            <div class="section-heading">
                <h2>Alumni</h2>
            </div>
            <ul class="alumni-list">
                {#each alumni as person, index (person.name)}
                    {@const safeUrl = getSafeExternalUrl(person.url)}
                    <li use:reveal={{ delay: (index % 3) * 80, distance: 24 }}>
                        <b>
                            {#if safeUrl}
                                <a href={safeUrl} target="_blank" rel="noreferrer">{person.name}</a>
                            {:else}
                                {person.name}
                            {/if}
                        </b>
                        <span>{getAlumniNote(person)}</span>
                    </li>
                {/each}
            </ul>
        </section>
    </div>
</main>

<Footer />

<style lang="scss">
    @use "utils/variables" as *;

    .content {
        grid-area: content;
        max-width: 100%;
        display: grid;
        gap: 1rem;
    }

    .section-card {
        padding: clamp(1.1rem, 2.2vw, 1.8rem);
        border: 1px solid rgba($kaist-dark-gray, .25);
        border-radius: 1.25rem;
        background: color-mix(in srgb, #{$kaist-white} 94%, #{$kaist-light-blue});
        box-shadow: 0 8px 28px rgba($black, .045);
    }

    .section-heading {
        margin-bottom: 1rem;
        padding-bottom: .8rem;
        display: flex;
        align-items: center;
        justify-content: space-between;
        border-bottom: 1px solid rgba($kaist-dark-gray, .2);
    }

    .section-heading h2 {
        margin: 0;
        color: $kaist-dark-blue;
        font-size: clamp(1.45rem, 2.4vw, 2rem);
        font-weight: 700;
        letter-spacing: -.035em;
    }


    .active-roster,
    .professor-grid,
    .people-grid {
        display: grid;
        gap: .75rem;
    }

    .professor-grid { grid-template-columns: 1fr; }
    .people-grid { grid-template-columns: repeat(3, minmax(0, 1fr)); }

    .alumni-list {
        margin: 0;
        padding: 0;
        display: grid;
        grid-template-columns: repeat(3, minmax(0, 1fr));
        gap: .5rem;
        list-style: none;
    }

    .alumni-list li {
        min-width: 0;
        padding: .7rem .8rem;
        display: flex;
        flex-wrap: wrap;
        gap: .25rem .45rem;
        align-items: baseline;
        border: 1px solid rgba($kaist-dark-gray, .18);
        border-radius: .7rem;
        color: rgba($black, .72);
        background: rgba($kaist-white, .65);
        font-size: .7rem;
        line-height: 1.4;
    }

    .alumni-list li::before {
        content: '';
        width: .35rem;
        height: .35rem;
        flex: 0 0 auto;
        border-radius: 50%;
        background: $kaist-blue;
    }

    .alumni-list b { color: $black; }

    .alumni-list a {
        color: inherit;
        box-shadow: inset 0 -2px 0 $kaist-blue;
    }

    .alumni-list a:hover { color: $kaist-dark-blue; }

    @media (max-width: 1050px) {
        .people-grid,
        .alumni-list { grid-template-columns: repeat(2, minmax(0, 1fr)); }
    }

    @media (max-width: 680px) {
        .content { gap: .75rem; }
        .section-card { padding: .85rem; border-radius: 1rem; }
        .people-grid,
        .alumni-list { grid-template-columns: 1fr; }
        .alumni-list { gap: .35rem; }
    }
</style>
