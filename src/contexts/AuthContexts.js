import React, { createContext, useState } from "react";
import { login as apiLogin } from "../services/user";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token") || null);

  const loginUser = async (username, password) => {
    const data = await apiLogin(username, password);
    setToken(data.access_token);
    localStorage.setItem("token", data.access_token); // Store token in localStorage
  };

  const logoutUser = () => {
    setToken(null);
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ token, loginUser, logoutUser }}>
      {children}
    </AuthContext.Provider>
  );
};