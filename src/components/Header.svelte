<script>
    export let segment;
</script>

<style lang="scss">
    @import "styles/util";

    header {
        display: grid;

        grid-row: header;
        grid-column: screen;

        grid-template-columns: $page-grid-template-columns;
        grid-template-rows: [content-start] 1fr [content-end];

        @include padding(0);

        background-color: $dark;

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

                font-size: 2rem;
                align-self: center;

                color: $light;
            }

            .nav {
                grid-area: nav;

                font-size: larger;
                align-self: center;

                display: grid;
                gap: $blank * 2;
                grid-auto-flow: column;

                a {
                    color: $gray-500;
                }

                a:hover {
                    color: $gray-300;
                }

                a.current {
                    color: $light;
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

                .nav {
                    font-size: large;
                    grid-auto-flow: column;
                }
            }
        }
    }
</style>

<header>
    <div class="content">
        <a class="brand" href="/home">SIML</a>
        <div class="nav">
            <a href="/home" class:current={segment === 'home'}>Home</a>
            <a href="/publication" class:current={segment === 'publication'}>Publication</a>
            <a href="/project" class:current={segment === 'project'}>Project</a>
            <a href="/people" class:current={segment === 'people'}>People</a>
        </div>
    </div>
</header>
