<script>
    import publication from 'data/publication.yaml';
    import { reveal } from '../../actions/reveal.js';
    import Header from 'components/Header.svelte';
    import Footer from 'components/Footer.svelte';
    import PageHeading from 'components/PageHeading.svelte';
    import Seo from 'components/Seo.svelte';
    import {
        createPublicationList,
        getBadges,
        getVenueText,
        parseAuthors,
        stripHtml
    } from 'utils/publications.js';
    import { getSafeExternalUrl } from 'utils/urls.js';

    const allPublications = createPublicationList(publication);
    const publicationTypes = ['All types', 'Conference', 'Journal', 'Symposium and Workshop'];
    let searchQuery = $state('');
    let typeFilter = $state('All types');
    let filteredPublications = $derived.by(() => {
        const query = searchQuery.trim().toLocaleLowerCase();
        return allPublications.filter(paper => {
            if (typeFilter !== 'All types' && paper.type !== typeFilter) return false;
            if (!query) return true;
            return [paper.name, paper.author, paper.label]
                .map(stripHtml)
                .some(value => value.toLocaleLowerCase().includes(query));
        });
    });
</script>

<Seo
    title="Publications — KAIST SIML"
    description="Research publications from the KAIST SIML Laboratory."
    path="/publication/"
/>

<Header segment="publication" />

