import { createRouter, createWebHistory } from "vue-router";
import HomeView from "@/views/HomeView.vue";
import ProductsView from "@/views/ProductsView.vue";
import LoginView from "@/views/LoginView.vue";
import SignupView from "@/views/SignupView.vue";
import NotFoundView from "@/views/NotFoundView.vue";
import ProductView from "@/views/ProductView.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/dashboard",
    name: "dashboard",
    component: HomeView,
  },
  {
    path: "/dashboard/products",
    name: "dashboard-products",
    component: ProductsView,
  },
  {
    path: "/dashboard/products/:id",
    name: "dashboard-product",
    component: ProductView,
  },
  {
    path: "/products",
    name: "products",
    component: ProductsView,
  },

  {
    path: "/products/:id",
    name: "product",
    component: ProductView,
  },
  {
    path: "/login",
    name: "login",
    component: LoginView,
  },
  {
    path: "/register",
    name: "register",
    component: SignupView,
  },
  {
    path: "/:catchAll(.*)*",
    name: "not-found",
    component: NotFoundView,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
