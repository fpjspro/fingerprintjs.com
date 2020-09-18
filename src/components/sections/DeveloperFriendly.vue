<template>
  <section class="section section--developer-friendly">
    <div class="container container--large">
      <header class="section-header">
        <h1 class="section__title">Developer<br />Friendly</h1>
        <p class="section__description">
          See <a href="#0" class="link">All Examples</a>
        </p>
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
          <div class="window-actions">
            <button class="btn">Run Example</button>
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
  name: "DeveloperFriendly",
  props: {},
  mounted() {
    Prism.highlightAll()
  },
})
</script>
