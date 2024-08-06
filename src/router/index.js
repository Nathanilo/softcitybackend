import { createRouter, createWebHistory } from "vue-router";
import HomeView from "@/views/HomeView.vue";
import ProductsView from "@/views/ProductsView.vue";
import LoginView from "@/views/LoginView.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/products",
    name: "products",
    component: ProductsView,
  },
  {
    path: "/login",
    name: "login",
    component: LoginView,
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
