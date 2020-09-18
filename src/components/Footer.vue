<template>
  <footer class="footer">
    <div class="container container--large">
      <nav class="nav nav--footer">
        <div class="menu menu--solutions">
          <div class="menu__title">Solutions</div>
          <a href="#0" class="menu__link">Browser Fingerprinting</a>
          <a href="#0" class="menu__link">Anonymous User Identification</a>
          <a href="#0" class="menu__link">Bot Detection</a>
          <a href="#0" class="menu__link">Incognito Mode Detection</a>
          <a href="#0" class="menu__link">Geolocation</a>
          <a href="#0" class="menu__link">API & Webhooks</a>
        </div>
        <div class="menu menu--docs">
          <div class="menu__title">Docs</div>
          <a href="#0" class="menu__link">Pro vs Free Version</a>
          <a href="#0" class="menu__link">Regions</a>
          <a href="#0" class="menu__link">Best Practices</a>
          <a href="#0" class="menu__link">Integrations</a>
          <a href="#0" class="menu__link">Legal</a>
        </div>
        <div class="contact">
          <div class="contact__title">FingerprintJS</div>
          <address class="contact__address">
            1440 W. Taylor St #735, Chicago, IL 60607, USA
            <a href="mailto:support@fingerprintjs.com"
              >support@fingerprintjs.com</a
            >
          </address>
          <div class="contact-social">
            <!-- Place this tag where you want the button to render. -->
            <a
              class="github-button"
              href="https://github.com/fingerprintjs/fingerprintjs2"
              data-icon="octicon"
              data-size="large"
              data-show-count="true"
              aria-label="Star fingerprintjs/fingerprintjs2 on GitHub"
              >Star</a
            >
            <div class="social">
              <small>Find us on social</small>
              <ul class="social-links">
                <li class="social-links__link">
                  <a href="#0">
                    <svg>
                      <use xlink:href="#linkedin"></use>
                    </svg>
                  </a>
                </li>
                <li class="social-links__link">
                  <a href="#0">
                    <svg>
                      <use xlink:href="#twitter"></use>
                    </svg>
                  </a>
                </li>
                <li class="social-links__link">
                  <a href="#0">
                    <svg>
                      <use xlink:href="#medium"></use>
                    </svg>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
      <div class="copyrights">
        &copy; FingerPrintJS 2020, designed by
        <a href="https://holy.gd/" target="_blank" rel="noopener noreferrer"
          >høly</a
        >
      </div>
    </div>
  </footer>
</template>

<script lang="ts">
import Vue from "vue"
export default Vue.extend({
  name: "Footer",
  props: {},
})
</script>
