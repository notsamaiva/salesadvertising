import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState(null);

    // Fonction de connexion
    const login = (userData) => {
        const { id, token, role, first_name, last_name, username, email } = userData;
        const userInfo = {
            id,
            token,
            role,
            first_name,
            last_name,
            username,
            email
        };
        setUser(userInfo);
        setIsAuthenticated(true);
        localStorage.setItem('authToken', token);
        localStorage.setItem('userInfo', JSON.stringify(userInfo));
    };

    // Fonction de déconnexion
    const logout = () => {
        setUser(null);
        setIsAuthenticated(false);
        localStorage.removeItem('authToken');
        localStorage.removeItem('userInfo');
    };

    // Vérifie s'il y a une session sauvegardée dans localStorage
    useEffect(() => {
        const storedUserInfo = localStorage.getItem('userInfo');
        const storedToken = localStorage.getItem('authToken');

        if (storedUserInfo && storedToken) {
            setUser(JSON.parse(storedUserInfo));
            setIsAuthenticated(true);
        }
    }, []);

    return (
        <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};
