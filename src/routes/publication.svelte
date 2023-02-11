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
        }
    }
</style>

<svelte:head>
  <title>SIML - Publication</title>
</svelte:head>

<main>
    <div class="container">

    <h2>Journals</h2>
    <ul>
        {#each publication as paper}
        {#if paper.category == 'Journal'}
        <li><a href={paper.url} target="_blank">
            <img src={paper.image || 'image/dummy_paper.svg'} alt="...">
                <div class='wrap'>
                <p><b>{paper.name}</b></p>
                <p>{paper.author}</p>
                <p>{paper.label}</p>
                <p>
                    {#if paper.preprint}<a href={paper.preprint} target="_blank">preprint</a>{/if}
                    {#if paper.code}<a href={paper.code} target="_blank">code</a>{/if}
                </p>
                </div>
        </a></li>
        {/if}
        {/each}
    </ul>

    <h2>Conferences</h2>
    <ul>
        {#each publication as paper}
        {#if paper.category == 'Conference'}
        <li><a href={paper.url} target="_blank">
            <img src={paper.image || 'image/dummy_paper.svg'} alt="...">
                <div class='wrap'>
                <p><b>{paper.name}</b></p>
                <p>{paper.author}</p>
                <p>{paper.label}</p>
                <p>
                    {#if paper.preprint}<a href={paper.preprint} target="_blank">preprint</a>{/if}
                    {#if paper.code}<a href={paper.code} target="_blank">code</a>{/if}
                </p>
                </div>
        </a></li>
        {/if}
        {/each}
    </ul>

    <h2>Workshops</h2>
    <ul>
        {#each publication as paper}
        {#if paper.category == 'Workshop'}
        <li><a href={paper.url} target="_blank">
            <img src={paper.image || 'image/dummy_paper.svg'} alt="...">
                <div class='wrap'>
                <p><b>{paper.name}</b></p>
                <p>{paper.author}</p>
                <p>{paper.label}</p>
                <p>
                    {#if paper.preprint}<a href={paper.preprint} target="_blank">preprint</a>{/if}
                    {#if paper.code}<a href={paper.code} target="_blank">code</a>{/if}
                </p>
                </div>
        </a></li>
        {/if}
        {/each}
    </ul>
    
    </div>
</main>
