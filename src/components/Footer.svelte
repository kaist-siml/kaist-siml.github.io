<script>
    let { isHome = false } = $props();
</script>

<style lang="scss">
    @import "utils/variables";

    footer {
        display: block;
        width: 100%;

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
            max-width: $max-content-width;
            margin: 0 auto;
            width: 96%;

            display: flex;
            justify-content: flex-start;
            align-items: center;

            @include padding-y($blank * 1.5);

            > * {
                @include margin(0);
            }

            .justify-left {
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
                justify-content: center;
                text-align: center;
                
                .justify-left {
                    text-align: center;
                }
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
