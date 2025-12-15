// src/components/Editor/EditorTexto.jsx
import { useState, useRef } from "react";

const EditorTexto = () => {
  const [textContent, setTextContent] = useState("");
  const [section, setSection] = useState("quienes-somos");
  const [isPublishing, setIsPublishing] = useState(false);
  const editorRef = useRef(null);

  const execCommand = (command, value = null) => {
    document.execCommand(command, false, value);
    setTextContent(editorRef.current.innerHTML);
  };

  const handleChange = () => {
    setTextContent(editorRef.current.innerHTML);
  };

  const publishText = async () => {
    if (!textContent.trim()) {
      alert("Escribe algo antes de publicar");
      return;
    }

    setIsPublishing(true);

    try {
      const API_BASE_URL = import.meta.env.VITE_API_BASE || "https://backend-romano.onrender.com";
            
            const res = await fetch(`${API_BASE_URL}/api/editor/texto`, {
            // ------------------------------------------------------------------
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    content: textContent,
                    section,
                }),
            });
      const data = await res.json();
      console.log(data);

      if (res.ok) {
        alert("Texto publicado correctamente!");
        setTextContent("");
        editorRef.current.innerHTML = "";
      } else {
        alert("Error: " + (data.msg || "Error desconocido"));
      }
    } catch (error) {
      console.error("Error publicando:", error);
      alert("No se pudo publicar el texto");
    }

    setIsPublishing(false);
  };

  return (
    <div className="flex flex-col gap-4">
      {/* === Toolbar === */}
      <div className="flex flex-wrap gap-2 mb-2">
        <select onChange={(e) => execCommand("fontName", e.target.value)} className="border rounded px-1">
          <option value="Arial">Arial</option>
          <option value="Times New Roman">Times New Roman</option>
          <option value="Verdana">Verdana</option>
          <option value="Tahoma">Tahoma</option>
          <option value="Courier New">Courier New</option>
        </select>

        <select onChange={(e) => execCommand("fontSize", e.target.value)} className="border rounded px-1">
          <option value="1">8px</option>
          <option value="2">10px</option>
          <option value="3">12px</option>
          <option value="4">14px</option>
          <option value="5">18px</option>
          <option value="6">24px</option>
          <option value="7">32px</option>
        </select>

        <input
          type="color"
          onChange={(e) => execCommand("foreColor", e.target.value)}
          className="w-10 h-8 p-0 border rounded"
          title="Color de texto"
        />

        <button onClick={() => execCommand("bold")} className="px-2 py-1 border rounded font-bold">B</button>
        <button onClick={() => execCommand("italic")} className="px-2 py-1 border rounded italic">I</button>
        <button onClick={() => execCommand("underline")} className="px-2 py-1 border rounded underline">U</button>

        <button onClick={() => execCommand("justifyLeft")} className="px-2 py-1 border rounded">Izq</button>
        <button onClick={() => execCommand("justifyCenter")} className="px-2 py-1 border rounded">Cen</button>
        <button onClick={() => execCommand("justifyRight")} className="px-2 py-1 border rounded">Der</button>
      </div>

      {/* === Editor === */}
      <div
        ref={editorRef}
        contentEditable
        onInput={handleChange}
        className="border-2 p-4 rounded-lg w-full h-64 overflow-auto bg-white"
        placeholder="Escribe aquí..."
        style={{ minHeight: "200px" }}
      ></div>

      {/* === Publicar === */}
      <div className="mt-3 flex items-center gap-3">
        <label className="font-medium">Publicar en:</label>

        <select
          value={section}
          onChange={(e) => setSection(e.target.value)}
          className="border rounded px-2 py-1"
        >
          <option value="quienes-somos">Quienes Somos</option>
          <option value="talleres">Talleres</option>
          <option value="salidas">Salidas</option>
          <option value="proyectos-futuros">Proyectos Futuros</option>
        </select>

        <button
          onClick={publishText}
          disabled={isPublishing}
          className="ml-auto px-4 py-2 rounded bg-green-500 text-white hover:bg-green-600"
        >
          {isPublishing ? "Publicando..." : "Publicar"}
        </button>
      </div>
    </div>
  );
};

export default EditorTexto;

