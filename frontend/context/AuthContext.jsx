"use client"
import { createContext, use, useContext, useEffect, useState } from "react";
import axiosInstance from "@/utils/axiosInstance";
import { useRouter } from "next/navigation";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    const fetchUser = async () => {
        try {
            const response = await axiosInstance.get("/api/account/me");
            setUser(response.data);
        } catch (error) {
            setUser(null);
        } finally {
            setLoading(false);
        }
    };

    const login = async (data) => {
        await axiosInstance.post("/api/account/login", data);
        await fetchUser();
        router.push("/user/order");
    }

    const logout = async () => {
        await axiosInstance.post("/api/account/logout");
        setUser(null);
        router.push("/login");
    }

    const register = async (data) => {
        await axiosInstance.post("/api/account/register", data);
        router.push("/login");
    }

    useEffect(() => {
        if (!user && loading) {
            fetchUser();
        }
    }, [])

    return (
        <AuthContext.Provider value={{ user, loading, login, logout, register }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext); 