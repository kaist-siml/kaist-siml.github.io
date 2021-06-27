<style lang="scss">
    @import "styles/util";

    main {
        .content {
            grid-area: content;

            .title {
                @include margin-y($blank * 3);

                text-align: center;
            }
        }
    }
</style>

<main>
    <div class="content">
        <div class="title">
            <h2>
                Welcome to
            </h2>
            <h1>
                SIML
            </h1>
        </div>
    </div>
</main>
