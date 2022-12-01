var app=function(){"use strict";function e(){}function t(e){return e()}function n(){return Object.create(null)}function r(e){e.forEach(t)}function s(e){return"function"==typeof e}function o(e,t){return e!=e?t==t:e!==t||e&&"object"==typeof e||"function"==typeof e}let a,i;function l(e,t){return a||(a=document.createElement("a")),a.href=t,e===a.href}function c(e){return null==e?"":e}function d(e,t){e.appendChild(t)}function p(e,t,n){e.insertBefore(t,n||null)}function u(e){e.parentNode&&e.parentNode.removeChild(e)}function h(e,t){for(let n=0;n<e.length;n+=1)e[n]&&e[n].d(t)}function g(e){return document.createElement(e)}function m(e){return document.createTextNode(e)}function f(){return m(" ")}function v(e,t,n,r){return e.addEventListener(t,n,r),()=>e.removeEventListener(t,n,r)}function w(e,t,n){null==n?e.removeAttribute(t):e.getAttribute(t)!==n&&e.setAttribute(t,n)}function y(e,t){t=""+t,e.wholeText!==t&&(e.data=t)}function b(e){i=e}const k=[],$=[],S=[],A=[],x=Promise.resolve();let T=!1;function E(e){S.push(e)}const j=new Set;let N=0;function L(){const e=i;do{for(;N<k.length;){const e=k[N];N++,b(e),O(e.$$)}for(b(null),k.length=0,N=0;$.length;)$.pop()();for(let e=0;e<S.length;e+=1){const t=S[e];j.has(t)||(j.add(t),t())}S.length=0}while(k.length);for(;A.length;)A.pop()();T=!1,j.clear(),b(e)}function O(e){if(null!==e.fragment){e.update(),r(e.before_update);const t=e.dirty;e.dirty=[-1],e.fragment&&e.fragment.p(e.ctx,t),e.after_update.forEach(E)}}const C=new Set;let R;function I(e,t){e&&e.i&&(C.delete(e),e.i(t))}function M(e,t,n,r){if(e&&e.o){if(C.has(e))return;C.add(e),R.c.push((()=>{C.delete(e),r&&(n&&e.d(1),r())})),e.o(t)}else r&&r()}function _(e){e&&e.c()}function z(e,n,o,a){const{fragment:i,after_update:l}=e.$$;i&&i.m(n,o),a||E((()=>{const n=e.$$.on_mount.map(t).filter(s);e.$$.on_destroy?e.$$.on_destroy.push(...n):r(n),e.$$.on_mount=[]})),l.forEach(E)}function H(e,t){const n=e.$$;null!==n.fragment&&(r(n.on_destroy),n.fragment&&n.fragment.d(t),n.on_destroy=n.fragment=null,n.ctx=[])}function U(e,t){-1===e.$$.dirty[0]&&(k.push(e),T||(T=!0,x.then(L)),e.$$.dirty.fill(0)),e.$$.dirty[t/31|0]|=1<<t%31}function D(t,s,o,a,l,c,d,p=[-1]){const h=i;b(t);const g=t.$$={fragment:null,ctx:[],props:c,update:e,not_equal:l,bound:n(),on_mount:[],on_destroy:[],on_disconnect:[],before_update:[],after_update:[],context:new Map(s.context||(h?h.$$.context:[])),callbacks:n(),dirty:p,skip_bound:!1,root:s.target||h.$$.root};d&&d(g.root);let m=!1;if(g.ctx=o?o(t,s.props||{},((e,n,...r)=>{const s=r.length?r[0]:n;return g.ctx&&l(g.ctx[e],g.ctx[e]=s)&&(!g.skip_bound&&g.bound[e]&&g.bound[e](s),m&&U(t,e)),n})):[],g.update(),m=!0,r(g.before_update),g.fragment=!!a&&a(g.ctx),s.target){if(s.hydrate){const e=function(e){return Array.from(e.childNodes)}(s.target);g.fragment&&g.fragment.l(e),e.forEach(u)}else g.fragment&&g.fragment.c();s.intro&&I(t.$$.fragment),z(t,s.target,s.anchor,s.customElement),L()}b(h)}class P{$destroy(){H(this,1),this.$destroy=e}$on(t,n){if(!s(n))return e;const r=this.$$.callbacks[t]||(this.$$.callbacks[t]=[]);return r.push(n),()=>{const e=r.indexOf(n);-1!==e&&r.splice(e,1)}}$set(e){var t;this.$$set&&(t=e,0!==Object.keys(t).length)&&(this.$$.skip_bound=!0,this.$$set(e),this.$$.skip_bound=!1)}}function G(t){let n;return{c(){n=g("section"),n.innerHTML='<h2>Education</h2> \n  <hr/> \n  <div><h3 class="svelte-1b96tyy">Yale University</h3> \n    <p class="svelte-1b96tyy">B.A. in Literature, <i>magna cum laude</i></p></div> \n  <div><h3 class="svelte-1b96tyy">Columbia University</h3> \n    <p class="svelte-1b96tyy">Lede programme, School of Journalism</p></div> \n  <div><h3 class="svelte-1b96tyy">Tsinghua University</h3> \n    <p class="svelte-1b96tyy">Inter-University Program for Chinese Language</p></div> \n  <div><h3 class="svelte-1b96tyy">National Taiwan University</h3> \n    <p class="svelte-1b96tyy">International Chinese Language Program</p></div>',w(n,"class","education")},m(e,t){p(e,n,t)},p:e,i:e,o:e,d(e){e&&u(n)}}}class B extends P{constructor(e){super(),D(this,e,null,G,o,{})}}function J(t){let n;return{c(){n=g("section"),n.innerHTML='<h1 class="svelte-1bw3zd6">Minami Funakoshi</h1> \n  <div class="short-bio svelte-1bw3zd6"><p class="svelte-1bw3zd6">they/them</p> \n    <p class="svelte-1bw3zd6">journalist</p> \n    <p class="svelte-1bw3zd6">dataviz</p> \n    <p class="svelte-1bw3zd6">developer</p></div> \n  <div class="full-bio"><p>Minami Funakoshi is a nonbinary graphics journalist at <a target="_blank" href="https://graphics.reuters.com/">Reuters</a>\n      based in Austin, Texas. They report, write, code, make data visualisations,\n      develop tools, and do both backend and frontend development. For the live results\n      page for the 2022 U.S. election, they developed a\n      <a href="https://www.npmjs.com/package/election-tonight-client" target="_blank">client</a>\n      for Edison Research&#39;s ElectionTonight API.</p> \n    <p>They have also worked as a lecturer and mentor at Columbia Journalism\n      School’s\n      <a href="https://ledeprogram.com/" target="_blank">Lede</a> programme.</p> \n    <p>Previously, they were a <a href="https://www.reuters.com/journalists/minami-funakoshi" target="_blank">Reuters Tokyo correspondent</a> reporting on Japan’s economy, immigration, politics and the auto industry.\n      They were also a video journalist for Reuters Video News.</p> \n    <p>They grew up in Japan, Malaysia, and India and speak Japanese, English,\n      and Mandarin.</p></div> \n\n  <div class="contact svelte-1bw3zd6"><a target="_blank" href="https://twitter.com/MinamiFunakoshi" class="svelte-1bw3zd6"><i class="fa fa-twitter svelte-1bw3zd6"></i></a> \n    <a target="_blank" href="mailto: minami.funakoshi@gmail.com" class="svelte-1bw3zd6"><i class="fa fa-envelope svelte-1bw3zd6"></i></a> \n    <a target="_blank" href="https://www.linkedin.com/in/mfunakoshi/" class="svelte-1bw3zd6"><i class="fa fa-linkedin svelte-1bw3zd6"></i></a></div>',w(n,"class","intro svelte-1bw3zd6")},m(e,t){p(e,n,t)},p:e,i:e,o:e,d(e){e&&u(n)}}}class V extends P{constructor(e){super(),D(this,e,null,J,o,{})}}var q=[{award:"Gold",org:"Information is Beautiful",year:2022,description:"Gender and Language",link:"https://www.reuters.com/graphics/GENDER-LANGUAGE/LGBT/mopanqoelva/index.html"},{award:"Finalist",org:"Online Journalism Awards",year:2022,description:"Gender and Language",link:"https://www.reuters.com/graphics/GENDER-LANGUAGE/LGBT/mopanqoelva/index.html"},{award:"Award of Excellence",org:"Society for News Design (SND)",year:2022,description:"Hot and humid Olympic summer",link:"https://graphics.reuters.com/OLYMPICS-2020/SUMMER-HEAT/bdwvkogrzvm/index.html"},{award:"Award of Excellence",org:"SND",year:2022,description:"Myanmar internet suppression",link:"https://graphics.reuters.com/MYANMAR-POLITICS/INTERNET-RESTRICTION/rlgpdbreepo/index.html"},{award:"Honourable mention",org:"Society of Publishers in Asia (SOPA)",year:2022,description:"Myanmar internet suppression",link:"https://graphics.reuters.com/MYANMAR-POLITICS/INTERNET-RESTRICTION/rlgpdbreepo/index.html"},{award:"Bronze",org:"Malofiej29",year:2021,description:"Innovation format"},{award:"Bronze",org:"Malofiej29",year:2021,description:"Reuters portfolios"},{award:"Silver",org:"SND",year:2021,description:"Portfolio: Art Direction"},{award:"Silver",org:"SND",year:2021,description:"Coronavirus coverage"},{award:"Award of excellence",org:"SND",year:2021,description:"Line of Coverage: U.S. Presidential Election"},{award:"Award of excellence",org:"SND",year:2021,description:"Coronavirus coverage: Use of original/commissioned illustrations"},{award:"Award of excellence",org:"SND",year:2021,description:"Story page design : Health/coronavirus"},{award:"Award of excellence",org:"SND",year:2021,description:"Use of animation | Vaccine bootcamp",link:"https://graphics.reuters.com/HEALTH-CORONAVIRUS/VACCINE/yzdpxqxnwvx/index.html"},{award:"Honourable mention",org:"SOPA",year:2017,description:"Japan's abuse of asylum seekers",link:"https://2017.sopawards.com/wp-content/uploads/2017/03/Japans-abuse-of-asylum-seekers.pdf"},{award:"Finalist for business reporting",org:"SOPA",year:2017,description:"BOJ loses its mojo",link:"https://2017.sopawards.com/wp-content/uploads/2017/03/BOJ-loses-its-mojo.pdf"},{award:"Elmore A. Willetts Prize for Fiction",org:"Yale University",year:2015,description:"A love story",link:"https://yaledailynews.com/blog/2015/04/23/a-love-story"}];function F(e,t,n){const r=e.slice();return r[0]=t[n],r}function Y(t){let n,r,s=t[0].description+"";return{c(){n=g("p"),r=m(s),w(n,"class","description svelte-41rtrd")},m(e,t){p(e,n,t),d(n,r)},p:e,d(e){e&&u(n)}}}function W(t){let n,r,s,o=t[0].description+"";return{c(){n=g("p"),r=g("a"),s=m(o),w(r,"href",t[0].link),w(r,"target","_blank"),w(n,"class","description svelte-41rtrd")},m(e,t){p(e,n,t),d(n,r),d(r,s)},p:e,d(e){e&&u(n)}}}function K(e){let t,n,r,s,o,a,i,l,c,h,v,y,b=e[0].award+"",k=e[0].org+"",$=e[0].year+"";let S=function(e,t){return e[0].link?W:Y}(e),A=S(e);return{c(){t=g("div"),n=g("p"),r=m(b),s=f(),o=g("div"),a=g("p"),i=m(k),l=f(),c=g("p"),h=m($),v=f(),A.c(),y=f(),w(n,"class","award svelte-41rtrd"),w(a,"class","org svelte-41rtrd"),w(c,"class","year svelte-41rtrd"),w(o,"class","details svelte-41rtrd"),w(t,"class","container svelte-41rtrd")},m(e,u){p(e,t,u),d(t,n),d(n,r),d(t,s),d(t,o),d(o,a),d(a,i),d(o,l),d(o,c),d(c,h),d(o,v),A.m(o,null),d(t,y)},p(e,t){A.p(e,t)},d(e){e&&u(t),A.d()}}}function Q(t){let n,r,s,o,a,i=q,l=[];for(let e=0;e<i.length;e+=1)l[e]=K(F(t,i,e));return{c(){n=g("section"),r=g("h2"),r.textContent="Awards",s=f(),o=g("hr"),a=f();for(let e=0;e<l.length;e+=1)l[e].c();w(n,"class","awards")},m(e,t){p(e,n,t),d(n,r),d(n,s),d(n,o),d(n,a);for(let e=0;e<l.length;e+=1)l[e].m(n,null)},p(e,[t]){if(0&t){let r;for(i=q,r=0;r<i.length;r+=1){const s=F(e,i,r);l[r]?l[r].p(s,t):(l[r]=K(s),l[r].c(),l[r].m(n,null))}for(;r<l.length;r+=1)l[r].d(1);l.length=i.length}},i:e,o:e,d(e){e&&u(n),h(l,e)}}}class X extends P{constructor(e){super(),D(this,e,null,Q,o,{})}}function Z(e,t,n){const r=e.slice();return r[5]=t[n].headline,r[6]=t[n].dek,r[7]=t[n].link,r[8]=t[n].awards,r[9]=t[n].imgSrc,r[10]=t[n].videoSrc,r[11]=t[n].posterSrc,r[5]=t[n].headline,r[7]=t[n].link,r[13]=n,r}function ee(e,t,n){const r=e.slice();return r[14]=t[n],r}function te(e){let t,n,s,o,a,i,c,h,f=!0;return{c(){t=g("video"),n=g("source"),o=m("\n              Video is not supported in your browser."),l(n.src,s=ie+"/"+e[1]+"/"+e[10]+".mp4")||w(n,"src",s),t.muted=!0,t.autoplay=!0,t.playsInline=!0,t.loop=!0,w(t,"poster",a=ie+"/"+e[1]+"/"+e[11]),w(t,"id",i=e[10]),w(t,"class","svelte-18b1dta")},m(r,s){p(r,t,s),d(t,n),d(t,o),c||(h=[v(t,"play",e[4]),v(t,"pause",e[4])],c=!0)},p(e,r){3&r&&!l(n.src,s=ie+"/"+e[1]+"/"+e[10]+".mp4")&&w(n,"src",s),3&r&&a!==(a=ie+"/"+e[1]+"/"+e[11])&&w(t,"poster",a),1&r&&i!==(i=e[10])&&w(t,"id",i),4&r&&f!==(f=e[2])&&t[f?"pause":"play"]()},d(e){e&&u(t),c=!1,r(h)}}}function ne(e){let t,n,r;return{c(){t=g("img"),l(t.src,n=ie+"/"+e[1]+"/"+e[9])||w(t,"src",n),w(t,"aria-hidden","true"),w(t,"alt",r=e[5]),w(t,"class","svelte-18b1dta")},m(e,n){p(e,t,n)},p(e,s){3&s&&!l(t.src,n=ie+"/"+e[1]+"/"+e[9])&&w(t,"src",n),1&s&&r!==(r=e[5])&&w(t,"alt",r)},d(e){e&&u(t)}}}function re(e){let t,n=e[8],r=[];for(let t=0;t<n.length;t+=1)r[t]=se(ee(e,n,t));return{c(){t=g("div");for(let e=0;e<r.length;e+=1)r[e].c();w(t,"class","awards mt-1 svelte-18b1dta")},m(e,n){p(e,t,n);for(let e=0;e<r.length;e+=1)r[e].m(t,null)},p(e,s){if(1&s){let o;for(n=e[8],o=0;o<n.length;o+=1){const a=ee(e,n,o);r[o]?r[o].p(a,s):(r[o]=se(a),r[o].c(),r[o].m(t,null))}for(;o<r.length;o+=1)r[o].d(1);r.length=n.length}},d(e){e&&u(t),h(r,e)}}}function se(e){let t,n=e[14]+"";return{c(){t=g("p"),w(t,"class","svelte-18b1dta")},m(e,r){p(e,t,r),t.innerHTML=n},p(e,r){1&r&&n!==(n=e[14]+"")&&(t.innerHTML=n)},d(e){e&&u(t)}}}function oe(e){let t,n,r,s,o,a,i,l,c,h,v,b,k=e[5]+"",$=e[6]+"";function S(e,t){return e[9]?ne:e[10]?te:void 0}let A=S(e),x=A&&A(e),T=e[8]&&re(e);return{c(){t=g("div"),n=g("a"),x&&x.c(),r=f(),s=g("div"),o=g("h3"),a=m(k),i=f(),l=g("p"),c=m($),h=f(),T&&T.c(),b=f(),w(o,"class","svelte-18b1dta"),w(l,"class","svelte-18b1dta"),w(s,"class","dek"),w(n,"target","_blank"),w(n,"href",v=e[7]),w(n,"class","svelte-18b1dta"),w(t,"class","project col-lg-4 col-md-6 col-sm-12 svelte-18b1dta")},m(e,u){p(e,t,u),d(t,n),x&&x.m(n,null),d(n,r),d(n,s),d(s,o),d(o,a),d(s,i),d(s,l),d(l,c),d(s,h),T&&T.m(s,null),d(t,b)},p(e,t){A===(A=S(e))&&x?x.p(e,t):(x&&x.d(1),x=A&&A(e),x&&(x.c(),x.m(n,r))),1&t&&k!==(k=e[5]+"")&&y(a,k),1&t&&$!==($=e[6]+"")&&y(c,$),e[8]?T?T.p(e,t):(T=re(e),T.c(),T.m(s,null)):T&&(T.d(1),T=null),1&t&&v!==(v=e[7])&&w(n,"href",v)},d(e){e&&u(t),x&&x.d(),T&&T.d()}}}function ae(t){let n,r,s=t[0],o=[];for(let e=0;e<s.length;e+=1)o[e]=oe(Z(t,s,e));return{c(){n=g("div"),r=g("div");for(let e=0;e<o.length;e+=1)o[e].c();w(r,"class","row"),w(n,"class","container")},m(e,t){p(e,n,t),d(n,r);for(let e=0;e<o.length;e+=1)o[e].m(r,null)},p(e,[t]){if(7&t){let n;for(s=e[0],n=0;n<s.length;n+=1){const a=Z(e,s,n);o[n]?o[n].p(a,t):(o[n]=oe(a),o[n].c(),o[n].m(r,null))}for(;n<o.length;n+=1)o[n].d(1);o.length=s.length}},i:e,o:e,d(e){e&&u(n),h(o,e)}}}const ie="./statics/share-cards";function le(e,t,n){let r,{projects:s}=t,{projectType:o}=t,{clicked:a=!1}=t;return e.$$set=e=>{"projects"in e&&n(0,s=e.projects),"projectType"in e&&n(1,o=e.projectType),"clicked"in e&&n(3,a=e.clicked)},e.$$.update=()=>{12&e.$$.dirty&&(a&&n(2,r=!0),!a&r&&n(2,r=!1))},[s,o,r,a,function(){r=this.paused,n(2,r),n(3,a)}]}class ce extends P{constructor(e){super(),D(this,e,le,ae,o,{projects:0,projectType:1,clicked:3})}}var de=[{type:"graphics",data:[{headline:"Gender and language",dek:"The movement to recognise a spectrum of genders is changing languages around the world",videoSrc:"gender-cropped",posterSrc:"gender-poster.png",link:"https://www.reuters.com/graphics/GENDER-LANGUAGE/LGBT/mopanqoelva/index.html",awards:["<strong>Gold</strong> | Information is Beautiful","<strong>Finalist</strong> | Online Journalism Awards"]},{headline:"2022 U.S. election",dek:"Worked on backend and frontend development for a live-updating results page. Skills: Svelte, svelte-kit, node, javaScript",imgSrc:"2022elex.jpg",link:"https://www.reuters.com/graphics/USA-ELECTION/RESULTS/dwvkdgzdqpm/"},{headline:"Vaccine bootcamp",dek:"The different types of vaccines and how your body uses them to develop immunity",imgSrc:"vax-bootcamp.png",link:"https://graphics.reuters.com/HEALTH-CORONAVIRUS/VACCINE/yzdpxqxnwvx/index.html",awards:["test","<strong>Bronze</strong> | Malofiej29","<strong>Silver</strong> | SND"]},{headline:"Clippings from the longest year",dek:"Looking back on 2020",imgSrc:"clippings.png",link:"https://graphics.reuters.com/HEALTH-CORONAVIRUS/SCRAPBOOK/gjnpwklkopw/index.html",awards:["<strong>Bronze</strong> | Malofiej29","<strong>Silver</strong> | SND"]},{headline:"Hot and humid Olympic summer",dek:"Tokyo’s sweltering summer heightens the risk of heat illness at the 2020 Olympics",imgSrc:"olympics.png",link:"https://graphics.reuters.com/OLYMPICS-2020/SUMMER-HEAT/bdwvkogrzvm/index.html",awards:["<strong>Award of Excellence</strong> | SND"]},{headline:"Myanmar’s internet suppression",dek:"Crackdowns on protesters in the street are mirrored by its rising restrictions online",imgSrc:"myanmar.png",link:"https://graphics.reuters.com/MYANMAR-POLITICS/INTERNET-RESTRICTION/rlgpdbreepo/index.html",awards:["<strong>Award of Excellence</strong> | SND","<strong>Honourable mention</strong> | SOPA"]},{headline:"Speed and trust",dek:"The keys to an effective COVID-19 vaccination programme",imgSrc:"speed-trust.png",link:"https://graphics.reuters.com/HEALTH-CORONAVIRUS/VACCINE-ROLLOUT/rlgvdegqqpo/index.html"}]},{type:"investigative",data:[{headline:"Death in Detention",dek:"Grim toll mounts in Japanese detention centers as foreigners seek asylum",imgSrc:"death-detention.png",link:"https://www.reuters.com/investigates/special-report/japan-detention/",awards:["<strong>Honourable mention</strong> | SOPA"]},{headline:"Rough Refuge",dek:"Banned from working, asylum seekers are building Japan's roads and sewers",imgSrc:"rough-refuge.png",link:"https://www.reuters.com/investigates/special-report/japan-kurds/",awards:["<strong>Honourable mention</strong> | SOPA"]},{headline:"Born in Limbo",dek:"Japan forces a harsh choice on children of migrant families",imgSrc:"born-in-limbo.png",link:"https://www.reuters.com/investigates/special-report/japan-detention-children/",awards:["<strong>Honourable mention</strong> | SOPA"]}]},{type:"video",data:[{headline:"“Blade Library”",dek:"A young Japanese amputee who dreams of becoming a Paralympian, remembers strapping on a prosthetic “running blade” for the first time.",videoSrc:"blade-runner",posterSrc:"blade-runner-poster.jpg",link:"https://www.youtube.com/watch?v=djG_fM3WKL4"},{headline:"Circle of life",dek:"Japan's homeless banish despair through dance",videoSrc:"dancers",posterSrc:"dancers-poster.png",link:"https://www.youtube.com/watch?v=xp95A9DulYs"},{headline:"Dolling up",dek:"Meet Lulu Hashimoto, a “living doll” and the latest trend in Tokyo’s fashion modeling scene",videoSrc:"lulu",posterSrc:"lulu-poster.png",link:"https://www.razor.tv/video/meet-lulu-hashimoto-japan-s-living-doll/4802324435001/5551360215001"}]}];function pe(e,t,n){const r=e.slice();return r[3]=t[n],r}function ue(e){let t,n,r,s,o,a,i,l,h,y=e[3].type+"",b="video"==e[3].type&&function(e){let t,n,r,s,o,a,i;return{c(){t=g("button"),n=g("i"),r=f(),s=g("i"),w(n,"class","fa fa-light fa-pause svelte-609hj4"),w(s,"class","fa fa-solid fa-play svelte-609hj4"),w(t,"class",o=c(e[1])+" svelte-609hj4")},m(o,l){p(o,t,l),d(t,n),d(t,r),d(t,s),a||(i=v(t,"click",e[2]),a=!0)},p(e,n){2&n&&o!==(o=c(e[1])+" svelte-609hj4")&&w(t,"class",o)},d(e){e&&u(t),a=!1,i()}}}(e);return a=new ce({props:{projects:e[3].data,projectType:e[3].type,clicked:e[0]}}),{c(){t=g("div"),n=g("h3"),r=m(y),s=f(),b&&b.c(),o=f(),_(a.$$.fragment),i=f(),w(n,"class","svelte-609hj4"),w(t,"class",l=c(e[3].type)+" svelte-609hj4")},m(e,l){p(e,t,l),d(t,n),d(n,r),d(t,s),b&&b.m(t,null),d(t,o),z(a,t,null),d(t,i),h=!0},p(e,t){"video"==e[3].type&&b.p(e,t);const n={};1&t&&(n.clicked=e[0]),a.$set(n)},i(e){h||(I(a.$$.fragment,e),h=!0)},o(e){M(a.$$.fragment,e),h=!1},d(e){e&&u(t),b&&b.d(),H(a)}}}function he(e){let t,n,s,o,a,i,l=de,c=[];for(let t=0;t<l.length;t+=1)c[t]=ue(pe(e,l,t));const m=e=>M(c[e],1,1,(()=>{c[e]=null}));return{c(){t=g("section"),n=g("h2"),n.textContent="Selected works",s=f(),o=g("hr"),a=f();for(let e=0;e<c.length;e+=1)c[e].c();w(n,"class","svelte-609hj4"),w(o,"class","svelte-609hj4"),w(t,"class","projects svelte-609hj4")},m(e,r){p(e,t,r),d(t,n),d(t,s),d(t,o),d(t,a);for(let e=0;e<c.length;e+=1)c[e].m(t,null);i=!0},p(e,[n]){if(7&n){let s;for(l=de,s=0;s<l.length;s+=1){const r=pe(e,l,s);c[s]?(c[s].p(r,n),I(c[s],1)):(c[s]=ue(r),c[s].c(),I(c[s],1),c[s].m(t,null))}for(R={r:0,c:[],p:R},s=l.length;s<c.length;s+=1)m(s);R.r||r(R.c),R=R.p}},i(e){if(!i){for(let e=0;e<l.length;e+=1)I(c[e]);i=!0}},o(e){c=c.filter(Boolean);for(let e=0;e<c.length;e+=1)M(c[e]);i=!1},d(e){e&&u(t),h(c,e)}}}function ge(e,t,n){let r=!1,s="pause";return[r,s,()=>{r?(n(0,r=!1),n(1,s="pause")):(n(0,r=!0),n(1,s="play"))}]}class me extends P{constructor(e){super(),D(this,e,ge,he,o,{})}}function fe(t){let n;return{c(){n=g("section"),n.innerHTML='<p class="svelte-1jjdd5e">Updated Dec. 2022</p>',w(n,"class","footer svelte-1jjdd5e")},m(e,t){p(e,n,t)},p:e,i:e,o:e,d(e){e&&u(n)}}}class ve extends P{constructor(e){super(),D(this,e,null,fe,o,{})}}function we(t){let n,r,s,o,a,i,l,c,d,h;return n=new V({}),s=new me({}),a=new X({}),l=new B({}),d=new ve({}),{c(){_(n.$$.fragment),r=f(),_(s.$$.fragment),o=f(),_(a.$$.fragment),i=f(),_(l.$$.fragment),c=f(),_(d.$$.fragment)},m(e,t){z(n,e,t),p(e,r,t),z(s,e,t),p(e,o,t),z(a,e,t),p(e,i,t),z(l,e,t),p(e,c,t),z(d,e,t),h=!0},p:e,i(e){h||(I(n.$$.fragment,e),I(s.$$.fragment,e),I(a.$$.fragment,e),I(l.$$.fragment,e),I(d.$$.fragment,e),h=!0)},o(e){M(n.$$.fragment,e),M(s.$$.fragment,e),M(a.$$.fragment,e),M(l.$$.fragment,e),M(d.$$.fragment,e),h=!1},d(e){H(n,e),e&&u(r),H(s,e),e&&u(o),H(a,e),e&&u(i),H(l,e),e&&u(c),H(d,e)}}}return new class extends P{constructor(e){super(),D(this,e,null,we,o,{})}}({target:document.body})}();
//# sourceMappingURL=bundle.js.map
