

//responsive==================================================================

import { useEffect, useState } from "react";
import CarruselPublico from "../../components/Editor/CarruselPublico";

export default function Inicio() {
  const [canvasActual, setCanvasActual] = useState(null);
  const [editorActual, setEditorActual] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Modal GIF (5 segundos)
  const [showModal, setShowModal] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowModal(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    async function cargar() {
      try {
        // ----------------------------------------------------
            // 💡 CORRECCIÓN CLAVE: Usar variable de entorno de Render
            // ----------------------------------------------------
            const API_BASE_URL = import.meta.env.VITE_API_BASE || "https://backend-romano.onrender.com";
            
            const res = await fetch(`${API_BASE_URL}/api/editor/inicio`);
            // ----------------------------------------------------

            if (!res.ok) throw new Error(`Error al cargar: ${res.status}`);
            const data = await res.json();

            setCanvasActual(data.canvasActual || null);
            setEditorActual(data.editorActual || null);
        } catch (err) {
            console.error(err);
            setError("No se pudieron cargar los datos de inicio.");
        } finally {
            setLoading(false);
        }
    }

    cargar();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center mt-10 text-lg font-semibold">
        Cargando contenido de inicio...
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-600 mt-10 font-semibold">{error}</div>
    );
  }

  return (
    <div className="p-6 space-y-10">

      {/* ================= MODAL GIF ================= */}
      {showModal && (
        <div className="fixed inset-0 bg-white/75 flex justify-center items-center z-50">
          <div className="bg-transparent p-0 rounded-xl shadow-xl animate-fadeIn">
            <img
              src="/FONDO.gif"   // <-- CAMBIAR RUTA AQUÍ
              alt="Gif de bienvenida"
              className="w-full h-auto max-w-full max-h-96 object-cover rounded"
            />
          </div>
        </div>
      )}

      {/* ==================== PUBLICACION CANVAS ==================== */}
      {canvasActual && (
        <div className="border rounded-xl shadow bg-white p-4">
          {canvasActual.titulo && (
            <h2 className="text-2xl font-semibold">{canvasActual.titulo}</h2>
          )}
          {canvasActual.descripcion && (
            <p className="text-gray-700 mt-2">{canvasActual.descripcion}</p>
          )}
          {canvasActual.imageUrl && (
            <img
              src={canvasActual.imageUrl}
              alt={canvasActual.titulo || "Canvas"}
              className="w-full h-auto mt-4 rounded"
            />
          )}
          <p className="text-sm text-gray-500 text-right mt-2">
            {canvasActual.createdAt
              ? new Date(canvasActual.createdAt).toLocaleString()
              : ""}
          </p>
        </div>
      )}

      {/* ==================== PUBLICACION EDITOR ==================== */}
      {editorActual && (
        <div className="border rounded-xl shadow bg-white p-4">
          {editorActual.type === "texto" && editorActual.textContent && (
            <div dangerouslySetInnerHTML={{ __html: editorActual.textContent }} />
          )}

          {editorActual.type === "video" && editorActual.videoLink && (
            <iframe
              width="100%"
              height="315"
              src={editorActual.videoLink}
              title="Video"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="mt-4 rounded"
            ></iframe>
          )}

          {editorActual.type === "carrusel" &&
            Array.isArray(editorActual.images) && (
              <div className="mt-4">
                <CarruselPublico images={editorActual.images} />
              </div>
            )}

          <p className="text-sm text-gray-500 text-right mt-2">
            {editorActual.createdAt
              ? new Date(editorActual.createdAt).toLocaleString()
              : ""}
          </p>
        </div>
      )}

      {!canvasActual && !editorActual && (
        <p className="text-center text-gray-500 font-semibold">
          No hay contenido publicado aún.
        </p>
      )}
    </div>
  );
}

