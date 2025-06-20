import { jwtDecode } from 'jwt-decode';
import React, { createContext, useContext, useState, ReactNode,useEffect } from 'react';
import apiService from '../../apiservices/apiService';

type UserProfile = {
  email: string;
  firstName?: string;
  lastName?: string;
  role?: string;
};

type UserContextType = {
  user: UserProfile | null;
  setUser: (user: UserProfile | null) => void;
  logout: () => void;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UserProfile | null>(null);

  const logout = () => {
    localStorage.removeItem('authToken');
    setUser(null);
  };

  useEffect(() => {
    const initUser = async () => {
      const token = localStorage.getItem('authToken');
      if (!token) return;

      try {
        const decoded: any = jwtDecode(token);
        const userId = decoded.sub || decoded.uuid;
        const res = await apiService.getUserProfile({ id: userId });
        setUser(res.data.userprofile);
      } catch (error) {
        console.error('Auto-login failed:', error);
        logout();
      }
    };
    initUser();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
