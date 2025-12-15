import { useState } from "react";
import api from "../../services/api";

const API_BASE_URL = import.meta.env.VITE_API_BASE || "https://backend-romano.onrender.com";
export default function AdminForgot() {
  const [nombre, setNombre] = useState("");
  const [correo, setCorreo] = useState("");
  const [celular, setCelular] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensaje("");
    setError("");

    try {
      const { data } = await api.post("/auth/forgot", {
        nombre,
        correo,
        celular
      });

      setMensaje("Solicitud aceptada. Ahora ingrese la nueva clave.");
    } catch (err) {
      setError(err.response?.data?.message || "Error solicitando reseteo.");
    }
  };

  return (
    <div className="flex flex-col items-center pt-24">
      <h1 className="text-2xl font-semibold mb-6">Recuperar clave</h1>

      <form onSubmit={handleSubmit} className="w-full max-w-md bg-white p-6 rounded shadow">
        <label className="block mb-3">
          Nombre:
          <input
            type="text"
            className="w-full border p-2 mt-1 rounded"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
        </label>

        <label className="block mb-3">
          Correo:
          <input
            type="email"
            className="w-full border p-2 mt-1 rounded"
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
          />
        </label>

        <label className="block mb-3">
          Celular:
          <input
            type="text"
            className="w-full border p-2 mt-1 rounded"
            value={celular}
            onChange={(e) => setCelular(e.target.value)}
          />
        </label>

        <button className="w-full bg-blue-600 text-white py-2 rounded mt-4">
          Recuperar clave
        </button>

        {mensaje && <p className="text-green-600 mt-4">{mensaje}</p>}
        {error && <p className="text-red-600 mt-4">{error}</p>}
      </form>
    </div>
  );
}
