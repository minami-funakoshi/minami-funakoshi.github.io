<script>
  import awards from './awards.json';
</script>

<section class="awards">
  <h2>Awards</h2>
  <hr />
  {#each awards as award}
    <div class="container">
      <p class="award">{award.award}</p>
      <div class="details">
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
    </div>
  {/each}
</section>

<style lang="scss">
  .container {
    display: flex;
    padding-left: 0;

    .line-break {
      display: none;
    }

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

  @media only screen and (max-width: 530px) {
    .container {
      margin-bottom: 1rem;
      display: block;

      p.award::after {
        content: none;
      }

      .details {
        display: inline-block;
        width: 100%;
        p {
          float: left;
          margin-top: 0;
        }
      }
    }
  }
</style>
