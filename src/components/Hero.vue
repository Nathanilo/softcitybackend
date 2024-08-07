<script setup>
import { defineProps, ref } from "vue";
import heroImg from "@/assets/img/hero-img.png";
import { useRoute } from "vue-router";

const route = useRoute();

const currentPath = ref(route.path);

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
</script>

<template>
 
  <div class="text-black flex flex-col items-center justify-center mt-8 px-4">
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
              to="/products"
              class="text-white bg-[#e81101] px-4 py-2 rounded-md mb-4 sm:mb-0 sm:mr-4 text-center"
            >
              Explore Products
            </router-link>
            <router-link
              v-if="currentPath.endsWith('/')"
              to="/login"
              class="text-white bg-gray-700 px-4 py-2 rounded-md ml-0 sm:ml-4 text-center"
            >
              Log in
            </router-link>
            <router-link
              v-if="currentPath.endsWith('/dashboard')"
              to="/login"
              class="text-white bg-gray-700 px-4 py-2 rounded-md ml-0 sm:ml-4 text-center"
            >
              Log out
            </router-link>
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
