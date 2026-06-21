'use client';

import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // fungsi otomatis untuk memeriksa cookie session ke backend
    const checkUserSession = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/auth/me', { withCredentials: true });
            setUser(response.data.user);
        } catch (error) {
            setUser(null);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        // eslint-disable-next-line 
        checkUserSession();
    }, []);

    return (
        <AuthContext.Provider value={{user, setUser, loading, checkUserSession}} 
            
        >
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => {
    return useContext(AuthContext);
}