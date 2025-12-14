import { useState } from "react";

export default function JuegosForm() {
  const [titulo, setTitulo] = useState("");
  const [imagen, setImagen] = useState("");
  const [link, setLink] = useState("");

  async function enviar(e) {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:4000/api/juegos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ titulo, imagen, link }),
      });

      const data = await res.json();
      console.log(data);

      alert("Juego cargado correctamente");
      setTitulo("");
      setImagen("");
      setLink("");

    } catch (error) {
      console.error(error);
      alert("Error subiendo el juego");
    }
  }

  return (
    <div className="p-6 bg-white shadow-lg rounded-xl max-w-xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">Cargar Juego</h1>

      <form onSubmit={enviar} className="flex flex-col gap-4">

        <input
          type="text"
          placeholder="Título del juego"
          value={titulo}
          onChange={e => setTitulo(e.target.value)}
          className="border p-2 rounded"
          required
        />

        <input
          type="text"
          placeholder="URL de la imagen"
          value={imagen}
          onChange={e => setImagen(e.target.value)}
          className="border p-2 rounded"
          required
        />

        <input
          type="text"
          placeholder="Enlace Netlify del juego"
          value={link}
          onChange={e => setLink(e.target.value)}
          className="border p-2 rounded"
          required
        />

        <button className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
          Guardar Juego
        </button>
      </form>
    </div>
  );
}
