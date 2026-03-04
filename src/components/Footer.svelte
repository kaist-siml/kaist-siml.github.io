<script>
    let { isHome = false } = $props();
</script>

<style lang="scss">
    @import "utils/variables";

    footer {
        display: grid;

        grid-row: footer;
        grid-column: screen;

        grid-template-columns: $page-grid-template-columns;
        grid-template-rows: [content-start] 1fr [content-end];

        @include padding-x(0);
        @include padding-y($blank * 1.5);

        color: $kaist-dark-gray;
        
        &.home-footer {
            background-color: $black;
            color: rgba(255, 255, 255, 0.6);
            
            a {
                color: rgba(255, 255, 255, 0.6);
                &:hover {
                    color: $kaist-white;
                }
            }
        }

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
            }
        }
    }
</style>

<footer class:home-footer={isHome}>
    <div class="content">
        <p class="justify-left">
            <i class="bi bi-geo-alt"></i>
            <a href="https://maps.app.goo.gl/pUsxLKwNetAkt3pg8" target="_blank">
                Seoul AI Hub, 5th Floor
            </a>
        </p>
    </div>
</footer>
