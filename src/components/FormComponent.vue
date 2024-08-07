<script setup>
import { defineProps, ref } from "vue";

defineProps({
  title: {
    type: String,
  },
});
</script>

<template>
  <form>
    <h2 class="text-3xl text-center font-semibold mb-6">{{ title }}</h2>

    <slot name="content"></slot>
    <div class="mt-4 text-center">
      <slot name="link"></slot>
    </div>
  </form>
</template>
