import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const API_BASE_URL = import.meta.env.VITE_API_BASE || "https://backend-romano.onrender.com";
export default function HeaderEmpleados() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  // Cargar usuario desde localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  // Escucha cambios en localStorage
  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === "user" && e.newValue) {
        setUser(JSON.parse(e.newValue));
      }
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const onLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/admin");
  };

  const onEditProfile = () => navigate("/admin/editar-perfil");

  // FOTO: solo la que viene de Mongo, sin default
  const fotoUrl = user?.fotoUrl;
  
  

  return (
    <header className="w-full bg-gradient-to-r from-blue-100 via-purple-100 to-pink-100 shadow-md p-4 flex justify-between items-center border-b border-purple-200">
      {/* IZQUIERDA */}
      <nav className="flex gap-6 font-semibold text-gray-700">
        <p className="text-blue-700 font-bold">Empleados</p>
        <button onClick={() => navigate("/admin/secciones")} className="hover:text-purple-600 transition">Secciones</button>
        <button onClick={() => navigate("/admin/inscriptos")} className="hover:text-purple-600 transition">Inscriptos</button>
        <button onClick={() => navigate("/admin/juegos")} className="hover:text-purple-600 transition">Juegos</button>
        <button onClick={() => navigate("/admin/publicaciones")} className="hover:text-purple-600 transition">Publicaciones</button>
        <button onClick={() => navigate("/admin/sensoForm")} className="hover:text-purple-600 transition">Censo</button>
      </nav>

      {/* DERECHA */}
      <div className="flex items-center gap-4">
        <span className="font-semibold text-purple-700">{user?.nombre || "Usuario"}</span>

        {fotoUrl && (
          <img
            src={fotoUrl}
            alt="avatar"
            className="w-10 h-10 rounded-full object-cover border border-purple-300 shadow-sm"
          />
        )}

        <button
          className="px-3 py-1 rounded bg-yellow-200 text-yellow-800 hover:bg-yellow-300 transition shadow-sm"
          onClick={onEditProfile}
        >
          Editar perfil
        </button>

        <button
          className="px-3 py-1 rounded bg-red-300 text-red-800 hover:bg-red-400 transition shadow-sm"
          onClick={onLogout}
        >
          Cerrar sesión
        </button>
      </div>
    </header>
  );
}
