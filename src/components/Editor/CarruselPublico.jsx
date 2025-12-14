// src/components/CarruselPublico.jsx
import { useState, useEffect } from "react";

const CarruselPublico = ({ images }) => {
  const [index, setIndex] = useState(0);

  // Animación automática
  useEffect(() => {
    if (!images || images.length === 0) return;
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 2500);
    return () => clearInterval(interval);
  }, [images]);

  const getIndex = (offset) => {
    if (!images || images.length === 0) return null;
    return (index + offset + images.length) % images.length;
  };

  if (!images || images.length === 0) return null;

  return (
    <div className="w-full h-[380px] bg-black flex justify-center items-center overflow-hidden rounded-xl shadow-xl">
      <div className="flex gap-10 items-center transition-all duration-700 ease-in-out">

        {/* Imagen izquierda */}
        <div
          className="
            w-[220px] h-[170px] opacity-60 blur-[1px]
            rounded-xl overflow-hidden
            shadow-[0_0_20px_rgba(0,150,255,0.7)]
            transition-all duration-700
          "
        >
          <img
            src={images[getIndex(-1)]}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Imagen central */}
        <div
          className="
            w-[380px] h-[300px] scale-110
            rounded-xl overflow-hidden
            shadow-[0_0_35px_rgba(0,180,255,1)]
            transition-all duration-700
          "
        >
          <img
            src={images[getIndex(0)]}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Imagen derecha */}
        <div
          className="
            w-[220px] h-[170px] opacity-60 blur-[1px]
            rounded-xl overflow-hidden
            shadow-[0_0_20px_rgba(0,150,255,0.7)]
            transition-all duration-700
          "
        >
          <img
            src={images[getIndex(1)]}
            className="w-full h-full object-cover"
          />
        </div>

      </div>
    </div>
  );
};

export default CarruselPublico;
