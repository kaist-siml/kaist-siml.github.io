<script>
    import { onMount } from 'svelte';

    let { segment, homeOpacity = 1 } = $props();
    let face = $state(5);

    onMount(() => {
        face = Math.floor(Math.random() * 6) + 1;
    });

</script>

<header
    class:solid={homeOpacity > .45}
    style={`--header-opacity: ${homeOpacity}`}
>
    <div class="header-inner">
        <a class="brand" href="/" aria-label="SIML homepage">
            <span class="brand-mark" data-face={face} aria-hidden="true">
                <i class="dot top-left"></i>
                <i class="dot top-right"></i>
                <i class="dot middle-left"></i>
                <i class="dot center"></i>
                <i class="dot middle-right"></i>
                <i class="dot bottom-left"></i>
                <i class="dot bottom-right"></i>
            </span>
            <span class="brand-copy">
                <strong>SIML</strong>
                <small>Statistical Inference<br />& Machine Learning</small>
            </span>
        </a>

        <nav aria-label="Main navigation">
            <a class:selected={segment === undefined} aria-current={segment === undefined ? 'page' : undefined} href="/">Home</a>
            <a class:selected={segment === 'publication'} aria-current={segment === 'publication' ? 'page' : undefined} href="/publication/">Publications</a>
            <a class:selected={segment === 'people'} aria-current={segment === 'people' ? 'page' : undefined} href="/people/">People</a>
        </nav>
    </div>
</header>

<style lang="scss">
    header {
        position: fixed;
        inset: 0 0 auto;
        z-index: 1000;
        color: #E1E4EB;
        border-bottom: 1px solid rgba(225, 228, 235, .1);
        background: rgba(26, 26, 26, calc(.18 * (1 - var(--header-opacity))));
        box-shadow: none;
        backdrop-filter: blur(calc(4px + 14px * var(--header-opacity)));
        transition: border-color .2s ease, box-shadow .2s ease;
    }

    header.solid {
        color: #1A1A1A;
        border-bottom-color: rgba(124, 124, 124, .16);
        background: rgba(225, 228, 235, .96);
        box-shadow: 0 8px 30px rgba(26, 26, 26, .08);
    }

    header.solid .brand small,
    header.solid nav a { opacity: .75; }

    header.solid nav a:hover,
    header.solid nav a.selected { opacity: 1; }

    .header-inner {
        width: min(calc(100% - 3rem), 1280px);
        min-height: 78px;
        margin: 0 auto;
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 2rem;
    }

    .brand {
        display: flex;
        align-items: center;
        gap: .85rem;
        color: inherit;
    }

    .brand:hover { color: inherit; }

    .brand-mark {
        --dot-edge: .42rem;
        --dot-size: .28rem;

        position: relative;
        width: 2.45rem;
        height: 2.45rem;
        display: block;
        border: 1px solid color-mix(in srgb, currentColor 30%, transparent);
        border-radius: .7rem;
        transform: rotate(45deg);
    }

    .brand-mark .dot {
        position: absolute;
        width: var(--dot-size);
        height: var(--dot-size);
        display: none;
        border-radius: 50%;
        background: currentColor;
    }

    .top-left { top: var(--dot-edge); left: var(--dot-edge); }
    .top-right { top: var(--dot-edge); right: var(--dot-edge); }
    .middle-left { top: 50%; left: var(--dot-edge); transform: translateY(-50%); }
    .center { top: 50%; left: 50%; transform: translate(-50%, -50%); }
    .middle-right { top: 50%; right: var(--dot-edge); transform: translateY(-50%); }
    .bottom-left { bottom: var(--dot-edge); left: var(--dot-edge); }
    .bottom-right { right: var(--dot-edge); bottom: var(--dot-edge); }

    .brand-mark[data-face='1'] .center,
    .brand-mark[data-face='2'] .top-left,
    .brand-mark[data-face='2'] .bottom-right,
    .brand-mark[data-face='3'] .top-left,
    .brand-mark[data-face='3'] .center,
    .brand-mark[data-face='3'] .bottom-right,
    .brand-mark[data-face='4'] .top-left,
    .brand-mark[data-face='4'] .top-right,
    .brand-mark[data-face='4'] .bottom-left,
    .brand-mark[data-face='4'] .bottom-right,
    .brand-mark[data-face='5'] .top-left,
    .brand-mark[data-face='5'] .top-right,
    .brand-mark[data-face='5'] .center,
    .brand-mark[data-face='5'] .bottom-left,
    .brand-mark[data-face='5'] .bottom-right,
    .brand-mark[data-face='6'] .top-left,
    .brand-mark[data-face='6'] .top-right,
    .brand-mark[data-face='6'] .middle-left,
    .brand-mark[data-face='6'] .middle-right,
    .brand-mark[data-face='6'] .bottom-left,
    .brand-mark[data-face='6'] .bottom-right {
        display: block;
    }

    .brand-copy {
        display: flex;
        align-items: center;
        gap: .85rem;
    }

    .brand strong {
        font-size: 1.35rem;
        font-weight: 700;
        letter-spacing: -.03em;
    }

    .brand small {
        padding-left: .85rem;
        border-left: 1px solid color-mix(in srgb, currentColor 25%, transparent);
        opacity: .58;
        font-size: .56rem;
        font-weight: 500;
        line-height: 1.25;
        letter-spacing: .05em;
        text-transform: uppercase;
    }

    nav {
        display: flex;
        align-items: center;
        gap: .35rem;
    }

    nav a {
        position: relative;
        padding: .65rem .9rem;
        color: inherit;
        border-radius: 999px;
        opacity: .62;
        font-size: .76rem;
        font-weight: 700;
        letter-spacing: .04em;
        transition: opacity .2s ease, background-color .2s ease;
    }

    nav a:hover,
    nav a.selected {
        color: inherit;
        opacity: 1;
        background: color-mix(in srgb, currentColor 9%, transparent);
    }

    nav a.selected::after {
        content: '';
        position: absolute;
        left: 50%;
        bottom: .28rem;
        width: .2rem;
        height: .2rem;
        border-radius: 50%;
        background: currentColor;
        transform: translateX(-50%);
    }

    @media (max-width: 720px) {
        .header-inner {
            width: calc(100% - 2rem);
            min-height: 68px;
            gap: .75rem;
        }

        .brand-mark {
            --dot-edge: .33rem;
            --dot-size: .24rem;
            width: 2rem;
            height: 2rem;
            border-radius: .55rem;
        }
        .brand small { display: none; }
        .brand strong { font-size: 1.15rem; }
        nav { gap: 0; }
        nav a { padding: .6rem .55rem; font-size: .68rem; }
    }

    @media (max-width: 400px) {
        .header-inner { width: calc(100% - 1rem); justify-content: center; gap: 0; }
        .brand { display: none; }
        nav { width: 100%; justify-content: space-between; }
        nav a { padding-inline: .2rem; }
    }
</style>
