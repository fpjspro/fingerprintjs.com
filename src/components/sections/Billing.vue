<template>
  <section class="section section--billing">
    <div class="container container--large">
      <header class="section-header">
        <h2 class="section__title">Predictable &amp; Transparent Billing</h2>
        <a href="#0" class="btn btn--outlined">Detailed Pricing</a>
      </header>
      <div class="section-content">
        <div class="identification-per-month">
          <h3 class="identification-per-month__title">Select your identifications per month</h3>
          <div class="slider" ref="slider">
            <span class="slider-output" v-text="valueLabel"></span>
            <label for="billingSlider" class="slider-label">
              <span class="slider-label__text">100K</span>
              <span class="slider-label__text">250K</span>
              <span class="slider-label__text">500K</span>
              <span class="slider-label__text">1M</span>
              <span class="slider-label__text">5M</span>
              <span class="slider-label__text">10M</span>
              <span class="slider-label__text">20M</span>
            </label>
            <div class="slider-input-container">
              <input
                class="slider-input"
                type="range"
                min="0"
                max="6"
                name="billing-slider"
                value="3"
                @change="handleChange"
              />
            </div>
          </div>
          <p class="identification-per-month__footnote">
            Our standard plan comes with 1 year visit history and email support.
            <br />Contact sales for enterprise support license and secure unlimited visit history and 24/7 dedicated support.
          </p>
        </div>
        <div class="payment">
          <div class="payment-per-month">
            <span class="price" v-text="priceLabel"></span>
            per month
          </div>
          <div class="billed">billied yearly</div>
          <div class="payment-switcher">
            <button
              class="payment-switcher__button payment-switcher__button--annually"
              :class="{
                'payment-switcher__button--active': billingType === 'annually',
              }"
              @click="updateBilling('annually')"
            >Pay Annually</button>
            <button
              class="payment-switcher__button payment-switcher__button--monthly"
              :class="{
                'payment-switcher__button--active': billingType === 'monthly',
              }"
              @click="updateBilling('monthly')"
            >Pay Monthly</button>
          </div>
          <p class="payment__description">
            You get annual payment benefits Switch to annual to get
            <strong>20% Discount roll-over</strong> of unused monthly API calls
          </p>
        </div>
      </div>
      <div class="section-link">
        <a href="#0" class="btn btn--outlined">Detailed Pricing</a>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import Vue from "vue"

export default Vue.extend({
  name: "Billing",
  props: {},
  data() {
    return {
      billingType: "annually",
      pricingTable: [
        { label: "100K", value: 100000 },
        { label: "250K", value: 250000 },
        { label: "500K", value: 500000 },
        { label: "1M", value: 1000000 },
        { label: "5M", value: 5000000 },
        { label: "10M", value: 10000000 },
        { label: "20M", value: 20000000 },
      ],
      valueLabel: "1M",
      priceLabel: "$800",
    }
  },
  methods: {
    handleChange: function(e: Event) {
      const elem = e.target as HTMLInputElement
      const minValue = Number(elem.min)
      const maxValue = Number(elem.max)
      const value = Number(elem.value)
      const magicNumber = ((value - minValue) * 100) / (maxValue - minValue)
      this.valueLabel = this.pricingTable[value].label
      this.priceLabel = this.calculatePrice(this.pricingTable[value].value)

      this.slider.style.setProperty(
        "--left",
        `calc(${magicNumber}% + (${15 - magicNumber * 0.3}px))`
      )
    },
    calculatePrice: function(price: number) {
      const currencyFormatOptions = {
        maximumSignificantDigits: 3,
        style: "currency",
        currencyDisplay: "symbol",
        currency: "USD",
        notation: "standard",
      }

      if (this.billingType === "monthly") {
        return new Intl.NumberFormat("en-US", currencyFormatOptions).format(
          price / 1000
        )
      }
      if (this.billingType === "annually") {
        return new Intl.NumberFormat("en-US", currencyFormatOptions).format(
          (price / 1000) * 0.8
        )
      }
      return ""
    },
    updateBilling: function(type: string) {
      this.billingType = type
    },
  },
  computed: {
    slider(): HTMLElement {
      return this.$refs.slider as HTMLElement
    },
  },
})
</script>
