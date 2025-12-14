/*import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export function useAuth() {
  console.log("aqui falta")
  return useContext(AuthContext);
}*/

import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export function useAuth() {
  const { user, token, loading, logout, setUser, setToken } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const verifyToken = async () => {
      if (!token) {
        setUser(null);
        setToken(null);
        return;
      }

      try {
        const response = await axios.get("http://localhost:4000/api/auth/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        // Si el token es válido y el usuario está autenticado
        setUser(response.data);
      } catch (err) {
        console.error("Token inválido o expirado", err);
        logout(); // Si no es válido, hacer logout
        navigate("/admin/login"); // Redirigir al login
      }
    };

    if (token) {
      verifyToken();
    }
  }, [token, setUser, setToken, logout, navigate]);

  return { user, token, loading, isAuthenticated: !!user };
}

