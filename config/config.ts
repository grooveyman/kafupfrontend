// src/api.ts
import axios from "axios";
import { API_BASE_URL } from "./connect";

export const api = axios.create({
  baseURL: API_BASE_URL, // set your base API URL
  withCredentials: false,
  headers: {
    "Content-Type": "application/json",
    // "Api-Key": import.meta.env.VITE_API_KEY, // api key
  },
});

// Optional: attach dynamic headers (e.g., token)
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    // Decide whether to use Authorization or X-Access-Token
    if (config.headers?.useXAccessToken) {
      config.headers["X-Access-Token"] = `Bearer ${token}`;
      delete config.headers.useXAccessToken; // remove custom flag after use
    }
  }
  return config;
});
