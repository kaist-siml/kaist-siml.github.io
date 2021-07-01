<script>
    export let image;
    export let name;
    export let email;
    export let url;
    export let interests;

    email = email.split('@').join(' (at) ');
</script>

<style lang="scss">
    @import "styles/util";

    article {
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
            @include padding-y($blank * 1.5);

            grid-area: detail;

            h5 a{
                color: $blue-700;
            }

            ul {
                margin-top: -5px;
                padding-left: 0px;
                margin-left: 18px;
            }
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
        }
    }
</style>

<article class="col-12 col-sm-12 col-md-6 col-lg-6">
    <img src={image || 'image/dummy.svg'} alt="...">
    <section>
        <h5>
            {name}
            {#if url}
                <a href={url} target="_blank"><i class="bi bi-link"></i></a>
            {/if}
        </h5>
        <!-- <p class="card-text"><a href="mailto:{email}">{email}</a></p> -->
        <p class="card-text">{email}</p>
        <ul>
            {#each interests as interest}
                <li>{interest}</li>
            {/each}
        </ul>
    </section>
</article>
