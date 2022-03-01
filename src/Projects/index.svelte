<script>
  import { fade } from 'svelte/transition';
  import Grid from './Grid.svelte';
  import projects from './projects.json';
  let clicked = false;
  let buttonLabel = 'pause';

  const pauseVideo = () => {
    if (!clicked) {
      clicked = true;
      buttonLabel = 'play';
    } else {
      clicked = false;
      buttonLabel = 'pause';
    }
  };

  // For future - lazy-load videos?
</script>

<section class="projects">
  <h2>Selected works</h2>
  <hr />
  {#each projects as project}
    <div class="{project.type}">
      <h3>{project.type}</h3>
      {#if project.type == 'video'}
        <button on:click="{pauseVideo}" class="{buttonLabel}">
          <i class="fa fa-light fa-pause"></i>
          <i class="fa fa-solid fa-play"></i>
        </button>
      {/if}
      <Grid
        projects="{project.data}"
        projectType="{project.type}"
        clicked="{clicked}"
      />
    </div>
  {/each}
</section>

<style lang="scss">
  h3 {
    text-transform: capitalize;
    font-size: 1.15rem;
    font-weight: 500;
    letter-spacing: 0.8px;
    color: #666;
    margin-bottom: 12.5px;
  }

  h3,
  button {
    display: inline-block;
  }

  button {
    margin-left: 10px;
    background-color: #fafbfc;
    border: 1px solid rgba(27, 31, 35, 0.15);
    border-radius: 6px;
    box-shadow: rgb(27 31 35 / 10%) 0 1px 0,
      rgb(255 255 255 / 25%) 0 1px 0 inset;
    box-sizing: border-box;
    padding: 3px 8px;

    i {
      display: none;
      font-size: 1rem;
      color: #555;
    }
    &.play {
      i.fa-play {
        display: block;
      }
    }
    &.pause {
      i.fa-pause {
        display: block;
      }
    }
  }

  button:hover {
    font-weight: 600;
  }
  button:focus:not(:focus-visible) {
    outline: 0;
  }

  button,
  [type='button'],
  [type='reset'],
  [type='submit'] {
    -webkit-appearance: button;
  }
  button:not(:disabled),
  [type='button']:not(:disabled),
  [type='reset']:not(:disabled),
  [type='submit']:not(:disabled) {
    cursor: pointer;
  }

  ::-moz-focus-inner {
    padding: 0;
    border-style: none;
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
