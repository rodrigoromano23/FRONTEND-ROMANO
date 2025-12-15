import { useEffect, useState } from "react";
import axios from "axios";
import PieSenso from "../../components/charts/PieSenso";
import BarSenso from "../../components/charts/BarSenso";

const API_BASE_URL = import.meta.env.VITE_API_BASE || "https://backend-romano.onrender.com";
export default function SensoModal({ onClose }) {
  const [estadisticas, setEstadisticas] = useState(null);
  const [comparativa, setComparativa] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const [est, comp] = await Promise.all([
        axios.get(`${API_BASE_URL}/api/senso/estadisticas`), 
        axios.get(`${API_BASE_URL}/api/senso/comparativa`),
      ]);

      setEstadisticas(est.data);
      setComparativa(comp.data);
    };

    fetchData();
  }, []);

  return (
    <div className="fixed inset-2 bg-black/60 z-[10000] flex items-center justify-center">
      <div className="bg-gray-200 w-full max-w-2xl rounded-lg shadow-xl p-1 relative overflow-y-auto max-h-[90vh]">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-black"
        >
          ✕
        </button>

        <h2 className="text-2xl font-bold text-purple-700 mb-4">
        Senso - Datos
        </h2>

        {estadisticas && (
          <PieSenso data={estadisticas} />
        )}

        {comparativa.length > 1 && (
          <BarSenso data={comparativa} />
        )}
      </div>
    </div>
  );
}
