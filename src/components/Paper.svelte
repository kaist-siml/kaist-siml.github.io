<!-- <script>
    export let title;
    export let authors;
    export let image;
</script>

<style lang="scss">
    @import "styles/util";

    article {
        display: grid;

        grid-template-rows: [image-start detail-start] 1fr [image-end detail-end];
        grid-template-columns: [image-start] max-content [image-end detail-start] auto [detail-end];
        gap: $blank * 2;

        img {
            grid-area: image;
        }

        section {
            text-align: left;

            @include padding-y($blank);
        }
    }
</style>

<article>
    <img src={image} alt="Summary"/>
    <section>
        <h4>{title}</h4>
        <p>{authors.join(', ')}</p>
        <p>Here comes more details</p>
    </section>
</article> -->


<script>
    export let paper;

    const author = paper.author.split(' and ')
                                .map(name => name.split(',')
                                                 .map(word => word.trim())
                                                 .reverse()
                                                 .join(' '))
                                .join(', ');
</script>

<style lang="scss">
    @import "styles/util";

    article {
        display: grid;

        grid-template-rows: [image-start detail-start] 1fr [image-end detail-end];
        grid-template-columns: [image-start] max-content [image-end detail-start] auto [detail-end];
        gap: $blank * 2;

        img {
            grid-area: image;
            max-width: 250px;
            max-height: 250px;
        }

        section {
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

            p {
                @include margin-y($blank * 0.5);
            }
        }
    }
</style>

<article>
    <img src={paper.image || 'image/dummy.svg'} alt="Summary"/>
    <section>
        <h5>
            {#if paper.url}
                <a href={paper.url} target="_blank">{paper.title}</a>
            {:else}
                {paper.title}
            {/if}
        </h5>
        <p>{author}</p>
        <p>
            {#if paper.booktitle}
                {paper.booktitle}, {paper.year}
            {:else if  paper.journal}
                {paper.journal}, {paper.year}
            {:else}
                <b style="color: red">Detail undefined</b>
            {/if}
        </p>

        <p>Here comes more details</p>
    </section>
</article>
