<script>
    let { segment, homeOpacity = 1 } = $props();

    let textVal = $derived(Math.round(255 * (1 - homeOpacity)));
    let textColor = $derived(`rgb(${textVal}, ${textVal}, ${textVal})`);
</script>

<style lang="scss">
    @import "utils/variables";

    header {
        display: block;
        width: 100%;

        @include padding-y($blank);

        transition: background-color 0.3s ease, color 0.3s ease;
        position: fixed;
        top: 0;
        left: 0;
        background-color: $kaist-white;
        border-bottom: 1px solid #eee;
        z-index: 1000;

        .content {
            max-width: $max-content-width;
            margin: 0 auto;
            width: 96%;

            display: flex;
            justify-content: space-between;
            align-items: center;
            flex-wrap: wrap;
            gap: $blank;

            @include padding-y($blank);

            > * {
                @include margin(0);
                padding-top: 0;
            }

            .brand {
                font-size: 2.5rem;
                color: $black;
                text-decoration: none;
                font-family: Rubik, sans-serif;
                font-weight: 500;
                text-transform: uppercase;
            }

            nav {
                font-size: large;
                font-family: Rubik, sans-serif;
                font-weight: 500;
                text-transform: uppercase;

                display: flex;
                gap: $blank * 2;
                flex-wrap: wrap;

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

            .content {
                .brand {
                    font-size: 1.5rem;
                }

                nav {
                    font-size: 1rem;
                    gap: $blank;
                }
            }
        }
    }

    @include media-breakpoint-down(sm) {
        header {
            .content {
                justify-content: center;
                flex-direction: column;

                nav {
                    justify-content: center;
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
