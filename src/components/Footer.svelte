<style lang="scss">
    @import "utils/style";

    footer {
        display: grid;

        grid-row: footer;
        grid-column: screen;

        grid-template-columns: $page-grid-template-columns;
        grid-template-rows: [content-start] 1fr [content-end];

        @include padding-x(0);
        @include padding-y($blank * 1.5);

        color: $kaist-dark-gray;
        background-color: $kaist-white;

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
        @include decorate-a;
        color: $kaist-dark-gray;
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
            <i class="bi bi-geo-alt"></i>
            <a href="https://goo.gl/maps/mga73qU9oT8Bhz8D6" target="_blank">
                KAIST, Basic Experiment and Research Building (N5), Room 2225
            </a>
        </p>
    </div>
</footer>
