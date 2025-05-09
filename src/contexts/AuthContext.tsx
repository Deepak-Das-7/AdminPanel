import React, { createContext, useState, useEffect, type ReactNode } from "react";

interface AuthContextType {
    token: string | null;
    userDetails: { [key: string]: any } | null;
    login: (token: string, userDetails: { [key: string]: any }) => void;
    logout: () => void;
    isAuthenticated: boolean;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [token, setToken] = useState<string | null>(null);
    const [userDetails, setUserDetails] = useState<{ [key: string]: any } | null>(null);

    useEffect(() => {
        const storedToken = localStorage.getItem("adminToken");
        const storedUser = localStorage.getItem("userDetails");
        if (storedToken) setToken(storedToken);
        if (storedUser) setUserDetails(JSON.parse(storedUser));
    }, []);

    const login = (newToken: string, newUserDetails: { [key: string]: any }) => {
        localStorage.setItem("adminToken", newToken);
        localStorage.setItem("userDetails", JSON.stringify(newUserDetails));
        setToken(newToken);
        setUserDetails(newUserDetails);
    };

    const logout = () => {
        localStorage.removeItem("adminToken");
        localStorage.removeItem("userDetails");
        setToken(null);
        setUserDetails(null);
    };

    const isAuthenticated = Boolean(token);

    return (
        <AuthContext.Provider value={{ token, userDetails, login, logout, isAuthenticated }}>
            {children}
        </AuthContext.Provider>
    );
};
