import { useEffect, useRef, useState } from "react";
import { fabric } from "fabric";

export default function CanvasEditor() {
  const canvasRef = useRef(null);
  const fabricCanvas = useRef(null);

  const [color, setColor] = useState("#ff0000");
  const [borderColor, setBorderColor] = useState("#000000");
  const [text, setText] = useState("");
  const [fontSize, setFontSize] = useState(32);
  const [fontFamily, setFontFamily] = useState("Arial");
  const [bold, setBold] = useState(false);
  const [italic, setItalic] = useState(false);
  const [underline, setUnderline] = useState(false);
  const [section, setSection] = useState("quienes-somos");
  const [isPublishing, setIsPublishing] = useState(false);

  // CONFIG CLOUDINARY
  const CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
  const UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;


  useEffect(() => {
    const c = new fabric.Canvas(canvasRef.current, {
      width: 900,
      height: 600,
      backgroundColor: "#ffffff",
      preserveObjectStacking: true,
    });
    fabricCanvas.current = c;

    const rect = new fabric.Rect({
      width: 120,
      height: 120,
      fill: "red",
      left: 50,
      top: 50,
      selectable: true,
    });
    c.add(rect);

    return () => {
      c.dispose();
      fabricCanvas.current = null;
    };
  }, []);

  // ➤ AGREGAR TEXTO
  const addText = () => {
    if (!text.trim()) return;
    const textbox = new fabric.Textbox(text, {
      left: 100,
      top: 100,
      fontSize,
      fontFamily,
      fill: color,
      fontWeight: bold ? "bold" : "normal",
      fontStyle: italic ? "italic" : "normal",
      underline,
      editable: true,
    });
    fabricCanvas.current.add(textbox);
    fabricCanvas.current.setActiveObject(textbox);
    fabricCanvas.current.renderAll();
    setText("");
  };

  // ➤ CAMBIAR COLOR / BORDE
  const changeColor = () => {
    const obj = fabricCanvas.current.getActiveObject();
    if (obj?.set) {
      obj.set("fill", color);
      fabricCanvas.current.renderAll();
    }
  };

  const changeBorderColor = () => {
    const obj = fabricCanvas.current.getActiveObject();
    if (obj?.set) {
      obj.set("stroke", borderColor);
      obj.setCoords();
      fabricCanvas.current.renderAll();
    }
  };

  // ➤ FIGURAS
  const addShape = (type) => {
    let shape;
    switch (type) {
      case "rect":
        shape = new fabric.Rect({
          width: 100,
          height: 100,
          fill: color,
          stroke: borderColor,
          strokeWidth: 3,
          left: 50,
          top: 50,
        });
        break;
      case "circle":
        shape = new fabric.Circle({
          radius: 50,
          fill: color,
          stroke: borderColor,
          strokeWidth: 3,
          left: 50,
          top: 50,
        });
        break;
      case "triangle":
        shape = new fabric.Triangle({
          width: 100,
          height: 100,
          fill: color,
          stroke: borderColor,
          strokeWidth: 3,
          left: 50,
          top: 50,
        });
        break;
      default:
        return;
    }

    fabricCanvas.current.add(shape);
    fabricCanvas.current.setActiveObject(shape);
    fabricCanvas.current.renderAll();
  };

  // ➤ SUBIR IMAGEN A CANVAS
  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const dataURL = event.target.result;
      const imgElement = new Image();
      imgElement.src = dataURL;
      imgElement.crossOrigin = "anonymous";

      imgElement.onload = () => {
        const imgInstance = new fabric.Image(imgElement, {
          left: 100,
          top: 100,
          selectable: true,
        });

        if (imgInstance.width && imgInstance.width > 600)
          imgInstance.scaleToWidth(600);

        imgInstance.setCoords();
        fabricCanvas.current.add(imgInstance);
        fabricCanvas.current.setActiveObject(imgInstance);
        fabricCanvas.current.renderAll();
      };
    };
    reader.readAsDataURL(file);
  };

  // ➤ BORRAR SELECCIONADO
  const deleteSelected = () => {
    const obj = fabricCanvas.current.getActiveObject();
    if (obj) {
      fabricCanvas.current.remove(obj);
      fabricCanvas.current.discardActiveObject();
      fabricCanvas.current.renderAll();
    }
  };

  // --------------------------------------------------------
  // 1️⃣ Convierte canvas a Blob
  // --------------------------------------------------------
  const canvasToBlob = () => {
    return new Promise((resolve) => {
      fabricCanvas.current.toCanvasElement().toBlob((blob) => {
        resolve(blob);
      }, "image/png");
    });
  };

  // --------------------------------------------------------
  // 2️⃣ Sube a Cloudinary
  // --------------------------------------------------------
  const uploadToCloudinary = async (blob) => {
    const formData = new FormData();
    formData.append("file", blob);
    formData.append("upload_preset", UPLOAD_PRESET);

    const res = await fetch(
      `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
      {
        method: "POST",
        body: formData,
      }
    );

    const data = await res.json();
    console.log("📤 CLOUDINARY:", data);

    return data.secure_url;
  };

  // --------------------------------------------------------
  // 3️⃣ Enviar a BACKEND
  // --------------------------------------------------------
  const sendToBackend = async (imageUrl) => {
    // Corregimos la variable de entorno y el valor de fallback
    const API_BASE_URL = import.meta.env.VITE_API_BASE || "https://backend-romano.onrender.com"; // 

    const res = await fetch(`${API_BASE_URL}/api/editor/canvas`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        section,
        imageUrl,
        // opcional
        titulo: "",
        descripcion: "",
      }),
    });

    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(`Error al publicar: ${res.status} - ${errorText}`);
    }

    const data = await res.json();
    console.log("📥 BACKEND:", data);

    return data;
  };

  // --------------------------------------------------------
  // PUBLICAR FINAL
  // --------------------------------------------------------
  const publishCanvas = async () => {
    if (!fabricCanvas.current) return alert("Canvas no listo");
    if (!section) return alert("Seleccioná una sección");

    setIsPublishing(true);

    try {
      const blob = await canvasToBlob();
      const cloudinaryUrl = await uploadToCloudinary(blob);
      await sendToBackend(cloudinaryUrl);

      alert("Publicación creada correctamente");

      // limpiar
      fabricCanvas.current.clear();
      fabricCanvas.current.setBackgroundColor(
        "#ffffff",
        fabricCanvas.current.renderAll.bind(fabricCanvas.current)
      );
    } catch (err) {
      console.error(err);
      alert("Error al publicar");
    } finally {
      setIsPublishing(false);
    }
  };

  return (
    <div className="p-4">
      {/* HERRAMIENTAS */}
      <div className="flex flex-wrap gap-4 mb-4 items-center">
        {/* Texto */}
        <input
          type="text"
          placeholder="Texto..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="border rounded px-2 py-1"
        />

        <select
          value={fontFamily}
          onChange={(e) => setFontFamily(e.target.value)}
          className="border rounded px-2 py-1"
        >
          <option value="Arial">Arial</option>
          <option value="Courier New">Courier New</option>
          <option value="Times New Roman">Times New Roman</option>
          <option value="Verdana">Verdana</option>
        </select>

        <input
          type="number"
          min={8}
          max={100}
          value={fontSize}
          onChange={(e) => setFontSize(parseInt(e.target.value))}
          className="border rounded px-2 py-1 w-20"
        />

        <button onClick={() => setBold(!bold)} className="px-2 py-1 font-bold border rounded">
          {bold ? "B✓" : "B"}
        </button>
        <button onClick={() => setItalic(!italic)} className="px-2 py-1 italic border rounded">
          {italic ? "I✓" : "I"}
        </button>
        <button onClick={() => setUnderline(!underline)} className="px-2 py-1 border rounded">
          {underline ? "U✓" : "U"}
        </button>

        <input
          type="color"
          value={color}
          onChange={(e) => setColor(e.target.value)}
          className="w-10 h-8"
        />

        <button
          onClick={addText}
          className="px-3 py-1 rounded border bg-blue-500 text-white hover:bg-blue-600"
        >
          Agregar texto
        </button>

        {/* Figuras */}
        <button
          onClick={() => addShape("rect")}
          className="px-3 py-1 rounded border bg-gray-200 hover:bg-gray-300"
        >
          Rect
        </button>
        <button
          onClick={() => addShape("circle")}
          className="px-3 py-1 rounded border bg-gray-200 hover:bg-gray-300"
        >
          Círculo
        </button>
        <button
          onClick={() => addShape("triangle")}
          className="px-3 py-1 rounded border bg-gray-200 hover:bg-gray-300"
        >
          Triángulo
        </button>

        <label className="flex items-center gap-1">
          Borde
          <input
            type="color"
            value={borderColor}
            onChange={(e) => setBorderColor(e.target.value)}
            className="w-10 h-8"
          />
        </label>

        <button
          onClick={changeColor}
          className="px-3 py-1 rounded border bg-gray-100 hover:bg-gray-200"
        >
          Aplicar color
        </button>

        <button
          onClick={changeBorderColor}
          className="px-3 py-1 rounded border bg-gray-100 hover:bg-gray-200"
        >
          Aplicar borde
        </button>

        {/* Imagen */}
        <label className="px-3 py-1 rounded border bg-white cursor-pointer">
          Cargar imagen
          <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
        </label>

        {/* Eliminar */}
        <button
          onClick={deleteSelected}
          className="px-3 py-1 rounded border bg-red-500 text-white hover:bg-red-600"
        >
          Eliminar
        </button>
      </div>

      {/* CANVAS */}
      <canvas
        ref={canvasRef}
        width={900}
        height={600}
        className="border rounded shadow"
        style={{ display: "block", maxWidth: "100%" }}
      />

      {/* PUBLICAR */}
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
          onClick={publishCanvas}
          disabled={isPublishing}
          className="ml-auto px-4 py-2 rounded bg-green-500 text-white hover:bg-green-600"
        >
          {isPublishing ? "Publicando..." : "Publicar"}
        </button>
      </div>
    </div>
  );
}



