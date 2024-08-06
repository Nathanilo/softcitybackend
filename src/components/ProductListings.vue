<script setup>
import productData from "@/products.json";
import { ref, defineProps } from "vue";
import { RouterLink } from "vue-router";

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
        <div
          v-for="product in products"
          :key="product.id"
          class="bg-white rounded-xl shadow-md relative"
        >
          <div class="p-4">
            <div class="mb-6">
              <h3 class="text-xl font-bold">{{ product.name }}</h3>
            </div>

            <div class="mb-5">
              <img
                :src="product.imageURL"
                :alt="product.name"
                class="w-full h-48 object-contain rounded-lg"
              />
            </div>

            <h3 class="text-black mb-2">{{ product.description }}</h3>

            <div class="border border-gray-100 mb-5"></div>

            <div class="flex flex-col lg:flex-row justify-between mb-4">
              <div class="text-orange-700 mb-3">
                {{ product.price }}
              </div>
              <router-link
                :to="'/products/' + product.id"
                class="h-[36px] bg-gray-700 hover:bg-[#e81101] text-white px-4 py-2 rounded-lg text-center text-sm"
              >
                view More
              </router-link>
            </div>
          </div>
        </div>
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
