import axios from 'axios';

const API = axios.create({
  baseURL: 'http://127.0.0.1:8000/api/', // Replace with your Django backend URL
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token'); // Retrieve JWT token
  if (token) {
    config.headers.Authorization = `Token ${token}`; // Add token to request headers
  }
  return config;
});

export default API;


