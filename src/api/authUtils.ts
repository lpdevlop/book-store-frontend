import { jwtDecode } from "jwt-decode";

export const isTokenExpired = (token: string): boolean => {
    try {
        const decoded = jwtDecode<{ exp: number }>(token);
        return decoded.exp < Date.now() / 1000;
    } catch {
        return true;
    }
};