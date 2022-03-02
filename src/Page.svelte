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
