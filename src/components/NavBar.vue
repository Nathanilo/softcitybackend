<script setup>
import { RouterLink } from "vue-router";
import { ref } from "vue";

const menuOpen = ref(false);

const toggleMenu = () => {
  menuOpen.value = !menuOpen.value;
};
</script>
<template>
  <nav
    class="flex flex-col md:flex-row items-center justify-between bg-gray-900 text-white py-6 px-8"
  >
    <div class="flex items-center justify-between w-full md:w-auto">
      <RouterLink
        to="/"
        class="text-3xl font-bold text-white hover:text-[#ff6f61]"
      >
        SoftCity
      </RouterLink>
      <!-- Mobile menu button -->
      <button
        v-if="!menuOpen"
        @click="toggleMenu"
        class="md:hidden text-2xl focus:outline-none"
      >
        <i class="pi pi-bars"></i>
      </button>
      <button v-else @click="toggleMenu">
        <i class="pi pi-times"></i>
      </button>
    </div>
    <!-- Mobile menu -->
    <div
      :class="menuOpen ? 'block' : 'hidden'"
      class="md:flex md:items-center md:space-x-6 w-full md:w-auto mt-4 md:mt-0"
    >
      <router-link
        to="/"
        class="text-white hover:text-[#ff6f61] block md:inline-block text-center md:text-left"
      >
        Home
      </router-link>
      <router-link
        to="/products"
        class="text-white hover:text-[#ff6f61] block md:inline-block text-center md:text-left"
      >
        Products
      </router-link>
      <router-link
        to="/login"
        class="text-white hover:text-[#ff6f61] block md:inline-block text-center md:text-left"
      >
        Log in
      </router-link>
    </div>
  </nav>
</template>
