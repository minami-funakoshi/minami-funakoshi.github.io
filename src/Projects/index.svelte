<script>
  import Grid from './Grid.svelte';
  import projects from './projects.json';
</script>

<section class="projects">
  <h2>Selected projects</h2>
  <hr />
  {#each projects as projectType}
    <div class="{projectType[0].type}">
      <h3>{projectType[0].type}</h3>
      <Grid
        projects="{projectType[0].projects}"
        projectType="{projectType[0].type}"
      />
    </div>
  {/each}
</section>

<style lang="scss">
  h3 {
    text-transform: lowercase;
    font-size: 1.15rem;
    font-weight: 500;
    letter-spacing: 0.5px;
    color: #666;
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
