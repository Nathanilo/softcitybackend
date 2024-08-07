<script setup>
import { RouterLink } from "vue-router";
import { useRoute } from "vue-router";
import { ref, computed } from "vue";

const route = useRoute();
const currentPath = ref(route.path);
const newCurrentPath = computed(() =>
  currentPath.value.substring(0, currentPath.value.lastIndexOf("/"))
);
</script>

<template>
  <section>
    <div class="container m-auto py-6 px-6">
      <RouterLink
        :to="newCurrentPath"
        class="text-black hover:text-primary flex items-center"
      >
        <i class="pi pi-arrow-circle-left mr-3"></i> Back to collection
      </RouterLink>
    </div>
  </section>
</template>
