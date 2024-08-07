<script setup>
import { defineProps, h, ref } from "vue";

defineProps({
  title: {
    type: String,
  },

  handleSubmit: {
    type: Function,
  },
});
</script>

<template>
  <form @submit.prevent="handleSubmit">
    <h2 class="text-3xl text-center font-semibold mb-6">{{ title }}</h2>

    <slot name="content"></slot>
    <div class="mt-4 text-center">
      <slot name="link"></slot>
    </div>
  </form>
</template>
