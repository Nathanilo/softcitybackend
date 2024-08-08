// import axios from "axios";

// // Create an Axios instance with default settings
// const instance = axios.create({
//   baseURL: process.env.VUE_APP_API_BASE_URL || "http://localhost:5000/api/auth",
//   timeout: 5000,
//   headers: {
//     "Content-Type": "application/json",
//   },
// });

// // Request interceptor to add the authorization token if available
// instance.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem("token");
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => Promise.reject(error)
// );

// export default instance;


import axios from "axios";

// Create an Axios instance for authentication API with default settings
const authInstance = axios.create({
  baseURL: process.env.VUE_APP_API_BASE_URL || "http://localhost:5000/api/auth",
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Create an Axios instance for products API without authentication
const productsInstance = axios.create({
  baseURL: "http://localhost:5000/api/products",
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Create an Axios instance for products API with authentication
const productsAuthInstance = axios.create({
  baseURL: "http://localhost:5000/api/products",
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
});


productsAuthInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);


// Request interceptor for authInstance to add the authorization token if available
authInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export { authInstance, productsInstance, productsAuthInstance };
