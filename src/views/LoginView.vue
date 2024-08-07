<script setup>
import router from "@/router";
import axios from "axios";
import axiosInstance from "@/axiosConfig";
import { useToast } from "vue-toastification";
import { reactive, ref } from "vue";
import FormComponent from "@/components/FormComponent.vue";

const form = ref({
  email: "",
  password: "",
});

const toast = useToast();

const handleSubmit = async (event) => {
  event.preventDefault();
  try {
    const response = await axiosInstance.post("/login", form.value);
    console.log(response.data);
    router.push("/dashboard");
    toast.success("Login successful.");
  } catch (error) {
    console.error(error);
    toast.error("An error occurred. Please try again.");
  }
};
</script>

<template>
  <section class="">
    <div class="container m-auto max-w-2xl py-24">
      <div
        class="bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0"
      >
        <FormComponent title="Login to SoftCity" :handleSubmit="handleSubmit">
          <template v-slot:content>
            <div class="mb-4">
              <label for="type" class="block text-gray-700 font-bold mb-2"
                >Email</label
              >
              <input
                v-model="form.email"
                id="email"
                name="email"
                class="border rounded w-full py-2 px-3"
                placeholder="Enter your email"
                required
              />
            </div>

            <div class="mb-4">
              <label class="block text-gray-700 font-bold mb-2">Password</label>
              <input
                type="password"
                v-model="form.password"
                id="password"
                name="password"
                class="border rounded w-full py-2 px-3 mb-2"
                placeholder="Enter your password"
                required
              />
            </div>

            <div>
              <button
                class="bg-gray-700 text-white font-bold py-2 px-4 rounded-md w-full focus:outline-none focus:shadow-outline"
                type="submit"
              >
                Login
              </button>
            </div>
          </template>
          <template v-slot:link class="mt-4 text-center">
            <router-link to="/register" class="text-gray-700"
              >Don't have an account?
              <span class="text-primary">Signup here</span></router-link
            >
          </template>
        </FormComponent>
      </div>
    </div>
  </section>
</template>
