// src/components/Editor/EditorVideo.jsx
import { useState } from "react";

const EditorVideo = () => {
  const [videoLink, setVideoLink] = useState("");
  const [externalLink, setExternalLink] = useState("");
  const [section, setSection] = useState("quienes-somos");
  const [isPublishing, setIsPublishing] = useState(false);

  const publishVideo = async () => {
    if (!videoLink) {
      alert("Ingresa el link de YouTube antes de publicar");
      return;
    }

    setIsPublishing(true);

    try {
      const API_BASE_URL = import.meta.env.VITE_API_BASE || "https://backend-romano.onrender.com";

            const res = await fetch(`${API_BASE_URL}/api/editor/video`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          section,
          
          videoLink,
          externalLink
        }),
      });

      const data = await res.json();

      if (res.ok) {
        alert("Video publicado correctamente!");
        setVideoLink("");
        setExternalLink("");
      } else {
        alert("Error: " + data.message);
      }
    } catch (error) {
      console.error("Error publicando video:", error);
      alert("No se pudo publicar el video");
    }

    setIsPublishing(false);
  };

  return (
    <div className="flex flex-col gap-4">
      <label className="font-medium">Link de YouTube:</label>
      <input
        type="text"
        value={videoLink}
        onChange={(e) => setVideoLink(e.target.value)}
        className="border-2 p-2 rounded-lg w-full"
        placeholder="https://www.youtube.com/watch?v=..."
      />

      <label className="font-medium">Link externo (Drive, Mega, Mediafire):</label>
      <input
        type="text"
        value={externalLink}
        onChange={(e) => setExternalLink(e.target.value)}
        className="border-2 p-2 rounded-lg w-full"
        placeholder="https://..."
      />

      {/* Publicar */}
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
          onClick={publishVideo}
          disabled={isPublishing}
          className="ml-auto px-4 py-2 rounded bg-green-500 text-white hover:bg-green-600"
        >
          {isPublishing ? "Publicando..." : "Publicar"}
        </button>
      </div>
    </div>
  );
};

export default EditorVideo;
