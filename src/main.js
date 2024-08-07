import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import axios from "./axiosConfig";
import Toast, { POSITION } from "vue-toastification";

import "./assets/main.css";
import "primeicons/primeicons.css";
import "vue-toastification/dist/index.css";

// Create Vue app instance
const app = createApp(App);

// Configure global properties
app.config.globalProperties.$http = axios;

// Configure and use plugins
app.use(store);
app.use(router);
app.use(Toast, {
  position: POSITION.TOP_RIGHT,
  timeout: 5000,
  closeOnClick: true,
  pauseOnFocusLoss: true,
  pauseOnHover: true,
  draggable: true,
  draggablePercent: 0.6,
  showCloseButtonOnHover: false,
  hideProgressBar: false,
  closeButton: "button",
  icon: true,
  rtl: false,
});

app.use(store)

// Mount the app
app.mount("#app");
