<script>
    export let paper;

    const author = paper.author.join(", ");

    // For bibtex
    /*
    const author = paper.author
        .split(' and ')
        .map(name => name.split(',')
            .map(word => word.trim())
            .reverse()
            .join(' '))
        .join(', ');
    */
</script>

<style lang="scss">
    @import "styles/util";

    article {
        display: grid;

        grid-template-rows: [image-start detail-start] 1fr [image-end detail-end];
        // grid-template-columns: [image-start] max-content [image-end detail-start] auto [detail-end];
        grid-template-columns: [detail-start] auto [detail-end];
        gap: $blank * 2;

        img {
            grid-area: image;
            max-width: 250px;
            max-height: 250px;
        }

        section {
            grid-area: detail;

            text-align: left;

            @include padding-y($blank);

            h5 {
                font-weight: bold;

                a {
                    color: $black;

                    &:hover {
                        color: $gray-700;
                    }
                }

            }

            b.title a{
                color: $blue-700;
            }

            p {
                @include margin-y($blank * 0.5);

                b.code a{
                    color: $blue-800;
                }
            }
        }
    }
</style>

<article>
    <!-- <img src={paper.image || 'image/dummy.svg'} alt="Summary"/> -->
    <section>
        <b class="title">
            {#if paper.url}
                <a href={paper.url} target="_blank">{paper.title}</a>
            {:else}
                {paper.title}
            {/if}
        </b>
        <p>{@html author}</p>
        <p>
            {#if paper.contribution}
                ({@html paper.contribution})
            {/if}
        </p>
        <p>
            {#if paper.booktitle}
                {paper.booktitle}
            {:else if paper.journal}
                {paper.journal}
            {/if}

            {#if paper.year}
                {paper.year}
            {/if}

            {#if paper.comment}
                ({paper.comment})
            {/if}
        </p>
        <p>
            {#if paper.note}
                {@html paper.note}
            {/if}
        </p>
        <p>
            {#if paper.code}
                <b class="code"><a href={paper.code} target="_blank">Code</a></b>
            {/if}
        </p>
    </section>
</article>
