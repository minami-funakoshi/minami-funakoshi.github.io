<script>
  export let projects;
  export let projectType;
  const baseSrc = './statics/share-cards';
</script>

<!-- <div class="container">
  <div class="row">
    {#each test as project}
      <div class="col-4">
        <h2>Headline</h2>
        <p>test description</p>
      </div>
    {/each}
  </div>
</div> -->

<div class="container">
  <div class="row">
    {#each projects as { headline, dek, link, imgSrc, videoSrc, posterSrc, headline, link }, i}
      <div class="project col-4">
        <a target="_blank" href="{link}">
          {#if imgSrc}
            <img
              src="{baseSrc}/{projectType}/{imgSrc}"
              aria-hidden="true"
              alt="{headline}"
            />
          {:else if videoSrc}
            <video
              muted
              autoplay
              playsinline
              loop
              poster="{baseSrc}/{projectType}/{posterSrc}"
            >
              <source src="{baseSrc}/{projectType}/{videoSrc}" />
              Video is not supported in your browser.
            </video>
          {/if}
          <h3>{headline}</h3>
          <p>{dek}</p>
        </a>
      </div>
    {/each}
  </div>
</div>

<style lang="scss">
  div.project {
    overflow: hidden;
    margin-bottom: 2.5rem;
    padding-left: 0;
  }

  h3 {
    font-weight: 600;
    margin-top: 7.5px;
    margin-bottom: 0;
  }

  p {
    margin: 0;
    font-size: 1rem;
    color: #666;
  }

  img,
  video {
    height: 190px;
    transition: box-shadow 0.4s ease-in-out;
    box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 6px -1px,
      rgba(0, 0, 0, 0.06) 0px 2px 4px -1px;
  }
  img {
    object-fit: cover;
    width: 100%;
    object-position: top 8.5px; // top/bottom left/right
  }
  video {
    width: 90%;
    padding-left: 5%;
    padding-right: 5%;
  }

  img:hover,
  video:hover {
    box-shadow: rgba(0, 0, 0, 0.5) 0px 3px 8px;
  }

  a,
  a:visited {
    color: #333;
    text-decoration: none;
    transform: 0.4s color ease;
  }

  a:hover,
  p:hover {
    color: rgb(0, 100, 200);
  }
</style>
