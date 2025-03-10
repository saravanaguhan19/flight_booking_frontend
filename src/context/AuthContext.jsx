import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import apiKey from "../config";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const email = localStorage.getItem("email");

    if (token && email) {
      setUser({ email, token });
    }
  }, []);

  const login = async (email, password) => {
    try {
      const response = await axios.post(`${apiKey}login`, {
        email,
        password,
      });
      
      if (response.data.status === "success") {
    
        localStorage.setItem("token", response.data.data.token);
        localStorage.setItem("email", email);
        setUser({ email, token: response.data.data.token });
        return { success: true };
      }
      return { success: false, message: response.data.message };
    } catch (error) {
      return { success: false, message: "Login failed!" };
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
