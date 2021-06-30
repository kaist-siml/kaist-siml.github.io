<script>
    export let image;
    export let name;
    export let email;
    export let interests;

    email = email.split("@").join(" (at) ");
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

            p.card-text a{
                color: $blue-700;
            }

            ul {
                margin-top: -5px;
                padding-left: 0px;
                margin-left: 18px;
            }
        }
    }
</style>

<div class="profile col-12 col-sm-6 col-md-4 col-lg-3">
    <div class="card">
        <img src={image} class="card-img-top" alt="...">
        <div class="card-body">
            <h5 class="card-title">{name}</h5>
            <!-- <p class="card-text"><a href="mailto:{email}">{email}</a></p> -->
            <p class="card-text">{email}</p>
            <ul>
                {#each interests as interest}
                    <li>{interest}</li>
                {/each}
            </ul>
        </div>
    </div>
</div>
