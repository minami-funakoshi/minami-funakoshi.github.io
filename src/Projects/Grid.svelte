<script>
  export let projects;
  console.log('projects', projects);
</script>

<div class="grid-container">
  {#each projects as { headline, dek, link }, i}
    <div class="item {(i + 1) % 3 === 0 ? 'last' : ''}">
      <h4>{headline}</h4>
      <img src="" />
      <p class="dek">{dek}</p>
      <p>{link}</p>
      <!-- <a target="_blank" href="{link}"> -->
    </div>
  {/each}
</div>

<style lang="scss">
  .grid-container {
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    // background: yellow;
  }
  .item {
    outline: 2px solid #333;
    flex: 1 0 31.5%;
    max-width: 31.5%;

    // grid version
    margin-top: 15px;
    margin-right: 20px;
    height: 100px;

    &.last {
      margin-right: 0;
      // background: yellow;
    }
  }
</style>
