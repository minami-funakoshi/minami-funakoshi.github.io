<section class="intro">
  <h1>Minami Funakoshi</h1>
  <div class="short-bio">
    <p>they/them</p>
    <p>journalist</p>
    <p>dataviz</p>
    <p>developer</p>
  </div>
  <div class="full-bio">
    <p>
      Minami Funakoshi is a nonbinary graphics journalist at <a
        target="_blank"
        href="https://graphics.reuters.com/">Reuters</a
      >
      based in Austin, Texas. They report, write, code, make data visualisations,
      develop tools, and do both backend and frontend development. For the live results
      page for the 2022 U.S. election, they developed a
      <a
        href="https://www.npmjs.com/package/election-tonight-client"
        target="_blank">client</a
      >
      for Edison Research’s ElectionTonight API.
    </p>
    <p>
      They have also worked as a lecturer and mentor at Columbia Journalism
      School’s
      <a href="https://ledeprogram.com/" target="_blank">Lede </a> programme.
    </p>
    <p>
      Previously, they were a <a
        href="https://www.reuters.com/journalists/minami-funakoshi"
        target="_blank">Reuters Tokyo correspondent</a
      > covering Japan&#8217;s economy, immigration, politics and the auto industry.
      They were also a video journalist for Reuters Video News.
    </p>
    <p>
      They grew up in Japan, Malaysia, and India and speak Japanese, English,
      and Mandarin.
    </p>
  </div>

  <div class="contact">
    <a target="_blank" href="https://twitter.com/MinamiFunakoshi"
      ><i class="fa fa-twitter"></i></a
    >
    <a target="_blank" href="mailto: minami.funakoshi@gmail.com"
      ><i class="fa fa-envelope"></i></a
    >
    <a target="_blank" href="https://www.linkedin.com/in/minami-funakoshi/"
      ><i class="fa fa-linkedin"></i></a
    >
  </div>
</section>

<style lang="scss">
  section.intro {
    padding-top: 3.5rem;
  }
  h1 {
    font-family: 'Source Sans Pro', sans-serif;
    text-transform: lowercase;
    font-size: 4rem;
    font-weight: 500;
    margin-top: 0;
    margin-bottom: 0;
    margin-left: -0.35rem;

    @media only screen and (max-width: 576px) {
      font-size: 3rem;
      margin-left: 0; //-0.2rem;
    }
  }

  .short-bio {
    display: flex;
    p {
      margin-top: -2.5px;
      margin-right: 12.5px;
      font-weight: 300;
      color: #555;
      @media only screen and (max-width: 576px) {
        font-size: 1rem;
        margin-right: 7.5px;
      }
    }

    p:not(:first-child)::before {
      content: '|';
      font-weight: 400;
      color: #bbb;
      margin-right: 12.5px;

      @media only screen and (max-width: 576px) {
        margin-right: 7.5px;
      }
    }
  }

  .contact {
    a {
      color: #c4c4c4;
      margin-right: 7.5px;
    }
    a:first-child {
      margin-left: 0;
    }
    i {
      font-size: 1.1rem;
    }
  }
</style>
