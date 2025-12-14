import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

export default function EditarPerfil() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [form, setForm] = useState({
    nombre: "",
    correo: "",
    celular: "",
    domicilio: "",
    fechaNacimiento: "",
    dni: "",
    nuevaClave: "",
    foto: null,
  });

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return navigate("/admin");

        const res = await axios.get("http://localhost:4000/api/auth/me", {
          headers: { Authorization: `Bearer ${token}` },
        });

        setUser(res.data);
        setForm({
          nombre: res.data.nombre || "",
          correo: res.data.correo || "",
          celular: res.data.celular || "",
          domicilio: res.data.domicilio || "",
          fechaNacimiento: res.data.fechaNacimiento
            ? new Date(res.data.fechaNacimiento).toISOString().split("T")[0]
            : "",
          dni: res.data.dni || "",
          nuevaClave: "",
          foto: null,
        });
      } catch (err) {
        console.error("Error cargando usuario:", err);
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/admin");
      }
    };

    fetchUser();
  }, [navigate]);

  const handleChange = (e) => {
    if (e.target.name === "foto") {
      setForm({ ...form, foto: e.target.files[0] });
    } else {
      setForm({ ...form, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = new FormData();
      Object.keys(form).forEach((key) => {
        if (key !== "foto") data.append(key, form[key]);
      });
      if (form.foto) data.append("foto", form.foto);

      const token = localStorage.getItem("token");

      const res = await axios.put("http://localhost:4000/api/auth/update-me", data, {
        headers: { "Content-Type": "multipart/form-data", Authorization: `Bearer ${token}` },
      });

      setUser(res.data);
      localStorage.setItem("user", JSON.stringify(res.data));

      Swal.fire("Éxito", "Perfil actualizado correctamente", "success");
    } catch (err) {
      console.error("Error actualizando perfil:", err);
      Swal.fire("Error", err.response?.data?.msg || "Error al actualizar perfil", "error");
    }
  };

  if (!user) return <p className="text-center mt-20 text-gray-600">Cargando...</p>;

  const fotoUrl = form.foto
    ? URL.createObjectURL(form.foto)
    : user.fotoUrl || "/default-avatar.png";

  return (
    <div className="max-w-md mx-auto mt-12 bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 shadow-lg p-8 rounded-2xl">
      <h2 className="text-2xl font-bold mb-6 text-center text-purple-700">Editar Perfil</h2>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          name="nombre"
          placeholder="Nombre"
          value={form.nombre}
          onChange={handleChange}
          className="p-2 rounded-lg border border-purple-200 focus:outline-none focus:ring-2 focus:ring-purple-300"
          required
        />

        <input
          type="email"
          name="correo"
          placeholder="Correo"
          value={form.correo}
          onChange={handleChange}
          className="p-2 rounded-lg border border-purple-200 focus:outline-none focus:ring-2 focus:ring-purple-300"
          required
        />

        <input
          type="text"
          name="celular"
          placeholder="Celular"
          value={form.celular}
          onChange={handleChange}
          className="p-2 rounded-lg border border-purple-200 focus:outline-none focus:ring-2 focus:ring-purple-300"
        />

        <input
          type="text"
          name="domicilio"
          placeholder="Domicilio"
          value={form.domicilio}
          onChange={handleChange}
          className="p-2 rounded-lg border border-purple-200 focus:outline-none focus:ring-2 focus:ring-purple-300"
        />

        <input
          type="date"
          name="fechaNacimiento"
          value={form.fechaNacimiento}
          onChange={handleChange}
          className="p-2 rounded-lg border border-purple-200 focus:outline-none focus:ring-2 focus:ring-purple-300"
        />

        <input
          type="text"
          name="dni"
          placeholder="DNI"
          value={form.dni}
          onChange={handleChange}
          className="p-2 rounded-lg border border-purple-200 focus:outline-none focus:ring-2 focus:ring-purple-300"
        />

        <input
          type="password"
          name="nuevaClave"
          placeholder="Nueva contraseña (opcional)"
          value={form.nuevaClave}
          onChange={handleChange}
          className="p-2 rounded-lg border border-purple-200 focus:outline-none focus:ring-2 focus:ring-purple-300"
        />

        <input
          type="file"
          name="foto"
          accept="image/*"
          onChange={handleChange}
          className="p-2 rounded-lg border border-purple-200"
        />

        {fotoUrl && (
          <img
            src={fotoUrl}
            alt="Preview"
            className="w-24 h-24 mx-auto rounded-full object-cover shadow-md border border-purple-100"
          />
        )}

        <button
          type="submit"
          className="bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400 text-white py-2 rounded-lg font-semibold hover:scale-105 transition-transform"
        >
          Guardar Cambios
        </button>
      </form>
    </div>
  );
}
