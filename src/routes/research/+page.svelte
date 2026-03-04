<script>
    import { onMount } from 'svelte';
    import Header from 'components/Header.svelte';
    import Footer from 'components/Footer.svelte';

    let currId = $state(0);
    const images = [
        '/image/research/Slide1.PNG',
        '/image/research/Slide2.PNG',
        '/image/research/Slide3.PNG',
        '/image/research/Slide4.PNG',
        '/image/research/Slide5.PNG',
    ];
    const imgLen = images.length;
    let positionLeft = $derived(currId * 100);

    const next = () => {
        currId = currId === imgLen - 1 ? 0 : currId + 1;
    };

    const prev = () => {
        currId = currId === 0 ? imgLen - 1 : currId - 1;
    };

    const getIndex = index => {
        currId = index;
    };

    let interval;
    const autoPlay = () => {
        if (interval) clearInterval(interval);
        interval = setInterval(next, 3000);
    };

    const stopPlay = () => {
        if (interval) clearInterval(interval);
    };

    onMount(() => {
        autoPlay();
        return () => stopPlay();
    });
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
        gap: $blank * 5;

        @include padding-x(0);
    }

    .container {
        position: relative;
        width: 100%;
        margin: 0 auto;
        overflow: hidden;
    }
    .slider {
        display: flex;
        position: relative;
        transition: left 0.5s;
    }
    .slider img {
        width: 100%;
        height: auto;
        object-fit: cover;
        flex-shrink: 0;
    }
    .arrow {
        display: flex;
        justify-content: space-between;
        align-items: center;
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
    }
    .arrow button {
        margin-bottom: 0;
        padding: 12px;
        border: 0;
        background-color: rgba(255, 255, 255, 0.7);
        cursor: pointer;
    }

    .papagination {
        position: absolute;
        bottom: 0;
        padding-bottom: 8px;
        width: 100%;
        text-align: center;
    }

    .papagination button {
        margin: 0 4px;
        width: 14px;
        height: 14px;
        border: 0;
        border-radius: 50%;
        background-color: rgba(200, 200, 200, 0.8);
        text-align: center;
        cursor: pointer;
    }
    .papagination .active {
        background-color: rgba(0, 65, 145, 0.8);
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
  <title>SIML - Research</title>
</svelte:head>

<Header segment="research" />

<main>
    <div class="content">

        <div role="region" aria-label="Research slider" onfocus={stopPlay} onmouseover={stopPlay} onmouseleave={autoPlay} class="container">
            <div class="slider" style="left: -{positionLeft}%;">
                {#each images as img}
                    <img src={img} alt="" />
                {/each}
            </div>
            <div class="arrow">
                <button onclick={prev} class="prev"> ◀ </button>
                <button onclick={next} class="next"> ▶ </button>
            </div>
            <div class="papagination">
                {#each images as _, i}
                    <button
                        class={currId === i ? 'active' : ''}
                        onclick={() => getIndex(i)}
                        aria-label="Go to slide {i + 1}"
                    ></button>
                {/each}
            </div>
        </div>
    </div>
</main>

<Footer />
