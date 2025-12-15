import { useState } from "react";
import CanvasEditor from "../../components/Editor/CanvasEditor";
import EditorTexto from "../../components/Editor/EditorTexto";
import EditorVideo from "../../components/Editor/EditorVideo";
import EditorCarrusel from "../../components/Editor/EditorCarrusel";
const API_BASE_URL = import.meta.env.VITE_API_BASE || "https://backend-romano.onrender.com";

export default function AdminSecciones() {
  const [showEditor, setShowEditor] = useState(false);
  const [editorType, setEditorType] = useState("canvas"); // "canvas", "texto", "video", "carrusel"
  const [exportedImage, setExportedImage] = useState(null);

  const handleExport = (imgBase64) => {
    setExportedImage(imgBase64);
  };

  const subirPublicacion = async (seccion) => {
    if (editorType === "canvas" && !exportedImage) {
      alert("Primero exporta la imagen");
      return;
    }

    // Aquí podrías agregar lógica para los otros tipos (texto, video, carrusel)
    try {
      const res = await fetch(`${API_BASE_URL}/api/publicaciones2`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          section: seccion,
          type: editorType,
          content: editorType === "canvas" ? exportedImage : null,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        alert("Publicación subida correctamente!");
        setShowEditor(false);
        setExportedImage(null);
      } else {
        alert("Error: " + data.msg);
      }
    } catch (error) {
      console.error("Error subiendo publicación:", error);
      alert("No se pudo subir la publicación");
    }
  };

  return (
    <div className="p-6 flex flex-col gap-6">
      {/* ENCABEZADO */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-700">
          Administrar Secciones
        </h1>

        <div className="flex gap-2">
          <button
            onClick={() => { setShowEditor(true); setEditorType("canvas"); }}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
          >
            Crear
          </button>
          <button
            onClick={() => { setShowEditor(true); setEditorType("texto"); }}
            className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg"
          >
            Texto
          </button>
          <button
            onClick={() => { setShowEditor(true); setEditorType("video"); }}
            className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg"
          >
            Video
          </button>
          <button
            onClick={() => { setShowEditor(true); setEditorType("carrusel"); }}
            className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg"
          >
            Carrusel
          </button>
        </div>
      </div>

      {/* EDITOR */}
      {showEditor && (
        <div className="p-4 bg-white rounded-xl shadow-xl flex flex-col gap-4">
          <h2 className="text-xl font-semibold text-gray-700">
            Editor de Publicaciones
          </h2>

          {editorType === "canvas" && <CanvasEditor onExport={handleExport} />}
          {editorType === "texto" && <EditorTexto />}
          {editorType === "video" && <EditorVideo />}
          {editorType === "carrusel" && <EditorCarrusel />}
        </div>
      )}
    </div>
  );
}
