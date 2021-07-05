<script>
    import home from 'data/home.json';
</script>

<style lang="scss">
    @import "styles/util";

    main {
        .content {
            grid-area: content;

            .title {
                @include margin-y($blank * 3);

                text-align: center;
            }
        }
    }
</style>

<main>
    <div class="content">
        <div class="title">
            <h2>
                Welcome to
            </h2>
            <h1>
                Statistical Inference and Machine Learning Lab.
            </h1>
        </div>
        <div id="carousel" class="carousel slide" data-bs-ride="carousel">
            <div class="carousel-indicators">
                {#each home.carousel as image, i}
                    <button type="button" data-bs-target="#carousel" data-bs-slide-to={i} class:active={i === 0} aria-label="Slide {i + 1}"></button>
                {/each}
            </div>
            <div class="carousel-inner">
                {#each home.carousel as image, i}
                    <div class="carousel-item" class:active={i === 0}>
                        <img src={image} class="d-block w-100" alt="...">
                    </div>
                {/each}
            </div>
            <button class="carousel-control-prev" type="button" data-bs-target="#carousel" data-bs-slide="prev">
                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Previous</span>
            </button>
            <button class="carousel-control-next" type="button" data-bs-target="#carousel" data-bs-slide="next">
                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Next</span>
            </button>
        </div>
    </div>
</main>
