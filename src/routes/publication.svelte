<script context="module">
  import publication from 'data/publication.md';
</script>

<style lang="scss" global>
    @import "utils/style";

    .container {
        grid-area: content;
        max-width: 100%;
        @include padding-x(0);

        h2:not(:first-child) {
            margin-top: 2em;
        }

        a {
            @include decorate-a;
        }

        ul {
            list-style: none;
            padding: 0;

            li {
                font-size: 1rem;
                line-height: 1.5em;
                padding: .2em 0;
                margin: 1em 0;

                p {
                    font-size: 1em;
                    line-height: 1.5em;
                    margin-bottom: .5em;

                    a {
                      font-weight: bold;
                    }
                }

                ul {
                    margin: 0;
                    padding-left: .5em;

                    li {
                        margin: 0;
                    }
                }
            }
        }
    }
</style>

<svelte:head>
    <title>SIML - Publication</title>
</svelte:head>

<main>
    <div class="container">
        {@html publication.html}
    </div>
</main>
