<script>
    export let segment;
</script>

<style lang="scss">
    @import "utils/style";

    header {
        display: grid;

        grid-row: header;
        grid-column: screen;

        grid-template-columns: $page-grid-template-columns;
        grid-template-rows: [content-start] 1fr [content-end];

        @include padding-x(0);
        @include padding-y($blank);

        .content {
            grid-area: content;

            display: grid;

            grid-template-rows: [brand-start nav-start] 1fr [brand-end nav-end];
            grid-template-columns: [brand-start] auto [brand-end] #{$blank} [nav-start] max-content [nav-end];
            gap: $blank;

            @include padding-x(0);
            @include padding-y($blank);

            > * {
                @include margin(0);
                @include padding-top($blank);
            }

            .brand {
                grid-area: brand;

                font-size: 2.5rem;
                align-self: center;

                color: $black;

                text-decoration: none;
                font-family: Rubik, sans-serif;
                font-weight: 500;
                text-transform: uppercase;
            }

            nav {
                grid-area: nav;
                align-self: center;

                font-size: large;
                font-family: Rubik, sans-serif;
                font-weight: 500;
                text-transform: uppercase;

                display: grid;
                gap: $blank * 2;
                grid-auto-flow: column;

                a {
                    color: inherit;
                    text-decoration: none;
                    padding: 5px .5em;
                    display: block;
                    position: relative;

                    &:not(.selected) {
                        opacity: 0.7;
                    }

                    &::before {
                        content: '';
                        position: absolute;
                        transition: transform .3s ease;
                        left: 0;
                        bottom: 0;
                        width: 100%;
                        height: 2px;
                        background: $kaist-dark-gray;
                        transform: scaleX(0);
                    }
                }

                a:hover::before,
                .selected::before {
                    transform: scaleX(1);
                }

                .selected::before {
                    background: $kaist-dark-blue;
                }
            }
        }
    }

    @include media-breakpoint-down(md) {
        header {
            @include padding-y(0);
            padding-bottom: $blank;

            .content {
                .brand {
                    font-size: 1.5rem;
                }

                nav {
                    font-size: 1rem;
                }
            }
        }
    }

    @include media-breakpoint-down(sm) {
        header {
            .content {
                grid-template-rows: [brand-start] auto [brand-end nav-start] auto [nav-end];
                grid-template-columns: [brand-start nav-start] auto [brand-end nav-end];

                text-align: center;

                nav {
                    grid-auto-flow: column;
                }
            }
        }
    }
</style>

<header>
    <div class="content">
        <a class="brand" href="/">SIML</a>
        <nav>
            <a class='{segment === undefined ? "selected" : ""}' href='.'>home</a>
            <a class='{segment === "publication" ? "selected" : ""}' href='publication'>publication</a>
            <a class='{segment === "people" ? "selected" : ""}' href='people'>people</a>
        </nav>
    </div>
</header>
