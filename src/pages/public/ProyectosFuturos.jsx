

//responsive===========================================================================

import { useEffect, useState } from "react";
import CarruselPublico from "../../components/Editor/CarruselPublico";

const API_BASE_URL = import.meta.env.VITE_API_BASE || "https://backend-romano.onrender.com";
export default function ProyectosFuturos() {
  const [publicaciones, setPublicaciones] = useState([]);

  useEffect(() => {
    async function cargar() {
      console.log("📡 Solicitando sección: proyectos-futuros");

      try {
        const res = await fetch(`${API_BASE_URL}/api/editor/section/proyectos-futuros`);

        console.log("🔎 Status:", res.status);

        const data = await res.json();
        console.log("📥 Datos recibidos del backend:", data);

        const canvas = Array.isArray(data.canvas) ? data.canvas : [];
        const editor = Array.isArray(data.editor) ? data.editor : [];

        const combinado = [...canvas, ...editor].sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );

        console.log("📌 Publicaciones combinadas:", combinado);

        setPublicaciones(combinado);

      } catch (err) {
        console.error("❌ Error cargando Proyectos Futuros:", err);
      }
    }

    cargar();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-4xl font-bold mb-6 text-center">Proyectos Futuros</h1>

      {publicaciones.map((pub) => (
        <div key={pub._id} className="mb-10 bg-white shadow-lg rounded-xl overflow-hidden">

          {/* TEXT */}
          {pub.type === "texto" && pub.textContent && (
            <div className="p-4 text-sm text-gray-800" dangerouslySetInnerHTML={{ __html: pub.textContent }} />
          )}

          {/* VIDEO */}
          {pub.type === "video" && pub.videoLink && (
            <div className="p-4">
              <iframe
                width="100%"
                height="315"
                src={pub.videoLink}
                title="Video"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="rounded-md"
              ></iframe>

              <p className="mt-2">
                <a href={pub.videoLink} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
                  Ver video en YouTube
                </a>
              </p>
            </div>
          )}

          {/* CARRUSEL */}
          {pub.type === "carrusel" && Array.isArray(pub.images) && (
            <div className="p-4">
              <CarruselPublico images={pub.images} />
            </div>
          )}

          {/* IMAGE AND TITLE */}
          {(pub.imageUrl || pub.titulo || pub.descripcion) && (
            <div className="p-4">
              {pub.titulo && <h2 className="text-2xl font-semibold">{pub.titulo}</h2>}
              {pub.descripcion && <p className="text-gray-700">{pub.descripcion}</p>}
              {pub.imageUrl && (
                <img
                  src={pub.imageUrl}
                  className="w-full h-auto mt-2 rounded-md"
                  alt={pub.titulo || "Imagen del proyecto"}
                />
              )}
            </div>
          )}

          {/* DATE */}
          <p className="text-sm text-gray-500 text-right p-2">
            {pub.createdAt ? new Date(pub.createdAt).toLocaleString() : ""}
          </p>
        </div>
      ))}
    </div>
  );
}



