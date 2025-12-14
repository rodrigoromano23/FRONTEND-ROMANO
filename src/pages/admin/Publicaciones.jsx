

//NUEVO CON SEGURIDAD

import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Swal from "sweetalert2";


export default function Publicaciones() {
  const [publicaciones, setPublicaciones] = useState([]);
  const [juegos, setJuegos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // ============================
  // CARGAR PUBLICACIONES
  // ============================
  useEffect(() => {
    async function cargar() {
      try {
        const res = await fetch("http://localhost:4000/api/editor/todas");
        if (!res.ok) throw new Error(`Error al cargar: ${res.status}`);

        const data = await res.json();

        const combinado = [
          ...(Array.isArray(data.canvas) ? data.canvas : []).map((p) => ({
            ...p,
            tipo: "canvas",
          })),
          ...(Array.isArray(data.editor) ? data.editor : []).map((p) => ({
            ...p,
            tipo: "editor",
          })),
        ].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

        setPublicaciones(combinado);
      } catch (err) {
        console.error(err);
        setError("No se pudieron cargar las publicaciones.");
        toast.error("Error al cargar publicaciones");
      } finally {
        setLoading(false);
      }
    }

    cargar();
  }, []);

  // ============================
  // CARGAR JUEGOS
  // ============================
  useEffect(() => {
    async function cargarJuegos() {
      try {
        const res = await fetch("http://localhost:4000/api/juegos");
        if (!res.ok) throw new Error("Error cargando juegos");

        const data = await res.json();
        setJuegos(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Error cargando juegos:", err);
        toast.error("Error al cargar juegos");
      }
    }

    cargarJuegos();
  }, []);

  // ============================
  // ELIMINAR PUBLICACION
  // ============================
    const eliminar = async (id, tipo) => {
    const result = await Swal.fire({
      title: "¿Seguro que querés eliminar esta publicación?",
      text: "Esta acción no se puede deshacer",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
    });

    if (!result.isConfirmed) return;

    try {
      const res = await fetch(`http://localhost:4000/api/editor/${tipo}/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error(`Error al eliminar: ${res.status}`);

      setPublicaciones((prev) => prev.filter((p) => p._id !== id));

      Swal.fire({
        title: "Eliminado",
        text: "La publicación fue eliminada correctamente",
        icon: "success",
        timer: 1500,
        showConfirmButton: false,
      });
    } catch (err) {
      console.error(err);

      Swal.fire({
        title: "Error",
        text: "No se pudo eliminar la publicación",
        icon: "error",
      });
    }
  };


  // ============================
  // ELIMINAR JUEGO
  // ============================
  const eliminarJuego = async (id) => {
  const result = await Swal.fire({
    title: "¿Seguro que querés eliminar este juego?",
    text: "Esta acción no se puede deshacer",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Sí, eliminar",
    cancelButtonText: "Cancelar",
    confirmButtonColor: "#d33",
    cancelButtonColor: "#3085d6",
  });

  if (!result.isConfirmed) return;

  try {
    const res = await fetch(`http://localhost:4000/api/juegos/${id}`, {
      method: "DELETE",
    });

    if (!res.ok) throw new Error("Error eliminando juego");

    setJuegos((prev) => prev.filter((j) => j._id !== id));

    Swal.fire({
      title: "Eliminado",
      text: "El juego fue eliminado correctamente",
      icon: "success",
      timer: 1500,
      showConfirmButton: false,
    });
  } catch (err) {
    console.error(err);

    Swal.fire({
      title: "Error",
      text: "No se pudo eliminar el juego",
      icon: "error",
    });
  }
};


  // ============================
  // RENDER
  // ============================
  if (loading)
    return (
      <div className="mt-10 text-center text-purple-600 font-semibold">
        Cargando publicaciones...
      </div>
    );

  if (error)
    return (
      <div className="mt-10 text-center text-red-500 font-bold">{error}</div>
    );

  return (
    <div className="p-8">
      {/* ============================
          PUBLICACIONES
      ============================ */}
      <h1 className="text-4xl font-bold mb-8 text-purple-700 drop-shadow-sm">
        Publicaciones
      </h1>

      {publicaciones.length === 0 && (
        <div className="text-gray-500 mb-10 text-center italic">
          No hay publicaciones cargadas.
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {publicaciones.map((pub) => (
          <div
            key={pub._id}
            className="
              rounded-2xl 
              shadow-md 
              bg-gradient-to-br from-purple-100 via-pink-100 to-blue-100 
              p-4 
              flex flex-col 
              border border-white/50
            "
          >
            {pub.imageUrl && (
              <img
                src={pub.imageUrl}
                alt={pub.titulo || "Publicación"}
                className="w-full h-40 object-cover rounded-xl shadow"
              />
            )}

            {pub.type === "video" && pub.videoLink && (
              <iframe
                width="100%"
                height="200"
                src={pub.videoLink}
                title="Video"
                frameBorder="0"
                allowFullScreen
                className="rounded-xl mt-2 shadow"
              ></iframe>
            )}

            <p className="mt-3 text-sm text-purple-800">
              <strong>Sección:</strong> {pub.section}
            </p>

            <button
              onClick={() => eliminar(pub._id, pub.tipo)}
              className="
                mt-4 px-4 py-2 
                bg-red-300 
                text-red-800 
                rounded-xl 
                hover:bg-red-400 
                transition shadow-sm
              "
            >
              Eliminar
            </button>
          </div>
        ))}
      </div>

      {/* ============================
          JUEGOS
      ============================ */}
      <h2 className="text-3xl font-bold mt-14 mb-6 text-blue-700 drop-shadow-sm">
        Juegos
      </h2>

      {juegos.length === 0 && (
        <p className="text-gray-500 italic">No hay juegos cargados.</p>
      )}

      {juegos.map((j) => (
        <div
          key={j._id}
          className="
            p-5 
            bg-gradient-to-r from-blue-100 via-purple-100 to-pink-100 
            shadow-md 
            rounded-xl 
            mb-4 
            flex items-center justify-between
            border border-white/60
          "
        >
          <div>
            <h3 className="text-xl font-semibold text-purple-700">{j.titulo}</h3>
            <a
              href={j.link}
              target="_blank"
              className="text-blue-600 underline hover:text-blue-700"
            >
              {j.link}
            </a>
          </div>

          <button
            onClick={() => eliminarJuego(j._id)}
            className="
              bg-red-300 
              text-red-800 
              px-4 py-2 
              rounded-xl 
              hover:bg-red-400 
              transition shadow-sm
            "
          >
            Eliminar
          </button>
        </div>
      ))}
    </div>
  );
}

