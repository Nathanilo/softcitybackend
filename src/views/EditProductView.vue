<script setup>
import router from "@/router";
import axiosInstance from "@/axiosConfig";
import { reactive, ref, computed, onMounted } from "vue";
import FormComponent from "@/components/FormComponent.vue";
import { useToast } from "vue-toastification";
import { useStore } from "vuex";
import { useRoute } from "vue-router";
import { productsAuthInstance, productsInstance } from "@/axiosConfig";

const route = useRoute();
const toast = useToast();
const store = useStore();

const productId = route.params.id;

const form = reactive({
  name: "",
  price: "",
  imageUrl: "",
  description: "",
});

const state = reactive({
  product: {},
  isLoading: false,
});

// Check if user is authenticated
const isAuthenticated = computed(() => store.getters.isAuthenticated);

const handleSubmit = async (event) => {
  event.preventDefault();

  const updatedProduct = {
    name: form.name,
    price: form.price,
    imageUrl: form.imageUrl,
    description: form.description,
  };

  try {
    await productsAuthInstance.put(`${productId}`, updatedProduct);
    toast.success("Product updated successfully");
    router.push("/dashboard");
  } catch (error) {
    console.error("Error updating product:", error);
    toast.error("Error updating product");
  }
};

onMounted(async () => {
  try {
    state.isLoading = true;
    const response = await productsInstance.get(`/${productId}`);

    state.product = await response.data;

    //populate inputs
    form.name = state.product.name;
    form.price = state.product.price;
    form.imageUrl = state.product.imageUrl;
    form.description = state.product.description;
  } catch (error) {
    console.error("Error fetching product", error);
    toast.error("Error fetching product");
  } finally {
    state.isLoading = false;
  }
});
</script>

<template>
  <section class="mt-6">
    <div class="container m-auto max-w-2xl py-24">
      <div
        class="bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0"
      >
        <FormComponent
          title="Edit Product details"
          :handleSubmit="handleSubmit"
        >
          <template v-slot:content>
            <div class="mb-4">
              <label for="type" class="block text-gray-700 font-bold mb-2"
                >Name</label
              >
              <input
                v-model="form.name"
                id="name"
                name="name"
                type="text"
                class="border rounded w-full py-2 px-3"
                placeholder="Enter the product name"
                required
              />
            </div>

            <div class="mb-4">
              <label class="block text-gray-700 font-bold mb-2"
                >Price (₦)</label
              >
              <input
                type="number"
                v-model="form.price"
                id="price"
                name="price"
                class="border rounded w-full py-2 px-3 mb-2"
                placeholder="Enter product price "
                required
              />
            </div>

            <div class="mb-4">
              <label class="block text-gray-700 font-bold mb-2"
                >Image-URL</label
              >
              <input
                type="text"
                v-model="form.imageUrl"
                id="imageUrl"
                name="imageUrl"
                class="border rounded w-full py-2 px-3 mb-2"
                placeholder="Enter a valid product image URL"
                required
              />
            </div>
            <div class="mb-4">
              <label
                for="description"
                class="block text-gray-700 font-bold mb-2"
                >Description</label
              >
              <textarea
                id="description"
                v-model="form.description"
                name="description"
                class="border rounded w-full py-2 px-3"
                rows="4"
                placeholder="Write a short product overview"
              ></textarea>
            </div>

            <div>
              <button
                class="bg-gray-700 text-white font-bold py-2 px-4 rounded-md w-full focus:outline-none focus:shadow-outline"
                type="submit"
              >
                Submit
              </button>
            </div>
          </template>
          <template v-slot:link class="mt-4 text-center hidden"> </template>
        </FormComponent>
      </div>
    </div>
  </section>
</template>
