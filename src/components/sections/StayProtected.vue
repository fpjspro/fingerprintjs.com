<template>
  <section class="section section--stay-protected">
    <div class="container">
      <header class="section-header">
        <h2 class="h1 section__title">
          Stay <strong>protected</strong> and <strong>one step ahead</strong> of
          malicious users with FingerprintJS Pro
        </h2>
        <p class="section__subtitle">
          Starting today is better than starting tomorrow
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
    </div>
  </section>
</template>

<script lang="ts">
import Vue from "vue"
export default Vue.extend({
  name: "StayProtected",
  props: {},
})
</script>
