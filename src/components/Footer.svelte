<style lang="scss">
    @import "styles/util";

    footer {
        display: grid;

        grid-row: footer;
        grid-column: screen;

        grid-template-columns: $page-grid-template-columns;
        grid-template-rows: [content-start] 1fr [content-end];

        @include padding-x(0);
        @include padding-y($blank * 1.5);

        color: $gray-500;
        background-color: $dark;

        .content {
            grid-area: content;

            display: grid;

            grid-template-rows: 1fr;
            grid-auto-columns: 1fr;
            grid-auto-flow: column;
            gap: $blank;

            @include padding-x(0);
            @include padding-y($blank * 1.5);

            > * {
                align-self: baseline;

                @include margin(0);
            }

            .justify-left {
                justify-self: left;
                text-align: left;
            }

            .justify-right {
                justify-self: right;
                text-align: right;
            }
        }
    }

    a {
        color: $gray-500;
    }

    a:hover {
        color: $gray-300 !important;
    }

    @include media-breakpoint-down(sm) {
        footer {
            .content {
                grid-auto-flow: row;

                .justify-right {
                    justify-self: left;
                    text-align: left;
                }
            }
        }
    }
</style>

<footer>
    <div class="content">
        <p class="justify-left">
            <a href="https://goo.gl/maps/mga73qU9oT8Bhz8D6">
                <i class="bi bi-geo-alt"></i>
                KAIST N5 2225
            </a>
        </p>
    </div>
</footer>
