import React, { createContext, useContext, useRef, useState, useEffect } from "react";

const AppContext = createContext();

export const useAppContext = () => useContext(AppContext);

export const AppProvider = ({ children }) => {
    const [token, setToken] = useState(localStorage.getItem("token"));

    const login = (newToken) => {
        localStorage.setItem("token", newToken);
        setToken(newToken);
        console.log(newToken);
    };

    const logout = () => {
        localStorage.removeItem("token");
        setToken(null);
    };

    useEffect(() => {
        setToken(localStorage.getItem("token"));
    }, []);

    return (
        <AppContext.Provider
            value={{
                token,
                login,
                logout
            }}
        >
            {children}
        </AppContext.Provider>
    );
};