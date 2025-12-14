// src/components/Editor/EditorCarrusel.jsx
import { useState, useEffect } from "react";

const EditorCarrusel = () => {
  const [images, setImages] = useState([]);
  const [externalLink, setExternalLink] = useState("");
  const [section, setSection] = useState("quienes-somos");
  const [isPublishing, setIsPublishing] = useState(false);
  const [index, setIndex] = useState(0);

  // ===============================
  // ANIMACIÓN AUTOMÁTICA DEL CARRUSEL
  // ===============================
  useEffect(() => {
    if (images.length === 0) return;

    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 2500);

    return () => clearInterval(interval);
  }, [images]);

  const getIndex = (offset) => {
    if (images.length === 0) return null;
    return (index + offset + images.length) % images.length;
  };

  // ===============================
  // SUBIDA DE IMÁGENES
  // ===============================
  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);

    if (files.length + images.length > 8) {
      alert("Solo se permiten hasta 8 imágenes");
      return;
    }

    setImages((prev) => [...prev, ...files]);
  };

  const removeImage = (index) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const publishCarrusel = async () => {
    if (images.length === 0) {
      alert("Sube al menos una imagen");
      return;
    }

    setIsPublishing(true);

    try {
      const formData = new FormData();
      formData.append("section", section);
      formData.append("type", "carrusel");
      formData.append("externalLink", externalLink);

      images.forEach((img) => {
        formData.append("images", img);
      });

      const res = await fetch("http://localhost:4000/api/editor/carrusel", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (res.ok) {
        alert("Carrusel publicado correctamente!");
        setImages([]);
        setExternalLink("");
      } else {
        alert("Error: " + data.msg);
      }
    } catch (error) {
      console.error("❌ Error publicando carrusel:", error);
      alert("No se pudo publicar");
    }

    setIsPublishing(false);
  };

  return (
    <div className="flex flex-col gap-6">

      {/* ===============================
            PREVIEW DEL CARRUSEL ANIMADO
      =============================== */}
      {images.length > 0 && (
        <div className="w-full h-[380px] bg-black flex justify-center items-center overflow-hidden rounded-xl shadow-xl">
          <div className="flex gap-10 items-center transition-all duration-700 ease-in-out">

            {/* IZQUIERDA */}
            <div
              className="
                  w-[220px] h-[170px] opacity-60 blur-[1px]
                  rounded-xl overflow-hidden
                  shadow-[0_0_20px_rgba(0,150,255,0.7)]
                  transition-all duration-700
              "
            >
              <img
                src={URL.createObjectURL(images[getIndex(-1)])}
                className="w-full h-full object-cover"
              />
            </div>

            {/* CENTRAL */}
            <div
              className="
                w-[380px] h-[300px] scale-110
                rounded-xl overflow-hidden
                shadow-[0_0_35px_rgba(0,180,255,1)]
                transition-all duration-700
              "
            >
              <img
                src={URL.createObjectURL(images[getIndex(0)])}
                className="w-full h-full object-cover"
              />
            </div>

            {/* DERECHA */}
            <div
              className="
                  w-[220px] h-[170px] opacity-60 blur-[1px]
                  rounded-xl overflow-hidden
                  shadow-[0_0_20px_rgba(0,150,255,0.7)]
                  transition-all duration-700
              "
            >
              <img
                src={URL.createObjectURL(images[getIndex(1)])}
                className="w-full h-full object-cover"
              />
            </div>

          </div>
        </div>
      )}

      {/* ===============================
            PANEL DE SUBIDA
      =============================== */}
      <label className="font-medium">Subir imágenes (máx 8):</label>
      <input
        type="file"
        accept="image/*"
        multiple
        onChange={handleImageUpload}
        className="border p-2 rounded-lg"
      />

      <div className="flex flex-wrap gap-2 mt-2">
        {images.map((file, i) => (
          <div key={i} className="relative">
            <img
              src={URL.createObjectURL(file)}
              alt={`carrusel-${i}`}
              className="w-24 h-24 object-cover rounded"
            />
            <button
              onClick={() => removeImage(i)}
              className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
            >
              &times;
            </button>
          </div>
        ))}
      </div>

      <label className="font-medium mt-2">Link externo (Drive, Mega, Mediafire):</label>
      <input
        type="text"
        value={externalLink}
        onChange={(e) => setExternalLink(e.target.value)}
        className="border-2 p-2 rounded-lg w-full"
        placeholder="https://..."
      />

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
          onClick={publishCarrusel}
          disabled={isPublishing}
          className="ml-auto px-4 py-2 rounded bg-green-500 text-white hover:bg-green-600"
        >
          {isPublishing ? "Publicando..." : "Publicar"}
        </button>
      </div>

    </div>
  );
};

export default EditorCarrusel;
