import axios from 'axios';

export const api = axios.create({
  withCredentials: false,
  baseURL: import.meta.env.VITE_API || '/api',
});
