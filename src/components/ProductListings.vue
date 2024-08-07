<script setup>
import { ref, defineProps, onMounted, reactive, computed, watch } from "vue";
import { RouterLink, useRoute } from "vue-router";
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

const route = useRoute();
const currentPath = ref(route.path);

const state = reactive({
  products: [],
  searchTerm: "",
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

// Watch for route changes
watch(
  () => route.path,
  (newPath) => {
    currentPath.value = newPath;
  }
);

const filteredProducts = computed(() => {
  if (state.searchTerm.trim() === "") {
    return state.products;
  }

  return state.products.filter((product) =>
    product.name.toLowerCase().includes(state.searchTerm.toLowerCase())
  );
});

const handleSearch = (event) => {
  state.searchTerm = event.target.value;
};
</script>

<template>
  <section class="px-4">
    <div class="container-xl lg:container m-auto py-10 px-4 mt-12">
      <div
        v-if="currentPath.endsWith('products')"
        class="flex flex-col -mt-12 md:my-10 items-center md:flex-row md:justify-center md:-mt-8"
      >
        <h2 class="text-3xl font-bold text-primary mb-4 md:mb-0  text-center md:mr-8">
          Browse Products
        </h2>
        <form class="w-full mb-6 md:mb-0 sm:w-2/3 md:w-1/3 relative">
          <input
            v-model="state.searchTerm"
            type="text"
            name="search"
            class="w-full border border-gray-300 rounded-md py-2 pl-10"
            placeholder="Search products"
            @input="handleSearch"
          />
          <i class="pi pi-search absolute left-3 top-[13px]"></i>
        </form>
      </div>
      <div v-else class="flex justify-center">
        <h2 class="text-3xl font-bold text-primary mb-10 text-center">
          Browse Products
        </h2>
      </div>

      <!-- Show loader while loading is true -->
      <div v-if="state.isLoading" class="text-center text-primary">
        <PulseLoader />
      </div>

      <!-- Show products when loading is false -->
      <div v-else class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <ProductCard
          v-for="product in filteredProducts.slice(
            0,
            limit || filteredProducts.length
          )"
          :key="product.id"
          :product="product"
          class="bg-white rounded-xl shadow-md relative"
        />
      </div>
      <div v-if="filteredProducts.length === 0" class="text-center mt-8">
        <p>No products found</p>
        </div>
    </div>
  </section>
  <section v-if="!state.isLoading">
    <div v-if="showButton" class="m-auto max-w-lg my-10 px-6">
      <RouterLink
        to="/products"
        class="block bg-gray-700 text-white text-center py-4 px-6 rounded-xl hover:bg-primary"
        >View All products</RouterLink
      >
    </div>
  </section>
</template>
