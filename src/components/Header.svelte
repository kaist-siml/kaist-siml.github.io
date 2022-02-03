<script>
  import Nav from './Nav.svelte';

  export let segment;
</script>

<style>
  header {
    margin: 0 auto;
    max-width: 1400px;
    padding: 1em 2em;
    box-sizing: border-box;
    width: 100%;
  }

  .header-container {
    display: flex;
    margin: 0 auto;
    padding: 2em 0;
    max-width: 1200px;
    width: 100%;
    flex-direction: row;
  }

  .logo {
    color: inherit;
    text-decoration: none;
    padding: 10px 5px;
    display: block;
    position: relative;
    font-size: 2.5em;
    font-family: Rubik, sans-serif;
    font-weight: 500;
    text-transform: uppercase;
  }

  @media (max-width: 500px) {
    header {
      padding-top: 0;
    }

    .header-container {
      justify-content: center;
      flex-direction: column;
    }

    .logo {
      margin: 0 auto;
      font-size: 2em;
    }
  }
</style>

<header>
  <div class="header-container">
      <a class="logo" href="/">SIML</a>
    <Nav {segment} />
  </div>
</header>
