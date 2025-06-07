
import axios, { AxiosRequestConfig, InternalAxiosRequestConfig } from 'axios';

export interface CustomAxiosRequestConfig extends AxiosRequestConfig {
  skipAuth?: boolean;
}

const axiosInstance = axios.create({
  baseURL: 'http://localhost:8080/api/v1', 
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

