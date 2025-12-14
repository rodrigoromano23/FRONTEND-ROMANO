import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

export default function HeaderJefe() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        const res = await axios.get("http://localhost:4000/api/auth/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setUser(res.data);
      } catch (err) {
        console.error("Error cargando usuario:", err);
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/admin");
      }
    };

    fetchUser();
  }, [navigate]);

  const onLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/admin");
  };

  // 🔥 ELIMINAR CUENTA (JEFE) con SweetAlert2
  const onDeleteAccount = async () => {
    const result = await Swal.fire({
      title: "¿Eliminar tu cuenta?",
      text: "Esta acción es irreversible. Se eliminará tu cuenta definitivamente.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#dc2626",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
      reverseButtons: true,
    });

    if (!result.isConfirmed) return;

    try {
      const token = localStorage.getItem("token");
      if (!token || !user?._id) return;

      await axios.delete(
        `http://localhost:4000/api/admin/users/${user._id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      await Swal.fire({
        title: "Cuenta eliminada",
        text: "Tu cuenta fue eliminada correctamente",
        icon: "success",
        timer: 1500,
        showConfirmButton: false,
      });

      localStorage.removeItem("token");
      localStorage.removeItem("user");
      navigate("/admin");
    } catch (err) {
      console.error("Error eliminando cuenta:", err);
      Swal.fire(
        "Error",
        "No se pudo eliminar la cuenta",
        "error"
      );
    }
  };

  const fotoUrl = user?.foto
    ? `http://localhost:4000/uploads/${user.foto}`
    : null; // 👈 sin default

  return (
    <header className="w-full bg-gradient-to-r from-pink-100 via-purple-100 to-blue-100 shadow-md p-4 flex justify-between items-center border-b border-purple-200">
      {/* IZQUIERDA */}
      <nav className="flex gap-6 font-semibold text-gray-700">
        <p className="text-purple-700 font-bold">Jefe</p>

        <button onClick={() => navigate("/admin/Empleados")}>Empleados</button>
        <button onClick={() => navigate("/admin/secciones")}>Secciones</button>
        <button onClick={() => navigate("/admin/inscriptos")}>Inscriptos</button>
        <button onClick={() => navigate("/admin/juegos")}>Juegos</button>
        <button onClick={() => navigate("/admin/Publicaciones")}>
          Publicaciones
        </button>
      </nav>

      {/* DERECHA */}
      <div className="flex items-center gap-4">
        <span className="font-semibold text-purple-700">
          {user?.nombre}
        </span>

        {fotoUrl && (
          <img
            src={fotoUrl}
            alt="avatar"
            className="w-10 h-10 rounded-full object-cover border border-purple-300 shadow-sm"
          />
        )}

        <button
          className="px-3 py-1 rounded bg-red-300 text-red-800 hover:bg-red-400 transition shadow-sm"
          onClick={onLogout}
        >
          Cerrar sesión
        </button>

        <button
          className="px-3 py-1 rounded bg-gray-300 text-gray-800 hover:bg-gray-400 transition shadow-sm"
          onClick={onDeleteAccount}
        >
          Eliminar cuenta
        </button>
      </div>
    </header>
  );
}
