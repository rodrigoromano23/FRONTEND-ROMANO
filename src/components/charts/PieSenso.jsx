

//responsive===================================================================================

import { useEffect, useState } from "react";
import axios from "axios";
import { PieChart, Pie, Cell, Tooltip } from "recharts";

const COLORS = [
  "#6366f1", "#22c55e", "#f59e0b", "#ef4444",
  "#14b8a6", "#8b5cf6", "#ec4899", "#0ea5e9"
];

//  total helper
const calcularTotal = (data) =>
  data.reduce((acc, item) => acc + item.value, 0);

//  Tooltip con porcentaje
function TooltipPorcentaje({ active, payload, total }) {
  if (active && payload && payload.length) {
    const { name, value } = payload[0];
    const porcentaje = ((value / total) * 100).toFixed(1);

    return (
      <div className="bg-white border rounded px-3 py-2 shadow text-sm">
        <p className="font-semibold">{name}</p>
        <p>{value} persona(s)</p>
        <p className="text-purple-600 font-bold">{porcentaje}%</p>
      </div>
    );
  }
  return null;
}

export default function SensoFormModal() {
  const [loading, setLoading] = useState(true);
  const [fisicas, setFisicas] = useState([]);
  const [neuro, setNeuro] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const API_BASE_URL = import.meta.env.VITE_API_BASE || "https://backend-romano.onrender.com";
        const response = await axios.get(`${API_BASE_URL}/api/senso`);
        const data = response.data || [];

        const fisicasMap = {};
        const neuroMap = {};

        data.forEach(p => {
          if (p.discapacidadFisica?.tipo) {
            fisicasMap[p.discapacidadFisica.tipo] =
              (fisicasMap[p.discapacidadFisica.tipo] || 0) + 1;
          }
          if (p.discapacidadNeurologica?.tipo) {
            neuroMap[p.discapacidadNeurologica.tipo] =
              (neuroMap[p.discapacidadNeurologica.tipo] || 0) + 1;
          }
        });

        setFisicas(
          Object.entries(fisicasMap).map(([name, value]) => ({ name, value }))
        );
        setNeuro(
          Object.entries(neuroMap).map(([name, value]) => ({ name, value }))
        );

      } catch (err) {
        console.error("Error cargando censo", err);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center py-20 text-lg font-semibold">
        Cargando datos del censo...
      </div>
    );
  }

  const totalFisicas = calcularTotal(fisicas);
  const totalNeuro = calcularTotal(neuro);

  return (
    <div className="max-w-7xl mx-auto bg-white p-6 rounded-2xl shadow-xl">
      <h2 className="text-3xl font-bold text-center mb-10 text-purple-700">
        Distribución de Discapacidades
      </h2>

      <div className="grid grid-cols-1 xl:grid-cols-4 gap-6 items-center">

        {/* LISTA FÍSICAS */}
        <div className="bg-blue-50 p-4 rounded-xl shadow text-sm">
          <h3 className="font-bold text-blue-700 mb-3">Físicas</h3>
          {fisicas.map((f, i) => (
            <p key={i} className="flex items-center gap-2 mb-1">
              <span
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: COLORS[i % COLORS.length] }}
              />
              {f.name}: <strong>{f.value}</strong>
            </p>
          ))}
        </div>

        {/* DONUT FÍSICAS */}
        <div className="flex justify-center">
          <PieChart width={220} height={220}>
            <Pie
              data={fisicas}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={90}
            >
              {fisicas.map((_, i) => (
                <Cell key={i} fill={COLORS[i % COLORS.length]} />
              ))}
            </Pie>

            <Tooltip
              content={<TooltipPorcentaje total={totalFisicas} />}
            />
          </PieChart>
        </div>

        {/* DONUT NEUROLÓGICAS */}
        <div className="flex justify-center">
          <PieChart width={220} height={220}>
            <Pie
              data={neuro}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={90}
            >
              {neuro.map((_, i) => (
                <Cell key={i} fill={COLORS[i % COLORS.length]} />
              ))}
            </Pie>

            <Tooltip
              content={<TooltipPorcentaje total={totalNeuro} />}
            />
          </PieChart>
        </div>

        {/* LISTA NEUROLÓGICAS */}
        <div className="bg-green-50 p-4 rounded-xl shadow text-sm">
          <h3 className="font-bold text-green-700 mb-3">Neurológicas</h3>
          {neuro.map((n, i) => (
            <p key={i} className="flex items-center gap-2 mb-1">
              <span
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: COLORS[i % COLORS.length] }}
              />
              {n.name}: <strong>{n.value}</strong>
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}
