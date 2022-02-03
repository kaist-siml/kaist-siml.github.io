<script>
  export let segment;
</script>

<style>
  nav {
    align-items: center;
    display: flex;
    flex: 1;
    font-size: 1.2em;
    font-family: Rubik, sans-serif;
    font-weight: 500;
    justify-content: flex-end;
    text-transform: uppercase;
  }

  a {
    color: inherit;
    text-decoration: none;
    padding: 10px 5px;
    display: block;
    position: relative;
    margin-left: 20px;
  }

  a:not(.selected) {
    opacity: 0.7;
  }

  a::before {
    content: '';
    position: absolute;
    transition: transform .3s ease;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 2px;
    background: #AAA;
    transform: scaleX(0);
  }

  a:hover::before,
  .selected::before {
    transform: scaleX(1);
  }

  .selected::before {
    background: #1487C8;
  }

  @media (max-width: 500px) {
    nav {
      font-size: 1em;
      justify-content: center;
    }
  }
</style>

<nav>
  <a class='{segment === undefined ? "selected" : ""}' href='.'>home</a>
  <a class='{segment === "publication" ? "selected" : ""}' href='publication'>publication</a>
  <a class='{segment === "people" ? "selected" : ""}' href='people'>people</a>
</nav>
