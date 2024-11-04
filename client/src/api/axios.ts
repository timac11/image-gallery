import axios from 'axios';
import { getCookie } from '@/lib/cookie.ts';

export const api = axios.create({
  withCredentials: false,
  baseURL: import.meta.env.VITE_API || '/api',
});

api.interceptors.request.use(
  (config) => {
    if (getCookie('csrftoken')) {
      config.headers['X-CSRFToken'] = getCookie('csrftoken');
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);
