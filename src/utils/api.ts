import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // base URL from env
  withCredentials: true,                  // send cookies if needed
  headers: {
    "Content-Type": "application/json",   // default header
  },
});

export default api;
