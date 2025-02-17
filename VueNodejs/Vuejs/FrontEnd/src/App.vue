<script setup>
import Header from "./components/Header.vue";
import FooterSection from "./components/FooterSection.vue";
</script>

<template>
  <div id="app">
    <Header></Header>
    <router-view />
    <FooterSection></FooterSection>
  </div>
</template>

<style scoped></style>
