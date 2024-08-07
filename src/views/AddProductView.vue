<script setup>
import router from "@/router";
import axiosInstance from "@/axiosConfig";
import { reactive, ref } from "vue";
import FormComponent from "@/components/FormComponent.vue";
import { useToast } from "vue-toastification";

const form = ref({
  name: "",
  price: "",
  imageUrl: "",
  description: "",
});

const toast = useToast();

const handleSubmit = async (event) => {
  event.preventDefault();
  console.log(form.value);
};
</script>

<template>
  <section class="mt-6">
    <div class="container m-auto max-w-2xl py-24">
      <div
        class="bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0"
      >
        <FormComponent
          title="Add product to SoftCity"
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
                Add Product
              </button>
            </div>
          </template>
          <template v-slot:link class="mt-4 text-center hidden"> </template>
        </FormComponent>
      </div>
    </div>
  </section>
</template>
