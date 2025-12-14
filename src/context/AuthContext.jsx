/*import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [loading, setLoading] = useState(true);

  const API_URL = "http://localhost:4000/api/auth";

  const login = async (email, password) => {
    try {
      const { data } = await axios.post(`${API_URL}/login`, { email, password });

      localStorage.setItem("token", data.token);
      setToken(data.token);
      setUser(data.user);

      return { success: true };
    } catch (error) {
      return { success: false, error: error.response?.data };
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
  };

  useEffect(() => {
    const verificarToken = async () => {
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const { data } = await axios.get(`${API_URL}/me`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setUser(data.user);
      } catch (error) {
        logout();
      }

      setLoading(false);
    };

    verificarToken();
  }, [token]);

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        login,
        logout,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};*/


/*import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [loading, setLoading] = useState(true);

  // URL del backend (ajustada con /api/auth)
  const API_URL = "http://localhost:4000/api/auth";

  // LOGIN
  const login = async (nombre, clave, rol) => {
    try {
      const { data } = await axios.post(`${API_URL}/login`, { nombre, clave, rol });

      localStorage.setItem("token", data.token);
      setToken(data.token);
      setUser(data.user);

      return { success: true };
    } catch (error) {
      console.error("Error en login:", error.response?.data || error.message);
      return { success: false, error: error.response?.data || error.message };
    }
  };

  // LOGOUT
  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
  };

  // Verificar token al iniciar la app
  useEffect(() => {
    const verificarToken = async () => {
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const { data } = await axios.get(`${API_URL}/me`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setUser(data); // data ya es el usuario sin claveHash
      } catch (error) {
        console.error("Token inválido o expirado", error.response?.data || error.message);
        logout();
      }

      setLoading(false);
    };

    verificarToken();
  }, [token]);

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        login,
        logout,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};*/

import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [loading, setLoading] = useState(true);

  const API_URL = "http://localhost:4000/api/auth";

  // Función de login
  const login = async (nombre, clave, rol) => {
    try {
      const { data } = await axios.post(`${API_URL}/login`, { nombre, clave, rol });

      localStorage.setItem("token", data.token);
      setToken(data.token);
      setUser(data.user);

      return { success: true };
    } catch (error) {
      console.error("Error en login:", error.response?.data || error.message);
      return { success: false, error: error.response?.data || error.message };
    }
  };

  // Función de logout
  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
  };

  // Verificación del token al cargar la aplicación
  useEffect(() => {
    const verificarToken = async () => {
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const { data } = await axios.get(`${API_URL}/me`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setUser(data); // Establecer el usuario sin la clave
      } catch (error) {
        console.error("Token inválido o expirado", error.response?.data || error.message);
        logout();
        // Redirigir al login si el token es inválido
        window.location.href = "/admin/login";
      }

      setLoading(false);
    };

    verificarToken();
  }, [token]);

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        login,
        logout,
        isAuthenticated: !!user, // Se considera autenticado si existe un usuario
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};



