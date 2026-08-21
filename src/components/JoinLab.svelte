<script>
    import { getSafeExternalUrl } from 'utils/urls.js';

    let { content } = $props();
</script>

<section class="join-section" aria-labelledby="join-title">
    <div class="join-heading">
        <p class="section-kicker">Join the lab</p>
        <h2 id="join-title" class="join-intro">{content.intro}</h2>
        <a class="admissions-button" href="https://gsai.kaist.ac.kr/admission/" target="_blank" rel="noreferrer">
            KAIST AI admissions <span aria-hidden="true">↗</span>
        </a>
    </div>
    <div class="join-copy">
        <ul>
            {#each content.points as item (item.segments[0].text)}
                <li>
                    {#each item.segments as segment (`${segment.text}:${segment.href || ''}`)}
                        {@const safeUrl = getSafeExternalUrl(segment.href)}
                        {#if safeUrl}
                            <a href={safeUrl} target="_blank" rel="noreferrer">{segment.text}</a>
                        {:else}
                            {segment.text}
                        {/if}
                    {/each}
                </li>
            {/each}
        </ul>
    </div>
</section>

<style lang="scss">
    @use "utils/variables" as *;

    .join-section {
        position: relative;
        width: min(calc(100% - 3rem), 1280px);
        margin: 0 auto clamp(4.5rem, 7vw, 7rem);
        padding: clamp(1.75rem, 3.5vw, 3.25rem);
        display: grid;
        grid-template-columns: minmax(0, 1.35fr) minmax(320px, .65fr);
        grid-template-areas: 'heading details';
        gap: clamp(2rem, 5vw, 5rem);
        align-items: center;
        overflow: hidden;
        border: 1px solid rgba($kaist-blue, .22);
        border-radius: 1.5rem;
        background:
            radial-gradient(circle at 0 0, rgba($kaist-light-blue, .28), transparent 42%),
            linear-gradient(135deg, rgba($kaist-white, .92), rgba($kaist-light-blue, .2));
        box-shadow: 0 18px 45px rgba($kaist-dark-blue, .06);
    }

    .join-section::before {
        content: '';
        position: absolute;
        inset: 0 auto 0 0;
        width: 4px;
        background: linear-gradient($kaist-blue, $kaist-light-blue);
    }

    .join-heading { grid-area: heading; align-self: center; }

    .section-kicker {
        margin: 0 0 1.15rem;
        color: $kaist-dark-blue;
        font-size: .88rem;
        font-weight: 700;
        letter-spacing: .18em;
        text-transform: uppercase;
    }

    .join-intro {
        max-width: 780px;
        margin: 0;
        color: $black;
        font-size: clamp(1.8rem, 2.75vw, 3rem);
        font-weight: 500;
        letter-spacing: -.05em;
        line-height: 1.08;
    }

    .join-copy {
        grid-area: details;
        padding: .35rem 1.15rem;
        border: 1px solid rgba($kaist-dark-gray, .18);
        border-radius: 1rem;
        background: rgba($kaist-white, .68);
    }

    .join-copy ul { margin: 0; padding: 0; list-style: none; }

    .join-copy li {
        position: relative;
        padding: .7rem 0 .7rem 1.15rem;
        border-top: 1px solid rgba($black, .12);
        color: rgba($black, .74);
        font-size: .88rem;
        line-height: 1.5;
    }

    .join-copy li:first-child { border-top: 0; }

    .join-copy li::before {
        content: '';
        position: absolute;
        top: 1.05rem;
        left: 0;
        width: .4rem;
        height: .4rem;
        border-radius: 50%;
        background: $kaist-blue;
    }

    .join-copy a {
        color: $kaist-dark-blue;
        text-decoration: underline;
        text-underline-offset: 2px;
    }

    .admissions-button {
        width: fit-content;
        min-width: 240px;
        min-height: 3.4rem;
        margin-top: 1.75rem;
        padding: 0 1.35rem;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        gap: 1.2rem;
        border-radius: 999px;
        white-space: nowrap;
        color: $kaist-white;
        background: $black;
        font-size: .88rem;
        font-weight: 700;
        transition: transform .2s ease, background-color .2s ease;
    }

    .admissions-button:hover {
        color: $kaist-white;
        background: $kaist-medium-blue;
        transform: translateY(-2px);
    }

    @media (max-width: 992px) {
        .join-section {
            grid-template-columns: 1fr;
            grid-template-areas: 'heading' 'details';
            gap: 1.5rem;
        }
        .admissions-button { max-width: 320px; }
    }

    @media (max-width: 720px) {
        .join-section {
            width: min(calc(100% - 2rem), 1280px);
            gap: 1rem;
            border-radius: 1rem;
        }
        .join-intro { font-size: clamp(1.65rem, 8vw, 2.3rem); }
        .join-copy { padding: .25rem .9rem; }
        .admissions-button { width: 100%; max-width: none; }
    }

</style>
