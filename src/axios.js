// src/axios.js
import axios from 'axios';
axios.post('/auth/login', {  })

console.log("API Base URL:", import.meta.env.VITE_API_BASE_URL); // Debug

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL
});

instance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default instance;
