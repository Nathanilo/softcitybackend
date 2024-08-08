import { createStore } from "vuex";
import {
  productsInstance,
  authInstance,
  productsAuthInstance,
} from "@/axiosConfig";

export default createStore({
  state: {
    items: [],
    user: null,
    token: null,
  },
  mutations: {
    setItems(state, items) {
      state.items = items;
    },
    addItem(state, item) {
      state.items.push(item);
    },
    updateItem(state, updatedItem) {
      const index = state.items.findIndex((item) => item.id === updatedItem.id);
      if (index !== -1) {
        state.items.splice(index, 1, updatedItem);
      }
    },
    deleteItem(state, itemId) {
      state.items = state.items.filter((item) => item.id !== itemId);
    },
    setUser(state, user) {
      state.user = user;
    },
    setToken(state, token) {
      state.token = token;
    },
    logout(state) {
      state.user = null;
      state.token = null;
      localStorage.removeItem("token");
    },
  },
  actions: {
    async fetchItems({ commit }) {
      try {
        const response = await productsInstance.get("/api/products/");
        commit("setItems", response.data);
      } catch (error) {
        console.error("Error fetching items:", error);
      }
    },
    async createItem({ commit }, item) {
      try {
        const response = await productsAuthInstance.post(
          "/api/products/",
          item
        );
        commit("addItem", response.data);
      } catch (error) {
        console.error("Error creating item:", error);
      }
    },
    async editItem({ commit }, item) {
      try {
        const response = await productsAuthInstance.put(
          `/api/products/${item.id}`,
          item
        );
        commit("updateItem", response.data);
      } catch (error) {
        console.error("Error editing item:", error);
      }
    },
    async removeItem({ commit }, itemId) {
      try {
        await productsInstance.delete(`/api/products/${itemId}`);
        commit("deleteItem", itemId);
      } catch (error) {
        console.error("Error deleting item:", error);
      }
    },
    async login({ commit }, credentials) {
      try {
        const response = await authInstance.post(
          "/api/auth/login",
          credentials
        );

        if (response.status !== 200) {
          console.log(response)
          throw new Error(response.message);
        }
        const { user, token } = response.data;
        commit("setUser", user);
        commit("setToken", token);
        localStorage.setItem("token", token);
        authInstance.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${token}`;
      } catch (error) {
        console.error("Error logging in:", error);
        throw error;
      }
    },
    logout({ commit }) {
      commit("logout");
      delete authInstance.defaults.headers.common["Authorization"];
    },
  },
  getters: {
    getItems: (state) => state.items,
    getItemById: (state) => (id) => state.items.find((item) => item.id === id),
    getUser: (state) => state.user,
    isAuthenticated: (state) => !!state.token,
  },
});
