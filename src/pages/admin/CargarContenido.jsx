import { useState, useEffect } from "react";
import api from "../../services/api";
import { toast } from "react-toastify";

const templates = [
  { id:1, name:"Plantilla A" },
  { id:2, name:"Plantilla B" },
  { id:3, name:"Plantilla C" },
  { id:4, name:"Plantilla D" }
];

export default function CargarContenido() {
  const [tipo, setTipo] = useState("quienes");
  const [titulo, setTitulo] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [links, setLinks] = useState("");
  const [media, setMedia] = useState([]);
  const [plantilla, setPlantilla] = useState(1);

  const handleFiles = (e) => setMedia(Array.from(e.target.files));

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const fd = new FormData();
      fd.append("tipo", tipo);
      fd.append("titulo", titulo);
      fd.append("descripcion", descripcion);
      fd.append("plantilla", plantilla);
      fd.append("links", JSON.stringify(links ? links.split(",").map(l=>l.trim()) : []));
      media.forEach(f => fd.append("media", f));
      await api.post("/sections", fd, { headers: { "Content-Type": "multipart/form-data" } });
      toast.success("Contenido subido");
      setTitulo(""); setDescripcion(""); setMedia([]); setLinks("");
    } catch (err) {
      toast.error("Error al subir");
    }
  };

  return (
    <div className="py-6">
      <h2 className="text-2xl font-bold mb-4">Cargar Información</h2>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-4 rounded shadow space-y-3">
          <label className="block">Sección:
            <select value={tipo} onChange={e=>setTipo(e.target.value)} className="border p-2 w-full">
              <option value="quienes">Quienes Somos</option>
              <option value="talleres">Talleres</option>
              <option value="salidas">Salidas</option>
              <option value="juegos">Juegos</option>
              <option value="proyectos">Proyectos Futuros</option>
            </select>
          </label>

          <input value={titulo} onChange={e=>setTitulo(e.target.value)} placeholder="Escriba aquí el título" className="border p-2 w-full" />
          <textarea value={descripcion} onChange={e=>setDescripcion(e.target.value)} placeholder="Escriba aquí el texto" className="border p-2 w-full" rows={6} />
          <label className="block">Suba imágenes/videos:
            <input onChange={handleFiles} multiple type="file" accept="image/*,video/*" className="mt-1" />
          </label>
          <input value={links} onChange={e=>setLinks(e.target.value)} placeholder="Pegue aquí links separados por coma" className="border p-2 w-full" />
          <div>
            <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Cargar</button>
          </div>
        </div>

        <aside className="bg-white p-4 rounded shadow">
          <h3 className="font-semibold mb-3">Elija plantilla</h3>
          <div className="grid grid-cols-2 gap-3">
            {templates.map(t => (
              <div key={t.id} onClick={()=>setPlantilla(t.id)} className={`p-3 border rounded cursor-pointer ${plantilla===t.id?'border-blue-600':''}`}>
                <p className="font-medium">{t.name}</p>
                <div className="mt-2 h-16 bg-gray-100 rounded" />
              </div>
            ))}
          </div>
        </aside>
      </form>
    </div>
  );
}
