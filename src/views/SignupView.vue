<script setup>
import router from "@/router";
import axios from "axios";
import { reactive, ref } from "vue";
import FormComponent from "@/components/FormComponent.vue";

const form = ref({
  username: "",
  email: "",
  password: "",
});
</script>

<template>
  <section class="">
    <div class="container m-auto max-w-2xl py-24">
      <div
        class="bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0"
      >
        <FormComponent title="Signup to SoftCity">
          <template v-slot:content>
            <div class="mb-4">
              <label for="type" class="block text-gray-700 font-bold mb-2"
                >Username</label
              >
              <input
                v-model="form.email"
                id="username"
                name="username"
                class="border rounded w-full py-2 px-3"
                placeholder="Enter a username"
                required
              />
            </div>
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
                Signup
              </button>
            </div>
          </template>
          <template v-slot:link class="mt-4 text-center">
            <router-link to="/Login" class="text-gray-700"
              >Already have an account?
              <span class="text-primary">Login here</span></router-link
            >
          </template>
        </FormComponent>
      </div>
    </div>
  </section>
</template>
