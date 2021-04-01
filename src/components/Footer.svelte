<style lang="scss">
    @import "styles/util";

    footer {
        display: grid;

        grid-row: footer;
        grid-column: screen;

        grid-template-columns: $page-grid-template-columns;
        grid-template-rows: [content-start] 1fr [content-end];

        @include padding-x(0);
        @include padding-y($blank * 2.25);

        background-color: $dark;

        .content {
            grid-area: content;

            display: grid;

            grid-template-rows: 1fr;
            grid-auto-columns: 1fr;
            grid-auto-flow: column;
            gap: $blank;

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
        <p class="justify-right">
            <span class="text-muted">© SIML 2021</span>
        </p>
    </div>
</footer>
