<script>
    import { onMount } from 'svelte';
    import home from 'data/home.md';
    import BannerParticles from 'components/BannerParticles.svelte';
    import Header from 'components/Header.svelte';

    const sections = home.html.split(/(?=<h2)/).filter(s => s.trim() !== '');

    let scrollY = $state(0);
    let innerHeight = $state(0);
    let contentElement;

    // Minimum height of the banner after collapse
    const minHeight = 400; // 25rem in pixels roughly
    
    let bannerHeight = $derived(innerHeight > 0 ? Math.max(minHeight, innerHeight - scrollY) : 0);
    
    // Banner text moves down as we scroll
    let textTranslateY = $derived(scrollY * 0.5);
    let textOpacity = $derived(Math.max(0, 1 - scrollY / 400));

    // Header starts as transparent white, transitions to solid black-on-white as we scroll
    let homeOpacity = $derived(
        scrollY < 100 ? 0 : 
        scrollY > 300 ? 1 : 
        (scrollY - 100) / 200
    );

    function scrollToContent() {
        if (contentElement) {
            contentElement.scrollIntoView({ behavior: 'smooth' });
        }
    }

    $effect(() => {
        // Check if user came from another page on the same site
        const referrer = document.referrer;
        const currentOrigin = window.location.origin;
        
        // referrer matches our site but is not this exact page
        if (referrer && referrer.startsWith(currentOrigin) && !referrer.endsWith('/')) {
            // Instant scroll to content to skip full banner
            if (contentElement) {
                contentElement.scrollIntoView();
            }
        }
    });
</script>

<svelte:window bind:scrollY={scrollY} bind:innerHeight={innerHeight} />

<style lang="scss">
    @import "utils/variables";

    main {
        padding-top: 0;
        grid-template-rows: [banner-start] auto [banner-end] 2rem [content-start] 1fr [content-end];

        .banner {
            grid-column: screen;
            position: relative;
            background-color: $black;
            
            width: 100%;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            overflow: hidden;

            .banner-text {
                position: relative;
                z-index: 1;
                pointer-events: none;
                text-align: center;
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
    <div class="banner" style="height: {bannerHeight}px">
        <BannerParticles />
        <div class="banner-text" style="transform: translateY({textTranslateY}px); opacity: {textOpacity}">
            <h2>SIML Lab.</h2>
            <h3>Statistical Inference and Machine Learning</h3>
        </div>
        {#if scrollY < 50}
            <button class="scroll-down" onclick={scrollToContent} aria-label="Scroll down"></button>
        {/if}
    </div>

    <div class="content" bind:this={contentElement}>
        {#each sections as section}
            <div class="section-card">
                {@html section}
            </div>
        {/each}
    </div>
</main>
