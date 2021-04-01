<script>
    export let name;
    export let image;
</script>

<style lang="scss">
    @import "styles/util";

    .profile {
        @include margin-y($blank);
    }

    .card {
        border: none;

        .card-img-top {
            max-width: 250px;
            height: auto;

            border-radius: 0;
        }

        .card-body {
            @include padding-x(0);
        }
    }
</style>

<div class="profile col-12 col-sm-6 col-md-4 col-lg-3">
    <div class="card">
        <img src="{image}" class="card-img-top" alt="...">
        <div class="card-body">
            <h5 class="card-title">{name}</h5>
            <p class="card-text">Please fill the details</p>
        </div>
    </div>
</div>
