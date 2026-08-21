<script>
    import { slide } from 'svelte/transition';
    import BannerParticles from 'components/BannerParticles.svelte';
    import CountUp from 'components/CountUp.svelte';

    let { news, publicationCount, memberCount, alumniCount, people = [], shift = 0 } = $props();
    let archiveOpen = $state(false);
</script>

<section class="hero" aria-labelledby="hero-title">
    <BannerParticles {people} />
    <div class="hero-glow hero-glow-one"></div>
    <div class="hero-glow hero-glow-two"></div>

    <div class="hero-inner" style={`--hero-shift: ${shift}px`}>
        <div class="hero-copy">
            <p class="eyebrow"><span></span> KAIST AI · SIML LABORATORY</p>
            <h1 id="hero-title">
                <span>Statistical Inference</span>
                <em>&amp; Machine Learning</em>
            </h1>
            <p class="hero-intro">
                We bring statistical insights to modern machine learning,<br />
                from foundational methods to applications.
            </p>
            <div class="hero-actions">
                <a class="button button-primary" href="#research">
                    Explore our research <span aria-hidden="true">↘</span>
                </a>
                <a class="button button-ghost" href="/people/">Meet the team</a>
            </div>
        </div>

        <aside class="hero-news" aria-labelledby="hero-news-title">
            <div class="hero-news-head">
                <span id="hero-news-title">Latest news</span>
            </div>
            <ol>
                {#each news.slice(0, 5) as item (`${item.date}:${item.message}`)}
                    <li class:current-news={item.current}>
                        <span class="news-date">
                            <i class:current={item.current} aria-hidden="true"></i>
                            <time datetime={item.datetime}>{item.date}</time>
                        </span>
                        <div>{item.message}</div>
                    </li>
                {/each}
            </ol>
            {#if news.length > 5}
                <div class="hero-news-archive" class:open={archiveOpen}>
                    <button
                        type="button"
                        onclick={() => archiveOpen = !archiveOpen}
                        aria-expanded={archiveOpen}
                        aria-controls={archiveOpen ? 'earlier-news' : undefined}
                    >
                        Earlier updates <span aria-hidden="true">+</span>
                    </button>
                    {#if archiveOpen}
                        <ol id="earlier-news" transition:slide={{ duration: 420 }}>
                            {#each news.slice(5) as item (`${item.date}:${item.message}`)}
                                <li>
                                    <span class="news-date">
                                        <i aria-hidden="true"></i>
                                        <time datetime={item.datetime}>{item.date}</time>
                                    </span>
                                    <div>{item.message}</div>
                                </li>
                            {/each}
                        </ol>
                    {/if}
                </div>
            {/if}
        </aside>
    </div>

    <div class="hero-meta">
        <div><strong><CountUp value={publicationCount} /></strong><span>Research works</span></div>
        <div><strong><CountUp value={memberCount} delay={100} /></strong><span>Active researchers</span></div>
        <div><strong><CountUp value={alumniCount} delay={200} /></strong><span>Alumni</span></div>
        <div><strong><CountUp value={2020} start={2000} delay={300} duration={1700} /></strong><span>Founded at KAIST AI</span></div>
    </div>
</section>

<style lang="scss">
    @use "utils/variables" as *;

    .hero {
        position: relative;
        min-height: max(680px, 88svh);
        overflow: hidden;
        isolation: isolate;
        color: $kaist-white;
        background: linear-gradient(135deg, rgba($black, .98), rgba($kaist-dark-blue, .96)), $black;
    }

    .hero::after {
        content: '';
        position: absolute;
        inset: 0;
        z-index: -1;
        opacity: .16;
        background-image: linear-gradient(rgba($kaist-white, .08) 1px, transparent 1px),
            linear-gradient(90deg, rgba($kaist-white, .08) 1px, transparent 1px);
        background-size: 80px 80px;
        mask-image: linear-gradient(to bottom, $black, transparent 78%);
    }

    .hero-glow {
        position: absolute;
        z-index: -1;
        border-radius: 999px;
        filter: blur(10px);
        pointer-events: none;
    }

    .hero-glow-one {
        width: 42rem;
        height: 42rem;
        top: -22rem;
        right: -8rem;
        background: radial-gradient(circle, rgba($kaist-light-blue, .26), transparent 68%);
    }

    .hero-glow-two {
        width: 30rem;
        height: 30rem;
        left: 30%;
        bottom: -20rem;
        background: radial-gradient(circle, rgba($kaist-blue, .2), transparent 70%);
    }

    .hero-inner {
        position: relative;
        z-index: 2;
        width: min(calc(100% - 3rem), 1440px);
        min-height: 620px;
        margin: 0 auto;
        padding: 8rem 0 8.5rem;
        display: grid;
        grid-template-columns: minmax(0, 1.18fr) minmax(420px, .82fr);
        align-items: center;
        gap: clamp(3rem, 6vw, 6rem);
        transform: translateY(calc(var(--hero-shift) * -1));
        will-change: transform;
        pointer-events: none;
    }

    .hero-copy { max-width: 820px; }
    .hero-actions,
    .hero-actions a,
    .hero-news { pointer-events: auto; }

    .eyebrow {
        margin: 0 0 1.5rem;
        display: flex;
        align-items: center;
        gap: .75rem;
        color: $kaist-light-blue;
        font-size: .74rem;
        font-weight: 700;
        letter-spacing: .18em;
        text-transform: uppercase;
    }

    .eyebrow span { width: 2.25rem; height: 1px; background: currentColor; }

    h1 {
        width: fit-content;
        max-width: 900px;
        margin: 0;
        color: $kaist-white;
        text-align: left;
        font-size: clamp(3.1rem, 5.5vw, 5.8rem);
        font-weight: 500;
        letter-spacing: -.065em;
        line-height: .98;
    }

    h1 span,
    h1 em { display: block; white-space: nowrap; }
    h1 em { color: $kaist-light-blue; font-style: normal; }

    .hero-intro {
        max-width: 650px;
        margin: 1.5rem 0 0;
        color: rgba($kaist-white, .7);
        font-size: clamp(1.12rem, 1.65vw, 1.35rem);
        line-height: 1.75;
    }

    .hero-actions { margin-top: 1.75rem; display: flex; flex-wrap: wrap; gap: .8rem; }

    .button {
        min-height: 3.4rem;
        padding: 0 1.35rem;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        gap: 1rem;
        border: 1px solid transparent;
        border-radius: 999px;
        font-size: .9rem;
        font-weight: 700;
        transition: transform .2s ease, background-color .2s ease, border-color .2s ease;
    }

    .button:hover { transform: translateY(-2px); }
    .button-primary { color: $black; background: $kaist-light-blue; }
    .button-primary:hover { color: $black; background: $kaist-white; }

    .button-ghost {
        color: $kaist-white;
        border-color: rgba($kaist-white, .28);
        background: rgba($kaist-white, .04);
    }

    .button-ghost:hover {
        color: $kaist-white;
        border-color: rgba($kaist-white, .6);
        background: rgba($kaist-white, .1);
    }

    .hero-news {
        padding: 1.65rem;
        border: 1px solid rgba($kaist-white, .16);
        border-radius: 1.5rem;
        background: rgba($black, .68);
        box-shadow: 0 30px 80px rgba($black, .22);
        backdrop-filter: blur(16px);
    }

    .hero-news-head {
        padding: 0 .15rem 1rem;
        color: rgba($kaist-white, .62);
        font-size: .76rem;
        font-weight: 700;
        letter-spacing: .12em;
        text-transform: uppercase;
    }

    .hero-news ol { margin: 0; padding: 0; list-style: none; }

    .hero-news li {
        padding: 1rem .15rem;
        display: grid;
        grid-template-columns: 5.2rem 1fr;
        gap: .65rem;
        border-top: 1px solid rgba($kaist-white, .1);
        color: rgba($kaist-white, .76);
        font-size: .82rem;
        line-height: 1.5;
    }

    .hero-news > ol > li.current-news { color: $kaist-white; font-weight: 500; }

    .news-date {
        display: flex;
        align-items: center;
        gap: .45rem;
        color: rgba($kaist-white, .58);
        font-size: .62rem;
        font-variant-numeric: tabular-nums;
        letter-spacing: .05em;
        white-space: nowrap;
    }

    .news-date i {
        width: .42rem;
        height: .42rem;
        flex: 0 0 auto;
        border-radius: 50%;
        background: rgba($kaist-white, .28);
    }

    .news-date i.current {
        background: $kaist-light-blue;
        box-shadow: 0 0 0 4px rgba($kaist-light-blue, .12);
        animation: news-pulse 1.8s ease-in-out infinite;
    }

    .hero-news > ol > li.current-news .news-date { color: $kaist-light-blue; }

    @keyframes news-pulse {
        0%, 100% { opacity: .55; box-shadow: 0 0 0 3px rgba($kaist-light-blue, .08); }
        50% { opacity: 1; box-shadow: 0 0 0 7px rgba($kaist-light-blue, .2); }
    }

    .hero-news-archive { border-top: 1px solid rgba($kaist-white, .1); }

    .hero-news-archive > button {
        width: 100%;
        padding: .85rem .15rem 0;
        display: flex;
        justify-content: space-between;
        border: 0;
        cursor: pointer;
        color: $kaist-light-blue;
        background: transparent;
        font: inherit;
        font-size: .7rem;
        font-weight: 700;
        letter-spacing: .04em;
    }

    .hero-news-archive > button span { transition: transform .3s cubic-bezier(.22, 1, .36, 1); }
    .hero-news-archive.open > button { padding-bottom: .75rem; }
    .hero-news-archive.open > button span { transform: rotate(45deg); }

    .hero-news-archive ol {
        max-height: 260px;
        overflow-y: auto;
        overscroll-behavior: contain;
    }

    .hero-meta {
        position: absolute;
        z-index: 3;
        bottom: 2.2rem;
        left: max(1.5rem, calc((100vw - 1440px) / 2));
        display: flex;
        gap: clamp(2rem, 5vw, 5rem);
    }

    .hero-meta div { display: grid; gap: .1rem; }
    .hero-meta strong { color: $kaist-white; font-size: 1.15rem; font-weight: 700; }
    .hero-meta span {
        color: rgba($kaist-white, .45);
        font-size: .66rem;
        letter-spacing: .08em;
        text-transform: uppercase;
    }

    @media (max-width: 992px) {
        .hero-inner {
            grid-template-columns: 1fr;
            gap: 1.5rem;
            padding-top: 7.5rem;
            padding-bottom: 8.5rem;
        }
        .hero-copy,
        .hero-news { max-width: 760px; }
        .hero-news > ol { max-height: 190px; overflow-y: auto; overscroll-behavior: contain; }
    }

    @media (max-width: 720px) {
        .hero { min-height: 820px; }
        .hero-inner { width: min(calc(100% - 2rem), 1440px); min-height: 0; padding: 7.5rem 0 8rem; align-items: center; }
        h1 { font-size: clamp(1.9rem, 9.5vw, 3.5rem); }
        .hero-intro { font-size: .9rem; line-height: 1.6; }
        .hero-actions .button { min-height: 3rem; padding: 0 1rem; gap: .6rem; font-size: .76rem; }
        .hero-news { padding: 1rem; border-radius: 1rem; }
        .hero-news > ol { max-height: 165px; }
        .hero-meta {
            left: 1rem;
            right: 1rem;
            bottom: 1.25rem;
            display: grid;
            grid-template-columns: repeat(2, minmax(0, 1fr));
            gap: .8rem 1rem;
        }
    }

    @media (max-width: 400px) {
        h1 span,
        h1 em { white-space: normal; }
        .hero-intro br { display: none; }
    }

</style>
