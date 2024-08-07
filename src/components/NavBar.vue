<script setup>
import { ref, computed, watch } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useStore } from 'vuex';

const store = useStore();
const router = useRouter();
const route = useRoute();

const menuOpen = ref(false);

// Watch route changes to update currentPath
const currentPath = computed(() => route.path);

watch(route, () => {
  menuOpen.value = false; // Close the menu on route change
});

// Toggle mobile menu
const toggleMenu = () => {
  menuOpen.value = !menuOpen.value;
};

// Check if user is authenticated
const isAuthenticated = computed(() => store.getters.isAuthenticated);

// Determine the home link based on authentication status
const homeLink = computed(() => (isAuthenticated.value ? '/dashboard' : '/'));

// Determine the products link based on authentication status
const productsLink = computed(() => (isAuthenticated.value ? '/dashboard/products' : '/products'));

// Handle logout
const logout = () => {
  store.dispatch('logout');
  router.push('/');
};

</script>

<template>
  <nav
    class="flex flex-col md:flex-row items-center justify-between bg-gray-700 text-white py-4 px-8 fixed top-0 left-0 w-full z-10"
  >
    <div class="flex items-center justify-between w-full md:w-auto">
      <RouterLink
        :to="homeLink"
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
        :to="homeLink"
        class="text-white hover:text-[#e81101] block md:inline-block text-center md:text-left"
      >
        Home
      </router-link>
      <router-link
        :to="productsLink"
        class="text-white hover:text-[#e81101] block md:inline-block text-center md:text-left"
      >
        Products
      </router-link>

      <router-link
        v-if="!isAuthenticated"
        to="/login"
        class="text-white hover:text-[#e81101] block md:inline-block text-center md:text-left"
      >
        Log in
      </router-link>

      <button
        v-if="isAuthenticated"
        @click="logout"
        class="text-white hover:text-[#e81101] block md:inline-block text-center md:text-left"
      >
        Log out
      </button>
    </div>
  </nav>
</template>
