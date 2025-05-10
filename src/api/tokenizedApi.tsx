import axios from "axios";
import { jwtDecode } from "jwt-decode";
// import { useDispatch } from "react-redux";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const tokenizedApi = axios.create({
    baseURL: `${API_BASE_URL}/api`,
    headers: {
        "Content-Type": "application/json",
    },
});

// Function to check if the token is expired
const isTokenExpired = (token: string): boolean => {
    try {
        const decoded: { exp: number } = jwtDecode(token);
        return decoded.exp < Date.now() / 1000; // Compare expiry time with current time
    } catch (error) {
        console.error("Invalid token:", error);
        return true;
    }
};

// Function to refresh token
const refreshToken = async () => {
    const refreshToken = localStorage.getItem("refreshToken");
    if (!refreshToken) {
        // throw new Error("No refresh token found. Please log in again.");
        // window.location.href = "/login"; 
        console.error("No refresh token found. Redirecting to login...");
        window.location.href = "/login";
        return;
    }

    try {
        const { data } = await axios.get(`${API_BASE_URL}/api/auth/refresh-token`, {
            params: { refreshToken },
        });

        localStorage.setItem("accessToken", data.accessToken);
        if (data.refreshToken) {
            localStorage.setItem("refreshToken", data.refreshToken); // Store new refresh token if provided
        }
        return data.accessToken;
    } catch (error) {
        console.error("Failed to refresh token:", error);
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        window.location.href = "/login"; // Redirect user to login
        throw error;
    }
};

// Axios Request Interceptor: Attach Token Automatically
tokenizedApi.interceptors.request.use(async (config) => {
    let token = localStorage.getItem("accessToken");
   
    if (token && isTokenExpired(token)) {
        try {
            token = await refreshToken();
        } catch (error) {
            console.error("Error refreshing token:", error);
            return Promise.reject(error);
        }
    }

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});

export default tokenizedApi;
