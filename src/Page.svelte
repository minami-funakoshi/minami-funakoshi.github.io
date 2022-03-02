<script>
  /* 
    REMEMBER!
    Run this command to update the gh-pages subree and the page:
    git subtree push --prefix public origin gh-pages

    References:

    https://gist.github.com/cobyism/4730490 
    https://www.youtube.com/watch?v=CmaUDwVCTy8 

    See data here:
    https://docs.google.com/spreadsheets/d/1Xn5xl_ZDAhaKwYunABv0X7Q0GsiiKCmLe9wiA4BGX2k/edit#gid=0
*/

  import Education from './Education/index.svelte';
  import Intro from './Intro/index.svelte';
  import Awards from './Awards/index.svelte';
  import Projects from './Projects/index.svelte';
  import Footer from './Footer/index.svelte';
</script>

<Intro />
<Projects />
<Awards />
<Education />
<Footer />

<style lang="scss">
  :global(body) {
    color: #333;
    margin: 0;
    padding: 8px;
    box-sizing: border-box;
    font-family: 'Source Sans Pro', sans-serif;
  }

  :global(section) {
    padding-top: 2rem;
    max-width: 1000px;
    margin: 0 auto;
  }

  :global(hr) {
    margin-top: 0;
    max-width: 1000px;
  }

  :global(h2) {
    margin-bottom: 0;
    font-weight: 600;
  }

  :global(a),
  :global(a:visited) {
    color: rgb(0, 100, 200);
    text-decoration: underline;
  }

  :global(a:hover) {
    color: #609bb6;
  }

  :global(p) {
    font-size: 1.1rem;
  }

  :global(strong) {
    color: #555;
    font-weight: 600;
  }
</style>
