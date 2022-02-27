<script>
  import Education from './Education/index.svelte';
  import Intro from './Intro/index.svelte';
  import Awards from './Awards/index.svelte';
  import Projects from './Projects/index.svelte';
  import Footer from './Footer/index.svelte';
</script>

<Intro />

<!-- <section>
  <h2>Projects</h2>
</section> -->
<Projects />
<Awards />
<Education />
<Footer />

<style lang="scss">
  :global(section) {
    // text-align: center;
    padding-top: 2rem;
    max-width: 800px;
    margin: 0 auto;
  }

  :global(section) {
    @media (max-width: 600px) {
      max-width: none;
    }
  }

  :global(h2) {
    text-transform: uppercase;
    letter-spacing: 0.5px;
    margin-bottom: 0;
    // border-bottom: 1px solid #333;
    // width: 100%;
  }

  :global(hr) {
    margin-top: 0;
    max-width: 800px;
  }

  //   h2 {
  // text-transform: uppercase;
  // width: 100%;
  // text-align: center;
  // border-bottom: 1px solid #666;
  // line-height: 0.1em;
  // margin: 10px 0 20px;
  // font-weight: 300;
  // color: #666;

  // span {
  //   background: #fff;
  //   padding: 0 10px;
  // }
  //   }

  //   :global{
  //     @import './styles/main.scss';
  //   }
</style>
