<script setup>
import { RouterLink } from "vue-router";
</script>

<template>
  <section>
    <div class="container m-auto py-6 px-6">
      <RouterLink
        to="/products"
        class="text-black hover:text-primary flex items-center"
      >
        <i class="pi pi-arrow-circle-left mr-3"></i> Back to collection
      </RouterLink>
    </div>
  </section>
</template>
