<script setup>
import { defineProps, ref, computed } from "vue";
import heroImg from "@/assets/img/hero-img.png";
import { useRoute } from "vue-router";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

const store = useStore();
const route = useRoute();
const router = useRouter();

const currentPath = ref(route.path);

// Check if user is authenticated
const isAuthenticated = computed(() => store.getters.isAuthenticated);

const productsLink = computed(() =>
  isAuthenticated.value ? "/dashboard/products" : "/products"
);

defineProps({
  title: {
    type: String,
    default: "Welcome to SoftCity",
  },
  subtitle: {
    type: String,
    default: "Find Your Perfect Blend of Comfort and Elegance",
  },
});

// Handle logout
const logout = () => {
  store.dispatch("logout");
  router.push("/");
};
</script>

<template>
  <div class="text-black flex flex-col items-center justify-center mt-14 px-4 pt-20">
    <div class="w-full flex flex-col lg:flex-row justify-center items-center">
      <div class="p-4 text-center lg:text-left lg:w-1/2 flex-shrink-0">
        <h1
          class="text-4xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-[#e81101]"
        >
          {{ title }}
        </h1>
        <p class="text-lg sm:text-xl mt-2">
          {{ subtitle }}
        </p>
        <div class="flex justify-center lg:justify-start mt-10">
          <div class="flex flex-col sm:flex-row">
            <router-link
              :to="productsLink"
              class="text-white bg-[#e81101] px-4 py-2 rounded-md mb-4 sm:mb-0 sm:mr-4 text-center"
            >
              Explore Products
            </router-link>
            <router-link
              v-if="!isAuthenticated"
              to="/login"
              class="text-white bg-gray-700 px-4 py-2 rounded-md ml-0 sm:ml-4 text-center"
            >
              Log in
            </router-link>

            <button
              v-if="isAuthenticated"
              @click="logout"
              class="text-white bg-gray-700 px-4 py-2 rounded-md ml-0 sm:ml-4 text-center"
            >
              Log out
            </button>
          </div>
        </div>
      </div>
      <div class="flex justify-center mt-6 lg:mt-0 lg:-ml-[120px]">
        <img
          :src="heroImg"
          alt="Hero image"
          class="w-full max-w-[12rem] sm:max-w-[14rem] md:max-w-[16rem] lg:max-w-[18rem] h-auto"
        />
      </div>
    </div>
  </div>
</template>
