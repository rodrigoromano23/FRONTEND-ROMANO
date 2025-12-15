import { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";


const API_BASE_URL = import.meta.env.VITE_API_BASE || "https://backend-romano.onrender.com";


export default function AdminJuegos() {
  const [nombre, setNombre] = useState("");
  const [caratula, setCaratula] = useState(null);
  const [link, setLink] = useState("");
  const [loading, setLoading] = useState(false);
  const [mensaje, setMensaje] = useState("");

  // Función para manejar el submit del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMensaje("");

    try {
      const formData = new FormData();
      formData.append("nombre", nombre);
      formData.append("link", link);

      // Si se ha seleccionado una imagen, la añadimos al formulario
      if (caratula) {
        formData.append("caratula", caratula);
      }

      // Enviamos los datos a la API
      const response = await axios.post(`${API_BASE_URL}/api/juegos`, formData, {
        headers: {
          "Content-Type": "multipart/form-data", // Establecemos el tipo de contenido adecuado
        },
      });

      // Si la carga fue exitosa
      setMensaje("Juego cargado correctamente ✔️");
      setNombre("");
      setCaratula(null);
      setLink("");
      Swal.fire("Exito", "Juego cargado correctamente", "success");
    } catch (err) {
      console.error(err);
      setMensaje("Hubo un error al cargar el juego ❌");
      Swal.fire("Error", "No se pudo cargar el juego", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="py-10 flex justify-center">
      <div className="bg-white w-full max-w-md shadow-lg rounded-xl p-6">
        <h2 className="text-2xl font-bold mb-4 text-center">Cargar Nuevo Juego</h2>

        {/* Mensaje de confirmación o error */}
        {mensaje && (
          <p className="mb-4 text-center text-sm font-semibold">{mensaje}</p>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* Nombre del juego */}
          <div>
            <label className="font-semibold">Nombre del Juego</label>
            <input
              type="text"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              className="w-full mt-1 px-3 py-2 border rounded"
              placeholder="Ej: Mario Kart"
              required
            />
          </div>

          {/* Carátula (imagen) */}
          <div>
            <label className="font-semibold">Carátula (imagen)</label>
            <input
              type="file"
              accept="image/png, image/jpg, image/jpeg, image/webp"
              onChange={(e) => setCaratula(e.target.files[0])}
              className="w-full mt-1"
              required
            />
          </div>

          {/* Link del juego */}
          <div>
            <label className="font-semibold">Link</label>
            <input
              type="text"
              value={link}
              onChange={(e) => setLink(e.target.value)}
              className="w-full mt-1 px-3 py-2 border rounded"
              placeholder="https://ejemplo.com/juego"
              required
            />
          </div>

          {/* Botón para cargar el juego */}
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-500 transition disabled:bg-blue-300"
          >
            {loading ? "Cargando..." : "Cargar"}
          </button>
        </form>
      </div>
    </div>
  );
}

