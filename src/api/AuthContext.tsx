import React, { createContext, useContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL; // Load from .env

interface AuthContextType {
    isAuthenticated: boolean;
    login: (accessToken: string, refreshToken: string) => void;
    logout: () => void;
    checkAuth: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        checkAuth();
    }, []);

    const checkAuth = async () => {
        const accessToken = localStorage.getItem("accessToken");
        const refreshToken = localStorage.getItem("refreshToken");

        if (!accessToken || !refreshToken) {
            setIsAuthenticated(false);
            return;
        }

        if (isTokenExpired(accessToken)) {
            try {
                const response = await axios.get(
                    `${API_BASE_URL}/api/auth/refresh-token?refreshToken=${refreshToken}`
                );
                console.log("response", response);
                const { accessToken: newAccessToken, refreshToken: newRefreshToken } = response.data;

                localStorage.setItem("accessToken", newAccessToken);
                localStorage.setItem("refreshToken", newRefreshToken);
                setIsAuthenticated(true);
            } catch (error) {
                console.error("Failed to refresh token:", error);
                logout();
            }
        } else {
            setIsAuthenticated(true);
        }
    };

    const login = (accessToken: string, refreshToken: string) => {
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("refreshToken", refreshToken);
        setIsAuthenticated(true);
    };

    const logout = () => {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        setIsAuthenticated(false);
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout, checkAuth }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};

const isTokenExpired = (token: string): boolean => {
    const decoded: { exp: number } = jwtDecode(token);
    const currentTime = Date.now() / 1000;
    return decoded.exp < currentTime;
};