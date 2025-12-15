import { useRef, useState } from "react";
import DesignEditor from "react-design-editor";

export default function EditorPublicacion() {
  const editorRef = useRef(null);
  const [titulo, setTitulo] = useState("");
  const [seccion, setSeccion] = useState("");

  const subirPublicacion = async () => {
    if (!editorRef.current) return;

    // Exportar imagen PNG como base64
    const dataUrl = await editorRef.current.exportToPNG();

    const body = {
      titulo,
      imagen: dataUrl,
      seccion
    };

    const API_BASE_URL = import.meta.env.VITE_API_BASE || "https://backend-romano.onrender.com";

    await fetch(`${API_BASE_URL}/publicaciones`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body)
    });

    alert("Publicación subida ✔️");
  };

  return (
    <div className="w-full flex flex-col gap-4 p-4 bg-gray-100">
      
      {/* Título */}
      <input
        className="border p-2 rounded"
        placeholder="Título de la publicación"
        value={titulo}
        onChange={(e) => setTitulo(e.target.value)}
      />

      {/* Selector de sección */}
      <select
        className="border p-2 rounded"
        value={seccion}
        onChange={(e) => setSeccion(e.target.value)}
      >
        <option value="">Subir a...</option>
        <option value="ProyectosFuturos">Proyectos Futuros</option>
        <option value="Talleres">Talleres</option>
        <option value="Salidas">Salidas</option>
        <option value="QuienesSomos">Quienes Somos</option>
      </select>

      {/* Editor */}
      <div className="border rounded h-[600px] bg-white">
        <DesignEditor ref={editorRef} />
      </div>

      {/* Botón subir */}
      <button
        onClick={subirPublicacion}
        className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
      >
        Exportar y Subir
      </button>
    </div>
  );
}
