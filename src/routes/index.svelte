<style lang="scss">
    @import "utils/style";

    main {
        .content {
            grid-area: content;

            display: grid;
            align-items: center;
        }
    }

    .home-copy {
        margin-bottom: 5em;
    }

    h1 {
        font-size: 2.5rem;
        font-family: sans-serif;
        font-weight: 400;
    }

    h2 {
        font-size: 2rem;
        font-family: sans-serif;
        font-weight: 400;
    }

    @media (max-width: 800px) {
        .home-copy {
            flex: 0;
            padding-bottom: 2rem;
            text-align: center;
        }
    }
</style>

<svelte:head>
    <title>SIML</title>
</svelte:head>

<main>
    <div class="content">
        <div class="home-copy">
            <h1 style="margin-bottom: .5em">Welcome to</h1>
            <h2 style="margin-top: .5em">Statistical Inference and Machine Learning Lab</h2>
        </div>
    </div>
</main>
