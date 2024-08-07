import { createStore } from "vuex";
import axiosInstance from "@/axiosConfig";

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
    },
  },
  actions: {
    async fetchItems({ commit }) {
      try {
        const response = await axiosInstance.get("/products");
        commit("setItems", response.data);
      } catch (error) {
        console.error("Error fetching items:", error);
      }
    },
    async createItem({ commit }, item) {
      try {
        const response = await axiosInstance.post("/products", item);
        commit("addItem", response.data);
      } catch (error) {
        console.error("Error creating item:", error);
      }
    },
    async editItem({ commit }, item) {
      try {
        const response = await axiosInstance.put(`/products/${item.id}`, item);
        commit("updateItem", response.data);
      } catch (error) {
        console.error("Error editing item:", error);
      }
    },
    async removeItem({ commit }, itemId) {
      try {
        await axiosInstance.delete(`/products/${itemId}`);
        commit("deleteItem", itemId);
      } catch (error) {
        console.error("Error deleting item:", error);
      }
    },
    async login({ commit }, credentials) {
      try {
        const response = await axiosInstance.post("/login", credentials);
        const { user, token } = response.data;
        commit("setUser", user);
        commit("setToken", token);
        axiosInstance.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${token}`;
      } catch (error) {
        console.error("Error logging in:", error);
      }
    },
    logout({ commit }) {
      commit("logout");
      delete axiosInstance.defaults.headers.common["Authorization"];
    },
  },
  getters: {
    getItems: (state) => state.items,
    getItemById: (state) => (id) => state.items.find((item) => item.id === id),
    getUser: (state) => state.user,
    isAuthenticated: (state) => !!state.token,
  },
});
