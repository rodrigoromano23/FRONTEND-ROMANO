

//responsive==========================================================================

import { useEffect, useState } from "react";

export default function Juegos() {
  const [juegos, setJuegos] = useState([]);

  useEffect(() => {
    async function cargar() {
      const res = await fetch("http://localhost:4000/api/juegos");
      const data = await res.json();
      setJuegos(data);
    }
    cargar();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-4xl font-bold mb-10 text-center">Juegos Educativos</h1>

      {/* GRID mejorado */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {juegos.map(j => (
          <div
            key={j._id}
            className="bg-white shadow-xl rounded-xl overflow-hidden transform hover:scale-105 hover:shadow-2xl transition duration-300"
          >
            {/* Imagen clickeable */}
            <a
              href={j.link}
              target="_blank"
              rel="noopener noreferrer"
              className="block"
            >
              <div className="overflow-hidden">
                <img
                  src={j.imagen}
                  alt={j.titulo}
                  className="w-full h-56 object-cover transform hover:scale-110 transition duration-500"
                />
              </div>
            </a>

            {/* Título */}
            <div className="p-4 text-center">
              <p className="font-semibold text-lg text-gray-800">{j.titulo}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}


