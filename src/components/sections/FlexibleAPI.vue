<template>
  <section class="section section--flexible-api">
    <div class="container container--large">
      <header class="section-header">
        <h2 class="section__title">Flexible<br />Server API</h2>
        <div class="tools-integrations">
          <div class="tools-integrations-item">
            <div class="tools-integrations-item__icon-container">
              <svg class="tools-integrations-item__icon">
                <use xlink:href="#tools"></use>
              </svg>
            </div>
            <h3 class="tools-integrations-item__title">
              &gt; Tools for every stack
            </h3>
            <p class="tools-integrations-item__description">
              We offer client and server libraries in everything from React to
              PHP to .NET and iOS
            </p>
          </div>
          <div class="tools-integrations-item">
            <div class="tools-integrations-item__icon-container">
              <svg class="tools-integrations-item__icon">
                <use xlink:href="#integrations"></use>
              </svg>
            </div>
            <h3 class="tools-integrations-item__title">
              &gt; Great Integrations
            </h3>
            <p class="tools-integrations-item__description">
              Improve accuracy with CNAME, safari identification with cloudflare
              and Matomo Analytics
            </p>
          </div>
        </div>
      </header>
      <div class="section-content">
        <div class="window">
          <div class="window-header">
            <div class="window-header__btn window-header__btn--close"></div>
            <div class="window-header__btn window-header__btn--minimize"></div>
            <div class="window-header__btn window-header__btn--expand"></div>
          </div>
          <div class="window-content">
            <pre><code class="line-numbers language-javascript">import { FP } from "@fp-pro/client"; 

(async () => { 
  let fp = await FP.load({ region: "us", client: "paywall" }); 
  let res = await fp.send(); 
  document.write(`&lt;h1&gt;visitorID: ${res.visitorId}&lt;/h1&gt;`); 
})();</code></pre>
          </div>
        </div>
        <div class="window">
          <div class="window-content">
            <pre><code class="line-numbers language-javascript">import { FP } from "@fp-pro/client"; 

(async () => { 
  let fp = await FP.load({ region: "us", client: "paywall" }); 
  let res = await fp.send(); 
  document.write(`&lt;h1&gt;visitorID: ${res.visitorId}&lt;/h1&gt;`); 
})();</code></pre>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import Vue from "vue"
import Prism from "prismjs"
import "prismjs/components/prism-javascript"
import "prismjs/plugins/line-numbers/prism-line-numbers"

export default Vue.extend({
  name: "FlexibleAPI",
  props: {},
  mounted() {
    Prism.highlightAll()
  },
})
</script>
