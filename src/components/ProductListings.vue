<script setup>
import productData from "@/products.json";
import productCard from "@/components/ProductCard.vue";
import { ref, defineProps } from "vue";
import { RouterLink } from "vue-router";
import ProductCard from "@/components/ProductCard.vue";

defineProps({
  limit: Number,
  showButton: {
    type: Boolean,
    default: false,
  },
});

const products = ref(productData);
console.log(products.value);
</script>

<template>
  <section class="px-4">
    <div class="container-xl lg:container m-auto py-10 px-4 mt-12">
      <h2 class="text-3xl font-bold text-[#e81101] mb-10 text-center">
        Browse Products
      </h2>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <ProductCard
          v-for="product in products"
          :key="product.id"
          :product="product"
          class="bg-white rounded-xl shadow-md relative"
        />
      </div>
    </div>
  </section>
  <section class="m-auto max-w-lg my-10 px-6">
    <RouterLink
      to="/products"
      class="block bg-gray-700 text-white text-center py-4 px-6 rounded-xl hover:bg-[#e81101]"
      >View All products</RouterLink
    >
  </section>
</template>
