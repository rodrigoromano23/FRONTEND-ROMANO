

//responsive===================================================================================

import { useState, useEffect } from "react";
import axios from "axios";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css"; // Importa los estilos de la librería
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

export default function SensoFormModal() {
  const [progress, setProgress] = useState(0); // Porcentaje de personas con discapacidad
  const [totalPersons, setTotalPersons] = useState(0); // Total de personas con discapacidad
  const [loading, setLoading] = useState(true);
  const [sensoData, setSensoData] = useState([]);
  const [selectedYear, setSelectedYear] = useState(null);

  // Obtener los datos de MongoDB cuando se abre el modal (llama a todos los registros del censo)
  useEffect(() => {
    const fetchSensoData = async () => {
      try {
            const API_BASE_URL = import.meta.env.VITE_API_BASE || "https://backend-romano.onrender.com";
            
            // Usar la URL base corregida
            const response = await axios.get(`${API_BASE_URL}/api/senso`); 
            // ----------------------------------------------------
            
            const data = response.data || [];

        // Si tienes datos, puedes seleccionar el primer año
        if (data.length > 0) {
          setSelectedYear(data[0].anio);
        }

        // Calcular el total de personas con discapacidad
        const disabilityCount = data.filter(person => person.discapacidadFisica?.tipo || person.discapacidadNeurologica?.tipo).length;
        setTotalPersons(disabilityCount);

        // Animar el gráfico de progreso (del 0% al total de personas con discapacidad)
        let currentProgress = 0;
        const interval = setInterval(() => {
          if (currentProgress < disabilityCount) {
            currentProgress++;
            setProgress(currentProgress);
          } else {
            clearInterval(interval);
          }
        }, 10); // Animación con intervalo de 10ms

      } catch (err) {
        console.error("Error cargando datos Senso:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchSensoData();
  }, []); // Este effect solo se ejecuta una vez cuando el componente se monta

  const handleYearChange = (direction) => {
    const currentIndex = sensoData.findIndex((data) => data.anio === selectedYear);
    let newIndex = currentIndex + direction;

    if (newIndex < 0) newIndex = sensoData.length - 1; // Si llegamos al primer año, vamos al último
    if (newIndex >= sensoData.length) newIndex = 0; // Si llegamos al último año, vamos al primero

    setSelectedYear(sensoData[newIndex]?.anio);
  };

  if (loading) {
    return <div className="flex justify-center mt-10 text-lg font-semibold">Cargando contenido de inicio...</div>; // Mientras se carga la información
  }

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-3xl font-bold mb-6 text-purple-700">Distribución de Discapacidades</h1>

      {/* Contenido principal: Gráfico y Lista de Referencias */}
      <div className="flex flex-col md:flex-row justify-between items-start">
        {/* Gráfico de Progreso */}
        <div className="w-full md:w-1/4 mb-6 md:mb-0">
          <div style={{ width: 150, height: 150 }} className="mb-4 mx-auto">
            <CircularProgressbar
              value={progress}
              text={`${progress}%`} // Muestra la cantidad de personas
              styles={{
                path: {
                  stroke: "#1671adff", // Color del progreso
                  strokeLinecap: "round",
                  strokeWidth: 10,
                },
                trail: {
                  stroke: "#e6e6e6", // Color de fondo del círculo
                  strokeWidth: 10,
                },
                text: {
                  fill: "#4db8ff", // Color del texto
                  fontSize: "14px", // Texto más pequeño
                },
              }}
            />
          </div>
        </div>

        {/* Referencias a la derecha */}
        <div className="w-full md:w-3/4 ml-6">
          <h3 className="font-bold text-lg mb-4">Referencias:</h3>

          {/* División en dos columnas: Física y Neurológica */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Columna para Discapacidades Físicas */}
            <div className="bg-blue-50 p-3 rounded-lg shadow-md text-xs">
              <h4 className="font-semibold text-sm mb-2">Discapacidades Físicas</h4>
              <ul>
                {["paralisis cerebral", "espina bifida", "amputacion", "artritis", "fibromialgia", "esclerosis multiple", "parkinson"].map((disability, index) => (
                  <li key={index} className="mb-1">
                    <strong className="text-xs">{disability}:</strong> {sensoData.filter(d => d.discapacidadFisica?.tipo === disability).length} persona(s)
                  </li>
                ))}
              </ul>
            </div>

            {/* Columna para Discapacidades Neurológicas */}
            <div className="bg-green-50 p-3 rounded-lg shadow-md text-xs">
              <h4 className="font-semibold text-sm mb-2">Discapacidades Neurológicas</h4>
              <ul>
                {["sindrome down", "autismo", "retraso madurativo", "epilepsia", "cerebro lesionado", "alzheimer", "esquizofrenia", "tdah"].map((disability, index) => (
                  <li key={index} className="mb-1">
                    <strong className="text-xs">{disability}:</strong> {sensoData.filter(d => d.discapacidadNeurologica?.tipo === disability).length} persona(s)
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Controles para cambiar de año */}
      <div className="flex justify-center mt-4 gap-4">
        <button
          onClick={() => handleYearChange(-1)}
          className="bg-purple-600 text-white px-4 py-2 rounded-l-lg hover:bg-purple-700 transition duration-300"
        >
          &lt; Anterior
        </button>
        <button
          onClick={() => handleYearChange(1)}
          className="bg-purple-600 text-white px-4 py-2 rounded-r-lg hover:bg-purple-700 transition duration-300"
        >
          Siguiente &gt;
        </button>
      </div>
    </div>
  );
}

