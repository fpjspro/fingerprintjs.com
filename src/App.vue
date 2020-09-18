<template>
  <div id="app">
    <Header />
    <LiveDemo />
    <TrustedBy />
    <UseCases />
    <DeveloperFriendly />
    <FlexibleAPI />
    <Billing />
    <ProTools />
    <StayProtected />
    <Footer />
  </div>
</template>

<script lang="ts">
import Vue from "vue"
import Header from "./components/Header.vue"
import LiveDemo from "./components/sections/LiveDemo.vue"
import TrustedBy from "./components/sections/TrustedBy.vue"
import UseCases from "./components/sections/UseCases.vue"
import DeveloperFriendly from "./components/sections/DeveloperFriendly.vue"
import FlexibleAPI from "./components/sections/FlexibleAPI.vue"
import Billing from "./components/sections/Billing.vue"
import ProTools from "./components/sections/ProTools.vue"
import StayProtected from "./components/sections/StayProtected.vue"
import Footer from "./components/Footer.vue"

export default Vue.extend({
  name: "app",
  components: {
    Header,
    LiveDemo,
    TrustedBy,
    UseCases,
    DeveloperFriendly,
    FlexibleAPI,
    Billing,
    ProTools,
    StayProtected,
    Footer,
  },
})
</script>

<style lang="scss">
@import "./styles/app";
</style>
