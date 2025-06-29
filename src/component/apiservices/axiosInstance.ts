
import axios, { AxiosRequestConfig, InternalAxiosRequestConfig } from 'axios';
  const API_BASE_URL = import.meta.env.VITE_BASE_URL;


export interface CustomAxiosRequestConfig extends AxiosRequestConfig {
  skipAuth?: boolean;
}

const axiosInstance = axios.create({
  baseURL: API_BASE_URL, 
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig & CustomAxiosRequestConfig) => {
    const token = localStorage.getItem('authToken');
    if (token && !config.skipAuth) {
      config.headers.set('Authorization', `Bearer ${token}`);
    }
    return config;
  }
);

export default axiosInstance;

