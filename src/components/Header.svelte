<script>
    let { segment, homeOpacity = 1 } = $props();

    let textVal = $derived(Math.round(255 * (1 - homeOpacity)));
    let textColor = $derived(`rgb(${textVal}, ${textVal}, ${textVal})`);
</script>

<style lang="scss">
    @import "utils/variables";

    header {
        display: grid;

        grid-column: screen;

        grid-template-columns: $page-grid-template-columns;
        grid-template-rows: [content-start] 1fr [content-end];

        @include padding-x(0);
        @include padding-y($blank);
        
        transition: background-color 0.3s ease, color 0.3s ease;
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        background-color: $kaist-white;
        border-bottom: 1px solid #eee;
        z-index: 1000;

        .content {            grid-area: content;

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
                        transition: transform .3s ease, background-color 0.3s ease;
                        left: 0;
                        bottom: 0;
                        width: 100%;
                        height: 2px;
                        background: var(--underline-color, #{$kaist-dark-gray});
                        transform: scaleX(0);
                    }
                }

                a:hover::before,
                .selected::before {
                    transform: scaleX(1);
                    background: var(--underline-color, #{$kaist-dark-blue});
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

<header 
    style="
        background-color: rgba(255, 255, 255, {homeOpacity});
        opacity: 1;
        pointer-events: 'auto';
        border-bottom: {homeOpacity < 1 ? 'none' : '1px solid #eee'};
    "
>
    <div class="content">
        <a class="brand" href="/" style="color: {textColor}">SIML</a>
        <nav>
            <a class='{segment === undefined ? "selected" : ""}' href='/' style="color: {textColor}; --underline-color: {textColor}">home</a>
            <a class='{segment === "research" ? "selected" : ""}' href='/research' style="color: {textColor}; --underline-color: {textColor}">research</a>
            <a class='{segment === "publication" ? "selected" : ""}' href='/publication' style="color: {textColor}; --underline-color: {textColor}">publication</a>
            <a class='{segment === "people" ? "selected" : ""}' href='/people' style="color: {textColor}; --underline-color: {textColor}">people</a>
        </nav>
    </div>
</header>
