<script context="module">
  import publication from 'data/publication.md';
</script>

<style lang="scss">
  .container {
    :global(h2) {
      margin-top: 0;
    }

    :global(h2:not(:first-child)) {
      margin-top: 2.5em;
    }

    :global(ul) {
      list-style: none;
      padding: 0;

      :global(li) {
        font-size: .8em;
        line-height: 1.5em;
        padding: .2em 0;
        margin: 1em 0;

        :global(p) {
          font-size: 1em;
          line-height: 1.5em;
          margin-bottom: .5em;

          :global(a) {
            font-weight: bold;
          }
        }

        :global(ul) {
          margin: 0;
          padding-left: .5em;

          :global(li) {
            margin: 0;

            :global(a) {
              text-decoration: none;
              box-shadow: inset 0 -0.12em 0 #1487C8;
              transition: color linear .15s;
            }

            :global(a:hover) {
              box-shadow: inset 0 -1.5em 0 #1487C8;
              color: #FFF;
            }
          }
        }
      }
    }
  }
</style>

<svelte:head>
  <title>Publication</title>
</svelte:head>

<div class="container">
  {@html publication.html}
</div>
