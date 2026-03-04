<script>
    import publication from 'data/publication.yaml';
    import Header from 'components/Header.svelte';

    const getImageUrl = (image) => {
        const path = image || 'image/dummy_paper.svg';
        return path.startsWith('/') ? path : '/' + path;
    };

    const handleItemClick = (url) => {
        if (url) window.open(url, '_blank');
    };
</script>

<style lang="scss">
    @import "utils/variables";

    .container {
        grid-area: content;
        max-width: 100%;
        @include padding-x(0);

        display: grid;
        gap: 3rem;

        .section-card {
            border: 1px solid #eee;
            border-radius: 15px;
            padding: 2.5rem;
            background-color: #fff;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
        }

        h2 {
            margin-top: 0;
            margin-bottom: 2rem;
            font-weight: 600;
            color: $kaist-dark-blue;
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

            .paper-item:hover {
                background: #eee;
                cursor: pointer;
                color: $kaist-blue;

                .title {
                    color: $kaist-blue;
                }
            }

            .paper-item {
                font-size: 0.8rem;
                line-height: 1.5em;
                padding: .2em 0;
                margin: 1em 0;
                text-align: justify;
                text-justify: auto;
                overflow: auto;
                transition: background 0.2s, color 0.2s;

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

                .title {
                    text-decoration: none;
                    color: inherit;
                    box-shadow: none;
                    transition: color 0.2s;

                    &:hover {
                        box-shadow: none;
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

<Header segment="publication" />

<main>
    <div class="container">

    {#each Object.entries(publication) as [type, papers]}
        <div class="section-card">
            <h2>{type}</h2>
            <ul>

            {#each papers as paper}
                <!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
                <!-- svelte-ignore a11y_click_events_have_key_events -->
                <li class="paper-item" onclick={() => handleItemClick(paper.url)}>
                    <img src={getImageUrl(paper.image)} alt="...">
                    <div class='wrap'>
                        <p><b><a href={paper.url} target="_blank" class="title" onclick={(e) => e.stopPropagation()}>{paper.name}</a></b></p>
                        <p>{@html paper.author}</p>
                        <p>{@html paper.label}</p>
                        {#if paper.note}<p><b>{paper.note}</b></p>{/if}
                        <p class="links">
                            {#each Object.entries(paper.links || {}) as [name, url], i}
                            {#if url}
                                {#if i > 0}&nbsp;{/if}<a href={url} target="_blank" onclick={(e) => e.stopPropagation()}>{name}</a>
                            {/if}
                            {/each}
                        </p>
                    </div>
                </li>
            {/each}

            </ul>
        </div>
    {/each}

    </div>
</main>
