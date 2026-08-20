<script>
    import { reveal } from '../actions/reveal.js';
    import { getSafeExternalUrl } from 'utils/urls.js';

    let { image, name, email, url, role = null, featured = false, revealDelay = 0 } = $props();

    let displayEmail = $derived(String(email || '').split('@').join(' (at) '));
    let safeUrl = $derived(getSafeExternalUrl(url));
    let displayImage = $derived(image ? (image.startsWith('/') ? image : '/' + image) : '/image/dummy.svg');
</script>

<article use:reveal={{ delay: revealDelay }} class:featured class:linked={Boolean(safeUrl)}>
    <div class="profile-card">
        <div class="portrait">
            <img
                src={displayImage}
                alt={`Portrait of ${name}`}
                loading={featured ? 'eager' : 'lazy'}
                decoding="async"
            />
        </div>
        <section>
            {#if role}
                <span
                    class="role"
                    class:professor-role={role === 'Professor'}
                    class:postdoc-role={role === 'Postdoc'}
                    class:phd-role={role === 'PhD Student'}
                    class:ms-role={role === 'MS Student'}
                >
                    {role}
                </span>
            {/if}
            <p class="name">
                {#if safeUrl}
                    <a href={safeUrl} target="_blank" rel="noreferrer">{name}</a>
                {:else}
                    {name}
                {/if}
            </p>
            {#if displayEmail}<p class="email">{displayEmail}</p>{/if}
        </section>
        {#if safeUrl}
            <a class="profile-link" href={safeUrl} target="_blank" rel="noreferrer" tabindex="-1" aria-hidden="true"></a>
            <span class="profile-arrow" aria-hidden="true">↗</span>
        {/if}
    </div>
</article>

<style lang="scss">
    @use "utils/variables" as *;

    article {
        min-width: 0;
        font-family: inherit;
    }

    .profile-card {
        position: relative;
        height: 100%;
        min-height: 158px;
        padding: .65rem;
        display: grid;
        grid-template-columns: 108px minmax(0, 1fr);
        gap: .9rem;
        overflow: hidden;
        border: 1px solid rgba($kaist-dark-gray, .24);
        border-radius: 1rem;
        background: $kaist-white;
        box-shadow: 0 6px 18px rgba($black, .035);
        transition: transform .2s ease, border-color .2s ease, box-shadow .2s ease;
    }

    .profile-card:hover {
        border-color: rgba($kaist-blue, .48);
        box-shadow: 0 12px 28px rgba($kaist-dark-blue, .09);
        transform: translateY(-2px);
    }

    .portrait {
        position: relative;
        z-index: 1;
        width: 108px;
        height: 135px;
        padding: .25rem;
        overflow: hidden;
        border: 1px solid rgba($kaist-blue, .24);
        border-radius: .8rem;
        background: rgba($kaist-light-blue, .16);
    }

    .portrait::after {
        content: '';
        position: absolute;
        inset: auto .25rem .25rem auto;
        width: .62rem;
        height: .62rem;
        border: 3px solid $kaist-white;
        border-radius: 50%;
        background: $kaist-blue;
    }

    img {
        width: 100%;
        height: 100%;
        display: block;
        border-radius: .55rem;
        object-fit: cover;
        object-position: center top;
    }

    section {
        position: relative;
        z-index: 3;
        min-width: 0;
        padding: .25rem .2rem .25rem 0;
        align-self: center;
    }

    section p { margin-bottom: .4rem; }

    .name {
        color: $black;
        font-size: 1.15rem;
        font-weight: 700;
        line-height: 1.25;
        transition: color .2s ease;
    }

    .linked .profile-card { cursor: pointer; }
    .linked .profile-card:hover .name { color: $kaist-dark-blue; }
    .name a { border-radius: .2rem; }
    .name a:hover { text-decoration: underline; text-underline-offset: .18em; }
    .linked section { padding-right: 2.35rem; user-select: text; }

    .profile-link {
        position: absolute;
        z-index: 4;
        inset: 0;
        border-radius: inherit;
    }

    .profile-link:focus-visible {
        outline: 3px solid $kaist-blue;
        outline-offset: -3px;
    }

    .profile-arrow {
        position: absolute;
        z-index: 3;
        right: .75rem;
        top: 50%;
        width: 1.75rem;
        height: 1.75rem;
        display: grid;
        place-items: center;
        border: 1px solid rgba($kaist-dark-gray, .28);
        border-radius: 50%;
        color: $kaist-dark-blue;
        background: rgba($kaist-white, .75);
        font-size: .8rem;
        transform: translateY(-50%);
        pointer-events: none;
        transition: color .2s ease, border-color .2s ease, background-color .2s ease;
    }

    .profile-card:hover .profile-arrow {
        border-color: $kaist-dark-blue;
        color: $kaist-white;
        background: $kaist-dark-blue;
    }

    .email {
        overflow-wrap: anywhere;
        color: rgba($black, .72);
        font-size: .8rem;
    }

    .role {
        width: fit-content;
        margin-bottom: .5rem;
        padding: .2rem .44rem;
        display: inline-flex;
        border: 1px solid rgba($kaist-blue, .28);
        border-radius: 999px;
        color: $kaist-dark-blue;
        background: rgba($kaist-light-blue, .2);
        font-size: .55rem;
        font-weight: 700;
        letter-spacing: .07em;
        line-height: 1.2;
        text-transform: uppercase;
    }

    .role.professor-role {
        border-color: $kaist-dark-blue;
        color: $kaist-white;
        background: $kaist-dark-blue;
    }

    .role.postdoc-role {
        border-color: $kaist-dark-blue;
        color: $kaist-white;
        background: $kaist-dark-blue;
    }

    .role.phd-role {
        border-color: $kaist-light-blue;
        color: $kaist-dark-blue;
        background: $kaist-light-blue;
    }

    .role.ms-role {
        border-style: dashed;
        border-color: $kaist-blue;
        color: $kaist-dark-blue;
        background: rgba($kaist-light-blue, .2);
    }

    .featured .role {
        margin-bottom: .75rem;
        font-size: .62rem;
    }

    .featured .profile-card {
        min-height: 158px;
        padding: .65rem;
        grid-template-columns: 108px minmax(0, 1fr);
        gap: .9rem;
        border-color: rgba($kaist-blue, .36);
        background: linear-gradient(110deg, $kaist-white 0 62%, rgba($kaist-light-blue, .18));
        box-shadow: 0 14px 38px rgba($kaist-dark-blue, .08);
    }


    .featured .portrait {
        width: 108px;
        height: 135px;
        padding: .25rem;
        border-radius: .8rem;
    }

    .featured img { border-radius: .55rem; }
    .featured section { padding-right: 10rem; }
    .featured .name { margin-bottom: .65rem; }

    @media (max-width: 720px) {
        .featured .profile-card {
            min-height: 0;
            grid-template-columns: 108px minmax(0, 1fr);
            gap: .9rem;
            padding: .65rem;
        }
        .featured .portrait { width: 108px; height: 135px; }
        .featured section { padding-right: 2.35rem; }
    }

    @media (max-width: 420px) {
        .profile-card,
        .featured .profile-card {
            grid-template-columns: 88px minmax(0, 1fr);
            gap: .7rem;
            padding: .55rem;
        }

        .portrait,
        .featured .portrait {
            width: 88px;
            height: 110px;
        }

        .role { margin-bottom: .45rem; font-size: .52rem; }
        .name { font-size: .85rem; }
        .email { font-size: .61rem; }
    }
</style>
