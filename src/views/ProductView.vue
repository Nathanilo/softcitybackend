<script setup>
import BackButton from "@/components/BackButton.vue";
import { useRoute, RouterLink, useRouter } from "vue-router";
import PulseLoader from "vue-spinner/src/PulseLoader.vue";
import { ref, reactive, onMounted, watch, computed } from "vue";
import { useToast } from "vue-toastification";
import { productsInstance } from "@/axiosConfig";
import { productsAuthInstance } from "@/axiosConfig";
import { useStore } from "vuex";


const store = useStore();

const route = useRoute();
const router = useRouter();
const toast = useToast();

const currentPath = ref(route.path);

const productId = ref(route.params.id);

const state = reactive({
  product: {},
  isLoading: false,
});

onMounted(async () => {
  try {
    state.isLoading = true;
    const response = await productsInstance.get(`/${productId.value}`);
    state.product = response.data;
  } catch (error) {
    console.error(error);
  } finally {
    state.isLoading = false;
  }
});

const handleDelete = async (event) => {
  event.preventDefault();
  try {
    await productsAuthInstance.delete(`/${productId.value}`);
    router.push("/dashboard/products");
    toast.success("Product removed successfully");
  } catch (error) {
    console.error("Error deleting product:", error);
    toast.error("Error deleting product");
  }
};

const handleEdit = async (event) => {
  event.preventDefault();
  router.push(`/dashboard/edit-product/${productId.value}`);
};

// Watch for route changes
watch(
  () => route.path,
  (newPath) => {
    currentPath.value = newPath;
  }
);
</script>

<template>
  <BackButton />

  <section class="px-4">
    <div class="container mx-auto py-10 px-4 mt-12">
      <div v-if="state.isLoading" class="text-center text-primary">
        <PulseLoader />
      </div>

      <div v-else>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div class="bg-white rounded-xl p-6">
            <img
              :src="state.product.imageUrl"
              alt="product"
              class="w-full h-80 object-contain rounded-xl"
            />
          </div>
          <div class="bg-white rounded-xl shadow-md p-6">
            <h2 class="text-3xl font-bold text-[#e81101] mb-4">
              {{ state.product.name }}
            </h2>
            <p class="text-lg text-gray-600 mb-4">
              {{ state.product.description }}
            </p>
            <p class="text-lg text-[#e81101] font-bold mt-12 relative">
              Price: ₦{{ state.product.price }}

              <span
                v-if="currentPath.endsWith('/dashboard/products/' + productId)"
                class="absolute right-4 text-sm sm:text-2xl"
              >
                <button @click="handleDelete">
                  <i
                    class="pi pi-trash text-black mr-8 cursor-pointer hover:text-primary"
                  ></i>
                </button>
                <button @click="handleEdit">
                  <i
                    class="pi pi-pen-to-square text-black cursor-pointer hover:text-primary"
                  ></i>
                </button>
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
