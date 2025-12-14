import { useState, useCallback } from "react";
import { createEditor } from "slate";
import { Slate, Editable, withReact } from "slate-react";

export default function EditorTexto() {
  const [editor] = useState(() => withReact(createEditor()));
  const [value, setValue] = useState([
    { type: "paragraph", children: [{ text: "" }] }
  ]);
  const [section, setSection] = useState("quienes-somos");
  const [isPublishing, setIsPublishing] = useState(false);

  const publishTexto = useCallback(async () => {
    setIsPublishing(true);
    try {
      const textContent = JSON.stringify(value);

      const res = await fetch("http://localhost:4000/api/editores", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          section,
          type: "texto",
          textContent,
        }),
      });

      const data = await res.json();
      if (res.ok) {
        alert("Publicación de texto creada correctamente");
        setValue([{ type: "paragraph", children: [{ text: "" }] }]);
      } else {
        alert("Error: " + data.msg);
      }
    } catch (err) {
      console.error(err);
      alert("No se pudo crear la publicación");
    } finally {
      setIsPublishing(false);
    }
  }, [value, section]);

  return (
    <div className="p-6 flex flex-col gap-4">
      <h1 className="text-2xl font-bold">Editor de Texto</h1>

      <div className="flex gap-3 items-center">
        <label>Publicar en:</label>
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
          onClick={publishTexto}
          disabled={isPublishing}
          className="ml-auto px-4 py-2 rounded bg-green-500 text-white hover:bg-green-600"
        >
          {isPublishing ? "Publicando..." : "Publicar"}
        </button>
      </div>

      <div className="border rounded p-2 mt-4" style={{ minHeight: "400px" }}>
        <Slate editor={editor} value={value} onChange={setValue}>
          <Editable
            placeholder="Escribí tu contenido aquí..."
            spellCheck
            autoFocus
            style={{ minHeight: "350px" }}
          />
        </Slate>
      </div>
    </div>
  );
}
