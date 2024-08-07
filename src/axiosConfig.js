import axios from "axios";

// Create an Axios instance with default settings
const instance = axios.create({
  baseURL: process.env.VUE_APP_API_BASE_URL || "http://localhost:5000/api/auth",
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor to add the authorization token if available
instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default instance;
