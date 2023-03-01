<script>
    import publication from 'data/publication.yaml';
</script>

<style lang="scss">
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
            padding: 0px;

            &:hover {
                box-shadow: inset 0 -1.5em 0 $kaist-medium-blue;
                color: $kaist-blue;
            }
        }

        ul {
            list-style: none;
            list-style-position: inside;
            padding: 0;

            li:hover {
                background: #eee;
                cursor: pointer;
            }

            li {
                font-size: 0.8rem;
                line-height: 1.5em;
                padding: .2em 0;
                margin: 1em 0;
                text-align: justify;
                text-justify: auto;
                overflow: auto;

                .wrap {
                    overflow: auto;
                }

                img {
                    float: left;
                    margin-right: 15px;
                }

                p {
                    font-size: 1em;
                    line-height: 1.5em;
                    margin-bottom: .1em;
                    overflow: auto;
                }

                ul {
                    margin: 0;
                    padding-left: .5em;

                    li {
                        margin: 0;
                    }
                }
            }

            .links {
                a {
                    @include decorate-a;
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

    {#each Object.entries(publication) as [type, papers]}
        <h2>{type}</h2>
        <ul>

        {#each papers as paper}
            <li>
                <a href={paper.url} target="_blank">
                    <img src={paper.image || 'image/dummy_paper.svg'} alt="...">
                    <div class='wrap'>
                        <p><b>{paper.name}</b></p>
                        <p>{@html paper.author}</p>
                        <p>{@html paper.label}</p>
                        {#if paper.note}<p><b>{paper.note}</b></p>{/if}
                        <p class="links">
                            {#each Object.entries(paper.links || {}) as [name, url], i}
                            {#if url}
                                {#if i > 0}&nbsp;{/if}<a href={url} target="_blank">{name}</a>
                            {/if}
                            {/each}
                        </p>
                    </div>
                </a>
            </li>
        {/each}

        </ul>
    {/each}

    </div>
</main>
