import { createRouter, createWebHistory } from "vue-router";
import store from "@/store";
import HomeView from "@/views/HomeView.vue";
import ProductsView from "@/views/ProductsView.vue";
import LoginView from "@/views/LoginView.vue";
import SignupView from "@/views/SignupView.vue";
import NotFoundView from "@/views/NotFoundView.vue";
import ProductView from "@/views/ProductView.vue";
import AddProductView from "@/views/AddProductView.vue";
import EditProductView from "@/views/EditProductView.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/dashboard",
    name: "dashboard",
    meta: { requiresAuth: true },
    component: HomeView,
  },

  {
    path: "/dashboard/products",
    name: "dashboard-products",
    component: ProductsView,
    meta: { requiresAuth: true },
  },
  {
    path: "/dashboard/products/:id",
    name: "dashboard-product",
    component: ProductView,
    meta: { requiresAuth: true },
  },
  {
    path: "/dashboard/add-product",
    name: "add-product",
    component: AddProductView,
    meta: { requiresAuth: true },
  },
  {
    path: "/dashboard/edit-product/:id",
    name: "edit-product",
    component: EditProductView,
    meta: { requiresAuth: true },
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

// Global navigation guard
router.beforeEach((to, from, next) => {
  const isAuthenticated = store.getters.isAuthenticated;

  if (to.matched.some((record) => record.meta.requiresAuth)) {
    // If the route requires authentication and the user is not authenticated, redirect to login
    if (!isAuthenticated) {
      next({ path: "/login" });
    } else {
      next();
    }
  } else if (to.name === "login" && isAuthenticated) {
    // If the user is authenticated and tries to navigate to the login page, redirect to dashboard
    next({ path: "/dashboard" });
  } else {
    next();
  }
});

export default router;
