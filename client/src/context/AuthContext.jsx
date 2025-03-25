import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const isAuthenticated = !!user;

  useEffect(() => {
    const checkUserLoggedIn = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          setLoading(false);
          return;
        }

        const res = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/api/auth/me`,
          { headers: { Authorization: `Bearer ${token}` } }
        );

        setUser(res.data);
      await new Promise((resolve) => setTimeout(resolve, 100)); // Small delay for state update

      } catch (err) {
        localStorage.removeItem("token");
        setError(err.response?.data?.message || "Session expired. Please log in again.");
      } finally {
        setLoading(false);
      }
    };

    checkUserLoggedIn();
  }, []);

  const login = async (email) => {
    try {
      setLoading(true);
      setError(null);
    
  
      const res = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/auth/login`, {
        email // it contains email and password both
      });

     

      localStorage.setItem("token", res.data.token);
      setUser(res.data.user);
      await new Promise((resolve) => setTimeout(resolve, 100)); // Small delay for state update
      return true;
    } catch (err) {
      setError(err.response?.data?.message || "Invalid credentials");
      return false;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    setError(null);
  };

  const isAdmin = () => {
  
    return user?.role === "admin";
  };
  
  

 
  return (
    <AuthContext.Provider value={{ user, loading, error, login, logout,isAdmin,isAuthenticated  }}>
      {children}
    </AuthContext.Provider>
  );
};
