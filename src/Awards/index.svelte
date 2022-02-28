<script>
  import awards from './awards.json';
</script>

<section class="awards">
  <h2>Awards</h2>
  <hr />
  {#each awards as award}
    <div class="container">
      <p class="award">{award.award}</p>
      <p class="org">{award.org}</p>
      <p class="year">{award.year}</p>
      {#if award.link}
        <p class="description">
          <a href="{award.link}" target="_blank">{award.description}</a>
        </p>
      {:else}
        <p class="description">{award.description}</p>
      {/if}
    </div>
  {/each}
</section>

<style lang="scss">
  .container {
    display: flex;
    padding-left: 0;

    p {
      margin: 5px 0 0 0;
      font-weight: 300;
      &.award {
        font-weight: 600;
      }
    }
    p::after {
      content: '|';
      font-weight: 500;
      color: #bbbbbb;
      margin-left: 5px;
      margin-right: 5px;
    }
    p.description::after {
      content: none;
    }
  }
</style>
