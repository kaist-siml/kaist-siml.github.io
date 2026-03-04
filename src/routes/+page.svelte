<script>
    import home from 'data/home.md';

    const sections = home.html.split(/(?=<h2)/).filter(s => s.trim() !== '');
</script>

<style lang="scss">
    @import "utils/variables";

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
        {#each sections as section}
            <div class="section-card">
                {@html section}
            </div>
        {/each}
    </div>
</main>
