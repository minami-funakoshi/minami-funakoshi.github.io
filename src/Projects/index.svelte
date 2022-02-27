<script>
  import Grid from './Grid.svelte';
  import { graphics } from './projects.js';
</script>

<section class="projects">
  <h2>Projects</h2>
  <hr />
  <div class="graphics">
    <h3>Graphics</h3>
    <Grid projects="{graphics}" />
    <p>Some description on awards?</p>
  </div>
  <div class="investigative">
    <h3>Investigative</h3>
    <Grid projects="{graphics}" />
    <p>Some description on awards?</p>
  </div>
  <div class="video">
    <h3>Video news</h3>
    <Grid projects="{graphics}" />
    <p>Some description on awards?</p>
  </div>
</section>

<style lang="scss">
  h3 {
    font-weight: 500;
    margin-bottom: 0;
  }

  .projects {
    div.graphics {
      margin-top: 0;
    }
    div {
      margin-top: 3.5rem;
    }
  }
</style>
