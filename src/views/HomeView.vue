<script setup>
import Hero from "@/components/Hero.vue";
import ProductListings from "@/components/ProductListings.vue";
</script>
<template>
  <Hero />
  <ProductListings :limit="3" :show-button="true"/>
</template>
