<style>
  .home-container {
    align-items: center;
    display: flex;
    flex: 1;
    justify-content: center;
    min-height: 400px;
    font-weight: 300;
    font-family: sans-serif;
  }

  .home-copy {
    flex: 1;
    margin-bottom: 5em;
  }

  h1 {
    font-size: 3em;
    font-family: sans-serif;
    font-weight: 400;
  }

  h2 {
    font-size: 2em;
    font-family: sans-serif;
    font-weight: 400;
  }

  p {
    font-size: 1.4em;
    line-height: 1.5;
  }

  figure {
    margin: 0 1em;
    text-align: center;
  }

  img {
    width: 100%;
    max-width: 400px;
  }

  @media (max-width: 1020px) {
    p {
      font-size: 1.2em;
    }

    img {
      max-width: 300px;
    }
  }

  @media (max-width: 800px) {
    .home-container {
      flex-direction: column;
    }

    .home-copy {
      flex: 0;
      padding-bottom: 2em;
      text-align: center;
    }
  }
</style>

<svelte:head>
  <title>SIML</title>
</svelte:head>

<div class="container home-container">
  <div class="home-copy">
    <h1 style="margin-bottom: .5em">Welcome to</h1>
    <h2 style="margin-top: .5em">Statistical Inference and Machine Learning Lab</h2>
  </div>

  <!-- <figure>
    <img alt='KAIST' src='kaist.jpg'>
  </figure> -->
</div>
