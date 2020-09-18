<template>
  <section class="section section--live-demo">
    <div class="container container--large">
      <header class="section-header">
        <h1 class="section__title">Browser Fingerprinting API</h1>
        <p class="section__description">
          Stop fraud, spam, and account takeovers with
          <em>99.5% accurate</em> browser fingerprinting as a service.
        </p>
        <form action="#" class="form form--get-started">
          <div class="field field-with-button">
            <label for="email" class="label">
              <input
                type="email"
                class="input"
                placeholder="Enter your email"
              />
            </label>
            <button class="btn submit" type="submit">Get Started</button>
          </div>
          <ul class="form-description">
            <li>
              <svg>
                <use xlink:href="#check"></use>
              </svg>
              10 Days Trial
            </li>
            <li>
              <svg>
                <use xlink:href="#check"></use>
              </svg>
              Flexible
            </li>
            <li>
              <svg>
                <use xlink:href="#check"></use>
              </svg>
              API & Webhooks
            </li>
          </ul>
        </form>
      </header>
      <div class="section-content">
        <div class="fingerprint-live-demo">
          <div class="fingerprint-live-demo-history">
            <div class="fingerprint-live-demo__header">
              Visit History
              <svg
                class="info"
                data-tippy-content="Lorem ispum dolor sit amet"
                tabindex="0"
              >
                <use xlink:href="#info"></use>
              </svg>
            </div>
            <div class="history">
              <ul class="history-visits">
                <li
                  class="history-visits__visit history-visits__visit--now history-visits__visit--selected"
                >
                  Live Demo
                  <svg class="incognito">
                    <use xlink:href="#incognito"></use>
                  </svg>
                </li>
                <li class="history-visits__visit">
                  23 hours ago
                  <svg class="incognito">
                    <use xlink:href="#incognito"></use>
                  </svg>
                </li>
                <li
                  class="history-visits__visit history-visits__visit--incognito"
                >
                  3 days ago
                  <svg class="incognito">
                    <use xlink:href="#incognito"></use>
                  </svg>
                </li>
                <li class="history-visits__visit">
                  6 days ago
                  <svg class="incognito">
                    <use xlink:href="#incognito"></use>
                  </svg>
                </li>
                <li class="history-visits__visit">
                  2 weeks ago
                  <svg class="incognito">
                    <use xlink:href="#incognito"></use>
                  </svg>
                </li>
                <li class="history-visits__visit">
                  3 weeks ago
                  <svg class="incognito">
                    <use xlink:href="#incognito"></use>
                  </svg>
                </li>
                <li
                  class="history-visits__visit history-visits__visit--incognito"
                >
                  30 days ago
                  <svg class="incognito">
                    <use xlink:href="#incognito"></use>
                  </svg>
                </li>
                <li
                  class="history-visits__visit history-visits__visit--incognito"
                >
                  1 month ago
                  <svg class="incognito">
                    <use xlink:href="#incognito"></use>
                  </svg>
                </li>
              </ul>
            </div>
          </div>
          <div class="fingerprint-live-demo-current-visit">
            <div class="fingerprint-live-demo__header">
              Your Current Visit
            </div>
            <div class="current-visit">
              <div class="current-visit__id">
                <span class="current-visit__label">Your ID</span>
                <span class="user-id">QyDG8Zmc3tIKmfzHg00e</span>
                <svg
                  class="info"
                  data-tippy-content="Lorem ispum dolor sit amet"
                  tabindex="0"
                >
                  <use xlink:href="#info"></use>
                </svg>
              </div>
              <div class="current-visit__bot">
                <span class="current-visit__label">Bot</span>
                <span class="user-bot">No</span>
                <svg
                  class="info"
                  data-tippy-content="Lorem ispum dolor sit amet"
                  tabindex="0"
                >
                  <use xlink:href="#info"></use>
                </svg>
              </div>
              <div class="current-visit__ip">
                <span class="current-visit__label">IP</span>
                <span class="user-ip">79.166.60.76</span>
              </div>
              <div class="current-visit__incognito">
                <span class="current-visit__label">Incognito</span>
                <span class="user-incognito">No</span>
                <svg
                  class="info"
                  data-tippy-content="Lorem ispum dolor sit amet"
                  tabindex="0"
                >
                  <use xlink:href="#info"></use>
                </svg>
              </div>
              <div class="current-visit__browser">
                <span class="current-visit__label">Browser</span>
                <span class="user-browser"
                  >Chrome 84.0.4147 on Mac OS X (10.14.6)</span
                >
              </div>
              <div class="current-visit__location">
                <span class="current-visit__label">Location</span>
                <div class="user-location"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import Vue from "vue"

export default Vue.extend({
  name: "LiveDemo",
  props: {},
})
</script>
