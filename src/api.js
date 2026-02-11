import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // read from .env
});

// Automatically attach JWT token if available
API.interceptors.request.use((config) => {
  const user = JSON.parse(localStorage.getItem("user")) || {};
  if (user.token) {
    config.headers.Authorization = `Bearer ${user.token}`;
  }
  return config;
});

export default API;
