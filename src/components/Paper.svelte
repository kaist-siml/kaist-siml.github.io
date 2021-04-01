<script>
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
</article>
