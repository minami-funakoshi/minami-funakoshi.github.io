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
      > based in Austin, Texas. They report, write, code, make data visualisations
      and develop tools.
    </p>
    <p>
      Previously, they were a <a
        href="https://www.reuters.com/journalists/minami-funakoshi"
        target="_blank">Reuters Tokyo correspondent</a
      > reporting on Japan&#8217;s economy, immigration, politics and the auto industry.
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
    <a target="_blank" href="https://www.linkedin.com/in/mfunakoshi/"
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
    margin-left: -5px;
  }

  p,
  i {
    font-size: 1.1rem;
  }

  .short-bio {
    display: flex;
    p {
      margin-top: 5px;
      margin-right: 12.5px;
      font-weight: 300;
      color: #666666;
    }

    p:not(:first-child)::before {
      margin-right: 12.5px;
      content: '|';
    }
  }

  .full-bio {
    a {
      text-decoration: underline;
      // color: #435f76;
    }
  }

  .contact {
    a {
      color: #999999;
      margin-right: 7.5px;
    }
    a:first-child {
      margin-left: 0;
    }
  }

  //   body {
  //     margin:auto;
  //     font-family: 'Source Sans Pro', sans-serif;
  //     font-size: 17px;
  // }

  // /* FONT */

  // .serif {
  //     font-family: 'Noto Serif JP', 'Lora', serif;
  // }

  // .sans-serif {
  //     font-family: 'Source Sans Pro', sans-serif;
  // }
</style>
