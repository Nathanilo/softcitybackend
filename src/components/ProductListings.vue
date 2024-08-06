<script setup>
import { ref, defineProps, onMounted, reactive } from "vue";
import { RouterLink } from "vue-router";
import ProductCard from "@/components/ProductCard.vue";
import PulseLoader from "vue-spinner/src/PulseLoader.vue";
import axios from "axios";

defineProps({
  limit: Number,
  showButton: {
    type: Boolean,
    default: false,
  },
});

const state = reactive({
  products: [],
  isLoading: false,
});

onMounted(async () => {
  try {
    state.isLoading = true;
    const response = await axios.get("http://localhost:3000/products");
    state.products = response.data;
  } catch (error) {
    console.error(error);
  } finally {
      state.isLoading = false;

  }
});
</script>

<template>
  <section class="px-4">
    <div class="container-xl lg:container m-auto py-10 px-4 mt-12">
      <h2 class="text-3xl font-bold text-[#e81101] mb-10 text-center">
        Browse Products
      </h2>
      <!-- Show loader while loading is true -->
      <div v-if="state.isLoading" class="text-center text-primary">
        <PulseLoader />
      </div>

      <!-- Show products when loading is false -->
      <div v-else class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <ProductCard
          v-for="product in state.products.slice(
            0,
            limit || state.products.length
          )"
          :key="product.id"
          :product="product"
          class="bg-white rounded-xl shadow-md relative"
        />
      </div>
    </div>
  </section>
  <section v-if="!state.isLoading" >
   <div v-if="showButton" class="m-auto max-w-lg my-10 px-6">
     <RouterLink
      to="/products"
      class="block bg-gray-700 text-white text-center py-4 px-6 rounded-xl hover:bg-[#e81101]"
      >View All products</RouterLink
    >
   </div>
  </section>
</template>
