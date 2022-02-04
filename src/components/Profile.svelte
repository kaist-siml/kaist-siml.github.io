<script>
    export let image;
    export let name;
    export let email;
    export let url;
    export let interests;

    email = email.split('@').join(' (at) ');
</script>

<style lang="scss">
    @import "utils/style";

    article {
        font-family: sans-serif;
        display: grid;
        grid-template-rows: [image-start detail-start] 1fr [image-end detail-end];
        grid-template-columns: [image-start] max-content [image-end detail-start] auto [detail-end];

        gap: $blank * 2;

        @include margin-y($blank * 2);

        img {
            grid-area: image;

            width: 140px;
            height: 175px;
        }

        section {
            @include padding-y($blank * 0.5);

            grid-area: detail;

            .name {
                font-weight: bold;
            }

            ul {
                margin-top: -5px;
                padding-left: 1px;
                list-style: none;

                li {
                    @include margin-y(.2em);
                    position: relative;
                    display: block;
                    padding-left: 10px;

                    &:before {
                        position: absolute;
                        left: 0;
                        content: "- ";
                    }
                }

            }
        }

        a {
            @include decorate-a;
        }
    }

    @media (max-width: 370px) {
        article {
            grid-template-columns: [image-start detail-start] 1fr [image-end detail-end];
            grid-template-rows: [image-start] max-content [image-end detail-start] auto [detail-end];
        }
    }

    @include media-breakpoint-down(sm) {
        article section {
            @include padding-y($blank * 0.5);
            img {
                width: 96px;
                height: 120px;
            }
        }
    }
</style>

<article class="col-12 col-sm-12 col-md-6 col-lg-6">
    <img src={image || 'image/dummy.svg'} alt="...">
    <section>
        <p class="name">
            {#if url}
                <a href={url} target="_blank">{name}</a>
            {:else}
                {name}
            {/if}
        </p>
        <p>
            <i class="bi bi-envelope"></i> {email}
        </p>
        <ul>
            {#each interests as interest}
                <li>{interest}</li>
            {/each}
        </ul>
    </section>
</article>
