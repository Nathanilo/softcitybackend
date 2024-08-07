<script setup>
import NavBar from "@/components/NavBar.vue";
import { RouterView } from "vue-router";
import { useRoute } from "vue-router";
import { ref, computed, watch } from "vue";

const route = useRoute();
const currentPath = ref(route.path);

// Watch for route changes
watch(
  () => route.path,
  (newPath) => {
    currentPath.value = newPath;
  }
);
</script>

<template>
  <div>
    <NavBar />
    <router-view />
    <!-- Floating button -->
    <button
      v-if="currentPath.includes('dashboard')"
      class="fixed z-50 bottom-6 right-6"
      @click="$router.push('/add-product')"
    >
      <i class="pi pi-plus bg-primary py-6 px-6 rounded-[50%] text-white"></i>
    </button>
  </div>
</template>
