<script context="module">
    import home from 'data/home.md';
</script>

<style lang="scss">
    @import "utils/style";

    main {
        grid-template-rows: [banner-start] max-content [banner-end] 2rem [content-start] 1fr [content-end];

        .banner {
            grid-column: screen;

            background-image: url("/kaist-gsai-bg.png");
            background-size: cover;
            background-position: top;

            h2, h3 {
                font-family: Rubik;
                font-weight: 600;

                white-space: nowrap;

                text-align: center;
                color: $kaist-white;
                // text-shadow: -1px  1px 0 $kaist-dark-blue,
                // 	          1px  1px 0 $kaist-dark-blue,
                // 	          1px -1px 0 $kaist-dark-blue,
                // 	         -1px -1px 0 $kaist-dark-blue;  // text-outline
            }

            h2 {
                margin-top: 10rem;
                font-size: 4rem;
            }

            h3 {
                font-size: 1rem;
                margin-bottom: 10rem;
            }
        }

        .content {
            grid-area: content;

            :global(h2) {
                font-size: 1.5rem;
                font-family: Helvetica;
                font-weight: 400;
                color: $kaist-dark-blue;
            }

            :global(ul) {
                list-style: none;
                padding: 0;
            }

            :global(a) {
                @include decorate-a;
            }

            :global(p) {
                text-align: justify;
            }
        }
    }
</style>

<svelte:head>
    <title>SIML</title>
</svelte:head>

<main>
    <div class="banner">
        <h2>SIML Lab.</h2>
        <h3>Statistical Inference and Machine Learning</h3>
    </div>

    <div class="content">
        {@html home.html}
    </div>
</main>
