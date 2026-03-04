<script>
    import { onMount } from 'svelte';
    import home from 'data/home.md';
    import BannerParticles from 'components/BannerParticles.svelte';
    import Header from 'components/Header.svelte';
    import Footer from 'components/Footer.svelte';
    import ResearchSlides from 'components/ResearchSlides.svelte';

    const sections = home.html.split(/(?=<h2)/).filter(s => s.trim() !== '');

    let scrollY = $state(0);
    let innerHeight = $state(0);
    let contentElement;

    // Minimum visible height of the banner after scrolling
    const minHeight = 400; 
    
    // We move the banner up using transform, but stop once only minHeight is visible
    let effectiveTranslateY = $derived(
        innerHeight > 0 ? 
        (scrollY > (innerHeight - minHeight) ? -(innerHeight - minHeight) : -scrollY)
        : 0
    );
    
    // Parallax text effect
    let textTranslateY = $derived(scrollY * 0.4);
    let textOpacity = $derived(innerHeight > 0 ? Math.max(0, 1 - scrollY / (innerHeight * 0.6)) : 1);

    // Header fades in as we scroll
    let homeOpacity = $derived(
        scrollY < 100 ? 0 : 
        scrollY > 300 ? 1 : 
        (scrollY - 100) / 200
    );

    function scrollToContent() {
        if (innerHeight > 0) {
            window.scrollTo({ top: innerHeight - minHeight, behavior: 'smooth' });
        }
    }

    $effect(() => {
        // Skip banner if navigating back from other internal pages
        const referrer = document.referrer;
        const currentOrigin = window.location.origin;
        if (referrer && referrer.startsWith(currentOrigin) && !referrer.endsWith('/')) {
            if (innerHeight > 0) {
                window.scrollTo({ top: innerHeight - minHeight });
            }
        }
    });
</script>

<svelte:window bind:scrollY={scrollY} bind:innerHeight={innerHeight} />

<style lang="scss">
    @import "utils/variables";

    main {
        padding-top: 0;
        padding-bottom: 0;
        background-color: $black;
        grid-template-rows: [banner-start] 100vh [banner-end] 2rem [content-start] 1fr [content-end];

        .banner-container {
            grid-column: screen;
            position: sticky;
            top: 0;
            height: 100vh;
            z-index: 0;
            overflow: hidden;
            background-color: $black;
        }

        .banner {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            
            will-change: transform;
            backface-visibility: hidden;

            .banner-text {
                position: relative;
                z-index: 1;
                pointer-events: none;
                text-align: center;
                will-change: transform, opacity;
            }

            h2, h3 {
                font-family: Rubik;
                font-weight: 600;
                white-space: nowrap;
                color: $kaist-white;
                margin: 0;
            }

            h2 {
                font-size: 4rem;
                margin-bottom: 1rem;
            }

            h3 {
                font-size: 1.2rem;
            }

            .scroll-down {
                position: absolute;
                bottom: 2rem;
                left: 50%;
                transform: translateX(-50%);
                background: transparent;
                border: none;
                cursor: pointer;
                z-index: 2;
                padding: 1rem;

                &::after {
                    content: "";
                    display: block;
                    width: 2rem;
                    height: 2rem;
                    border-right: 3px solid $kaist-white;
                    border-bottom: 3px solid $kaist-white;
                    transform: rotate(45deg);
                    animation: bounce 2s infinite;
                }
            }
        }

        @keyframes bounce {
            0%, 20%, 50%, 80%, 100% {transform: translateX(-50%) translateY(0) rotate(45deg);}
            40% {transform: translateX(-50%) translateY(-10px) rotate(45deg);}
            60% {transform: translateX(-50%) translateY(-5px) rotate(45deg);}
        }

        .content {
            grid-area: content;
            display: grid;
            gap: 3rem;
            position: relative;
            z-index: 1;

            .section-card {
                border: 1px solid #eee;
                border-radius: 15px;
                padding: 2.5rem;
                background-color: #fff;
                box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);

                @include media-breakpoint-only(xs) {
                    padding: 1.5rem;
                }
            }

            :global(h2) {
                margin-top: 0;
                margin-bottom: 2rem;
                font-size: 1.5rem;
                font-family: Helvetica;
                font-weight: 600;
                color: $kaist-dark-blue;
            }
            :global(ul) {
                list-style: none;
                padding: 0;
                margin-bottom: 0;

                :global(li) {
                    position: relative;
                    padding-left: 1.2rem;
                    margin-bottom: 0.5rem;

                    &::before {
                        content: "";
                        position: absolute;
                        left: 0;
                        top: 0.6em;
                        width: 0.5rem;
                        height: 0.5rem;
                        background-color: $kaist-blue;
                        border-radius: 2px;
                    }
                }
            }

            :global(a) {
                @include decorate-a;
            }

            :global(p) {
                text-align: justify;
                margin-bottom: 0;
            }
        }
    }

    @include media-breakpoint-only(xs) {
        main .banner {
            h2 {
                font-size: 2.5rem;
            }
            h3 {
                font-size: 0.8rem;
                white-space: normal;
                padding: 0 1rem;
            }
        }
    }
</style>

<svelte:head>
    <title>SIML</title>
</svelte:head>

<Header homeOpacity={homeOpacity} />

<main>
    <div class="banner-container" style="height: {innerHeight}px">
        <div class="banner" style="transform: translate3d(0, {effectiveTranslateY}px, 0)">
            <BannerParticles />
            <div class="banner-text" style="transform: translate3d(0, {textTranslateY}px, 0); opacity: {textOpacity}">
                <h2>SIML Lab.</h2>
                <h3>Statistical Inference and Machine Learning</h3>
            </div>
            {#if scrollY < 50}
                <button class="scroll-down" onclick={scrollToContent} aria-label="Scroll down"></button>
            {/if}
        </div>
    </div>

    <div class="content" bind:this={contentElement}>
        {#each sections as section}
            <div class="section-card">
                {@html section}
            </div>
        {/each}

        <div class="section-card">
            <h2>Research</h2>
            <ResearchSlides />
        </div>
    </div>
</main>

<Footer isHome={true} />
