// src/data/plantillasData.js

const plantillasData = Array.from({ length: 32 }, (_, i) => {
  const num = String(i + 1).padStart(2, "0");

  return {
    id: i + 1,
    name: `Plantilla ${i + 1}`,
    image: `/plantillas/plantilla_${num}.jpg`,
  };
});

export default plantillasData;
