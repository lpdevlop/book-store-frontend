import axios, { AxiosInstance, AxiosResponse, AxiosError, InternalAxiosRequestConfig } from "axios";
import { jwtDecode } from "jwt-decode";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

interface TokenResponse {
    accessToken: string;
    refreshToken: string;
}

interface DecodedToken {
    exp: number;
    [key: string]: unknown;
}

interface RetryableAxiosRequestConfig extends InternalAxiosRequestConfig {
    _retry?: boolean;
}

const api: AxiosInstance = axios.create({
    baseURL: `${API_BASE_URL}/api`,
    timeout: 10000,
});

const isTokenExpired = (token: string): boolean => {
    if (!token) return true;
    const decoded: DecodedToken = jwtDecode(token);
    const currentTime = Date.now() / 1000;
    return decoded.exp < currentTime;
};

const refreshAccessToken = async (): Promise<string> => {
    const refreshToken = localStorage.getItem("refreshToken");

    if (!refreshToken) {
        throw new Error("No refresh token available");
    }

    try {
        const response: AxiosResponse<TokenResponse> = await api.post("/auth/refresh-token", { refreshToken });
        const { accessToken, refreshToken: newRefreshToken } = response.data;

        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("refreshToken", newRefreshToken);

        return accessToken;
    } catch (error) {
        console.error("Failed to refresh token:", error);
        throw error;
    }
};

api.interceptors.request.use(
    async (config: InternalAxiosRequestConfig): Promise<InternalAxiosRequestConfig> => {
        let accessToken = localStorage.getItem("accessToken");

        if (accessToken && isTokenExpired(accessToken)) {
            try {
                accessToken = await refreshAccessToken();
            } catch (error) {
                console.error("Token refresh failed:", error);
                localStorage.removeItem("accessToken");
                localStorage.removeItem("refreshToken");
                return Promise.reject(error);
            }
        }

        if (accessToken) {
            config.headers = config.headers || {};
            config.headers.Authorization = `Bearer ${accessToken}`;
        }

        return config;
    },
    (error: AxiosError) => {
        return Promise.reject(error);
    }
);

api.interceptors.response.use(
    (response: AxiosResponse) => response,
    async (error: AxiosError) => {
        const originalRequest = error.config as RetryableAxiosRequestConfig;

        if (error.response?.status === 401 && !originalRequest?._retry) {
            originalRequest._retry = true;

            try {
                const newAccessToken = await refreshAccessToken();
                originalRequest.headers = originalRequest.headers || {};
                originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
                return api(originalRequest);
            } catch (refreshError) {
                console.error("Failed to refresh token:", refreshError);
                localStorage.removeItem("accessToken");
                localStorage.removeItem("refreshToken");
                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);
    }
);

export default api;