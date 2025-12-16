

import { useEffect, useState } from "react";
import CarruselPublico from "../../components/Editor/CarruselPublico";

export default function Inicio() {
  const [publicaciones, setPublicaciones] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(true);

  // Modal GIF (5 segundos)
  useEffect(() => {
    const timer = setTimeout(() => setShowModal(false), 5000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    async function cargar() {
      try {
        const API_BASE_URL = import.meta.env.VITE_API_BASE || "https://backend-romano.onrender.com";
            
        const res = await fetch(`${API_BASE_URL}/api/editor/inicio`);
        if (!res.ok) throw new Error("Error al cargar inicio");
        const data = await res.json();

        const canvas = Array.isArray(data.canvas) ? data.canvas : [];
        const editor = Array.isArray(data.editor) ? data.editor : [];

        const combinado = [...canvas, ...editor].sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );

        setPublicaciones(combinado);
      } catch (err) {
        setError("No se pudieron cargar los datos de inicio.");
      } finally {
        setLoading(false);
      }
    }

    cargar();
  }, []);

  if (loading) {
    return <div className="text-center mt-10 font-semibold">Cargando contenido...</div>;
  }

  if (error) {
    return <div className="text-center text-red-600 mt-10">{error}</div>;
  }

  return (
    <div className="p-4 sm:p-6">

      {/* ================= MODAL ================= */}
      {showModal && (
        <div className="fixed inset-0 bg-white/80 flex justify-center items-center z-50">
          <img
            src="/FONDO.gif"
            alt="Bienvenida"
            className="w-full max-w-md max-h-96 object-contain rounded-xl shadow-lg"
          />
        </div>
      )}

      {/* ================= GRID ================= */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">

        {publicaciones.map((pub) => (
          <div
            key={pub._id}
            className="bg-green-50 border border-green-200 rounded-2xl shadow-md p-4 flex flex-col justify-between"
          >
            {/* Canvas */}
            {pub.titulo && (
              <h2 className="text-xl font-bold text-green-800 mb-1">
                {pub.titulo}
              </h2>
            )}

            {pub.descripcion && (
              <p className="text-gray-700 mb-2">{pub.descripcion}</p>
            )}

            {pub.imageUrl && (
              <img
                src={pub.imageUrl}
                alt={pub.titulo || "Imagen"}
                className="w-full h-auto rounded-lg mb-3"
              />
            )}

            {/* Editor */}
            {pub.type === "texto" && pub.textContent && (
              <div
                className="text-sm text-gray-800"
                dangerouslySetInnerHTML={{ __html: pub.textContent }}
              />
            )}

            {pub.type === "video" && pub.videoLink && (
              <iframe
                src={pub.videoLink}
                title="Video"
                className="w-full aspect-video rounded-lg my-3"
                allowFullScreen
              />
            )}

            {pub.type === "carrusel" && Array.isArray(pub.images) && (
              <div className="my-3">
                <CarruselPublico images={pub.images} />
              </div>
            )}

            {/* Fecha */}
            <p className="text-xs text-gray-500 text-right mt-3">
              {new Date(pub.createdAt).toLocaleString()}
            </p>
          </div>
        ))}

      </div>

      {publicaciones.length === 0 && (
        <p className="text-center text-gray-500 mt-10 font-semibold">
          No hay contenido publicado aún.
        </p>
      )}
    </div>
  );
}


