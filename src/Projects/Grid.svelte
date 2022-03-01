<script>
  export let projects;
  export let projectType;
  export let clicked = false;
  let paused;

  const baseSrc = './statics/share-cards';

  $: {
    if (clicked) {
      paused = true;
    }
    if (!clicked & paused) {
      paused = false;
    }
  }
</script>

<div class="container">
  <div class="row">
    {#each projects as { headline, dek, link, awards, imgSrc, videoSrc, posterSrc, headline, link }, i}
      <div class="project col-lg-4 col-md-6 col-sm-12">
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
              id="{videoSrc}"
              bind:paused
            >
              <source src="{baseSrc}/{projectType}/{videoSrc}.mp4" />
              Video is not supported in your browser.
            </video>
          {/if}
          <div class="dek">
            <h3>{headline}</h3>
            <p>{dek}</p>
            {#if awards}
              <div class="awards mt-1">
                {#each awards as award}
                  <p>{@html award}</p>
                {/each}
              </div>
            {/if}
          </div>
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
    color: #777;
  }

  img,
  video {
    height: 190px;
    transition: box-shadow 0.4s ease-in-out;
    box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 6px -1px,
      rgba(0, 0, 0, 0.06) 0px 2px 4px -1px;
  }
  img,
  video {
    object-fit: cover;
    width: 100%;
    object-position: top 8.5px; // left/right top/bottom
    &#gender-cropped {
      width: 90%;
      padding-left: 5%;
      padding-right: 5%;
      object-position: center -8px;

      @media only screen and (max-width: 530px) {
        width: 70%;
        padding-left: 15%;
        padding-right: 15%;
      }
    }
  }

  img:hover,
  video:hover {
    box-shadow: rgba(0, 0, 0, 0.5) 0px 3px 8px;
  }

  .awards {
    p {
      font-size: 0.9rem;
      line-height: 1.1rem;
    }
  }
  a,
  a:visited {
    color: #333;
    text-decoration: none;
  }
  a:hover {
    text-decoration: underline;
  }
</style>