<main id="main-content" tabindex="-1">
    <div class="publication-container">
        <PageHeading
            eyebrow="Research output"
            title="Publications"
            count={allPublications.length}
            countLabel="research works"
        />

        <section class="publication-stream" aria-label="SIML publications, newest first">
            <form class="publication-tools" role="search" onsubmit={event => event.preventDefault()}>
                <label>
                    <span>Search publications</span>
                    <input bind:value={searchQuery} type="search" placeholder="Title, author, or venue" />
                </label>
                <label>
                    <span>Publication type</span>
                    <select bind:value={typeFilter}>
                        {#each publicationTypes as type (type)}
                            <option value={type}>{type}</option>
                        {/each}
                    </select>
                </label>
                <p aria-live="polite">{filteredPublications.length} {filteredPublications.length === 1 ? 'result' : 'results'}</p>
            </form>

            <ul class="publication-list">
                {#each filteredPublications as paper, index (`${paper.type}:${paper.name}`)}
                    {#if index === 0 || paper.year !== filteredPublications[index - 1].year}
                        <li class="year-separator" aria-label={`Publications from ${paper.year}`}>
                            <span>{paper.year}</span>
                        </li>
                    {/if}
                    {@const paperUrl = getSafeExternalUrl(paper.url)}
                    {@const badges = getBadges(paper)}
                    {@const isRecent = paper.recent === true}
                    <li
                        use:reveal={{ delay: (index % 2) * 90 }}
                        class:clickable={paperUrl}
                        class:recent={isRecent}
                        class:journal-paper={paper.type === 'Journal'}
                        class:workshop-paper={paper.type === 'Symposium and Workshop'}
                        class="paper-item"
                    >
                        <div class="paper-detail">
                            <h3>
                                {#if paperUrl}
                                    <a href={paperUrl} target="_blank" rel="noreferrer">{paper.name}</a>
                                {:else}
                                    {paper.name}
                                {/if}
                            </h3>
                            <p class="authors">
                                {#each parseAuthors(paper.author) as authorSegment, segmentIndex (`${segmentIndex}:${authorSegment.text}`)}
                                    {#if authorSegment.highlighted}
                                        <strong>{authorSegment.text}</strong>
                                    {:else}
                                        {authorSegment.text}
                                    {/if}
                                {/each}
                            </p>
                            <p class="venue">{getVenueText(paper.label)}</p>
                            <div class="paper-badges" aria-label="Publication type, venue, and distinctions">
                                {#each badges as badge (`${badge.kind}:${badge.label}`)}
                                    <span
                                        class:category={badge.kind === 'category'}
                                        class:journal-category={badge.kind === 'category' && paper.type === 'Journal'}
                                        class:workshop-category={badge.kind === 'category' && paper.type === 'Symposium and Workshop'}
                                        class:workshop={badge.kind === 'workshop'}
                                        class:forthcoming={badge.kind === 'forthcoming'}
                                        class:notable={badge.kind === 'notable'}
                                    >
                                        {badge.label}
                                    </span>
                                {/each}
                            </div>
                        </div>
                        {#if isRecent}
                            <span class="publication-recent" aria-hidden="true"></span>
                            <span class="publication-status">Recently accepted publication</span>
                        {/if}
                        {#if paperUrl}
                            <a class="paper-link" href={paperUrl} target="_blank" rel="noreferrer" tabindex="-1" aria-hidden="true"></a>
                            <span class="paper-arrow" aria-hidden="true">↗</span>
                        {/if}
                    </li>
                {/each}
            </ul>
            {#if filteredPublications.length === 0}
                <p class="no-results">No publications match these filters.</p>
            {/if}
        </section>
    </div>
</main>

<Footer />

<style lang="scss">
    @use "utils/variables" as *;

    .publication-container {
        grid-area: content;
        max-width: 100%;
        display: grid;
        gap: 1rem;
    }

    .publication-tools {
        margin-bottom: 1rem;
        padding: .85rem;
        display: grid;
        grid-template-columns: minmax(0, 1fr) minmax(190px, .32fr) auto;
        gap: .75rem;
        align-items: end;
        border: 1px solid rgba($kaist-dark-gray, .22);
        border-radius: 1rem;
        background: rgba($kaist-white, .65);
    }

    .publication-tools label { display: grid; gap: .3rem; }

    .publication-tools label > span {
        color: $kaist-dark-blue;
        font-size: .62rem;
        font-weight: 700;
        letter-spacing: .06em;
        text-transform: uppercase;
    }

    .publication-tools input,
    .publication-tools select {
        width: 100%;
        min-height: 2.75rem;
        padding: .65rem .75rem;
        border: 1px solid rgba($kaist-dark-gray, .32);
        border-radius: .65rem;
        color: $black;
        background: $kaist-white;
        font-size: .76rem;
    }

    .publication-tools p {
        min-width: 4.8rem;
        margin: 0 0 .75rem;
        color: $kaist-dark-blue;
        font-size: .68rem;
        font-weight: 700;
        text-align: right;
    }

    .publication-list {
        margin: 0;
        padding: 0;
        display: grid;
        grid-template-columns: repeat(2, minmax(0, 1fr));
        gap: .75rem;
        list-style: none;
    }

    .year-separator {
        grid-column: 1 / -1;
        margin: .45rem 0 .1rem;
        display: grid;
        grid-template-columns: 1fr auto 1fr;
        gap: .8rem;
        align-items: center;
        color: rgba($black, .48);
        font-size: .68rem;
        font-weight: 700;
        letter-spacing: .1em;
    }

    .year-separator::before,
    .year-separator::after {
        content: '';
        height: 1px;
        background: linear-gradient(to right, transparent, rgba($kaist-dark-gray, .36));
    }

    .year-separator::after {
        background: linear-gradient(to left, transparent, rgba($kaist-dark-gray, .36));
    }

    .year-separator span {
        color: $kaist-dark-blue;
    }

    .paper-item {
        position: relative;
        min-width: 0;
        min-height: 9.75rem;
        padding: 1rem .85rem 1rem 1.15rem;
        display: grid;
        grid-template-columns: minmax(0, 1fr) 1.75rem;
        gap: 1rem;
        align-items: center;
        overflow: hidden;
        border: 1px solid rgba($kaist-dark-gray, .24);
        border-radius: 1rem;
        background: $kaist-white;
        box-shadow: 0 6px 20px rgba($black, .035);
        content-visibility: auto;
        contain-intrinsic-size: auto 130px;
        transition: transform .2s ease, border-color .2s ease, box-shadow .2s ease;
    }

    .paper-item.recent {
        border-color: rgba($kaist-blue, .36);
        background: linear-gradient(110deg, $kaist-white 0 62%, rgba($kaist-light-blue, .18));
        box-shadow: 0 14px 38px rgba($kaist-dark-blue, .08);
    }

    .paper-item::before {
        content: '';
        position: absolute;
        inset: .75rem auto .75rem 0;
        width: 3px;
        border-radius: 0 999px 999px 0;
        background: $kaist-blue;
    }

    .paper-item.journal-paper::before { background: $kaist-dark-blue; }

    .paper-item.workshop-paper::before {
        background: repeating-linear-gradient(
            to bottom,
            $kaist-light-blue 0 5px,
            transparent 5px 8px
        );
    }

    .paper-item.clickable { cursor: pointer; }

    .paper-item:hover {
        border-color: rgba($kaist-blue, .5);
        box-shadow: 0 12px 28px rgba($kaist-dark-blue, .09);
        transform: translateY(-2px);
    }

    .paper-detail {
        position: relative;
        z-index: 3;
        min-width: 0;
        user-select: text;
    }

    h3 {
        margin: 0 0 .35rem;
        color: $black;
        font-size: .82rem;
        font-weight: 700;
        line-height: 1.4;
    }

    .paper-item h3 { transition: color .2s ease; }
    .paper-item.clickable:hover h3 { color: $kaist-dark-blue; }
    .paper-item h3 a { border-radius: .2rem; }
    .paper-item h3 a:hover { text-decoration: underline; text-underline-offset: .18em; }

    .paper-link {
        position: absolute;
        z-index: 2;
        inset: 0;
        border-radius: inherit;
    }

    .paper-link:focus-visible {
        outline: 3px solid $kaist-blue;
        outline-offset: -3px;
    }

    .paper-detail p {
        margin: 0 0 .14rem;
        color: rgba($black, .7);
        font-size: .68rem;
        line-height: 1.45;
    }

    .venue { color: rgba($black, .72) !important; }

    .paper-badges {
        margin-top: .45rem;
        display: flex;
        flex-wrap: wrap;
        gap: .35rem;
    }

    .paper-badges span {
        padding: .2rem .5rem;
        border: 1px solid rgba($kaist-blue, .4);
        border-radius: 999px;
        color: $kaist-dark-blue;
        background: rgba($kaist-light-blue, .15);
        font-size: .62rem;
        font-weight: 700;
        letter-spacing: .025em;
    }

    .paper-badges span.category {
        border-color: $kaist-dark-blue;
        color: $kaist-white;
        background: $kaist-dark-blue;
        font-size: .57rem;
        letter-spacing: .06em;
        text-transform: uppercase;
    }

    .paper-badges span.journal-category {
        border-color: $kaist-dark-blue;
        background: $kaist-dark-blue;
    }

    .paper-badges span.workshop-category {
        border-color: $kaist-light-blue;
        color: $kaist-dark-blue;
        background: $kaist-light-blue;
        box-shadow: none;
    }

    .paper-badges span.workshop {
        border-style: dashed;
        border-color: $kaist-dark-blue;
        color: $kaist-dark-blue;
        background: rgba($kaist-light-blue, .28);
        font-weight: 500;
    }

    .paper-badges span.forthcoming {
        border-color: rgba($kaist-dark-gray, .55);
        color: $kaist-dark-blue;
        background: $kaist-white;
        font-weight: 700;
    }

    .paper-badges span.notable {
        border-color: $kaist-dark-blue;
        color: $kaist-white;
        background: $kaist-dark-blue;
    }

    .publication-status {
        position: absolute;
        width: 1px;
        height: 1px;
        margin: -1px;
        padding: 0;
        overflow: hidden;
        clip: rect(0 0 0 0);
        white-space: nowrap;
        border: 0;
    }

    .publication-recent {
        position: absolute;
        z-index: 3;
        top: 1rem;
        right: 1rem;
        width: .46rem;
        height: .46rem;
        pointer-events: none;
        border-radius: 50%;
        background: $kaist-light-blue;
        box-shadow: 0 0 0 4px rgba($kaist-light-blue, .12);
        animation: publication-pulse 1.8s ease-in-out infinite;
    }

    @keyframes publication-pulse {
        0%, 100% { opacity: .55; box-shadow: 0 0 0 3px rgba($kaist-light-blue, .08); }
        50% { opacity: 1; box-shadow: 0 0 0 7px rgba($kaist-light-blue, .2); }
    }

    .paper-arrow {
        position: relative;
        z-index: 3;
        width: 1.75rem;
        height: 1.75rem;
        display: grid;
        place-items: center;
        border: 1px solid rgba($kaist-dark-gray, .25);
        border-radius: 50%;
        color: $kaist-dark-blue;
        font-size: .85rem;
        pointer-events: none;
        transition: color .2s ease, background-color .2s ease;
    }

    .paper-item:hover .paper-arrow {
        color: $kaist-white;
        background: $kaist-dark-blue;
    }

    .no-results {
        margin: 2rem 0;
        color: rgba($black, .72);
        text-align: center;
    }

    @media (max-width: 1050px) {
        .publication-list { grid-template-columns: 1fr; }
    }

    @media (max-width: 720px) {
        .publication-container { gap: 1rem; }
        .publication-tools { grid-template-columns: 1fr; }
        .publication-tools p { margin: 0; text-align: left; }
        .paper-item {
            min-height: 11.25rem;
            padding: .9rem;
            grid-template-columns: minmax(0, 1fr);
            gap: .75rem;
            align-items: start;
        }
        .paper-arrow { display: none; }
        h3 { font-size: .77rem; }
        .paper-detail p { font-size: .66rem; }
    }
</style>
