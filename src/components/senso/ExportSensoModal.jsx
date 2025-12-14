import { useEffect, useState } from "react";
import axios from "axios";

export default function ExportSensoModal({ open, onClose }) {
  const [years, setYears] = useState([]);
  const [selectedYear, setSelectedYear] = useState("");

  useEffect(() => {
    if (!open) return;

    const fetchYears = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await axios.get(
          "http://localhost:4000/api/senso/years",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setYears(res.data);

        // si solo hay un año, lo preselecciona
        if (res.data.length === 1) {
          setSelectedYear(res.data[0]);
        }
      } catch (err) {
        console.error("Error cargando años Senso:", err);
      }
    };

    fetchYears();
  }, [open]);

  const exportExcel = async () => {
    if (!selectedYear) return;

    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(
        `http://localhost:4000/api/senso/export/${selectedYear}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          responseType: "blob",
        }
      );

      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `senso_${selectedYear}.xlsx`);
      document.body.appendChild(link);
      link.click();
      link.remove();

      onClose();
    } catch (err) {
      console.error("Error exportando Senso:", err);
      alert("No se pudo exportar el archivo");
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[9999] bg-black/50 flex items-center justify-center">
      <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-bold text-purple-700 mb-4">
          Exportar Senso
        </h2>

        <label className="block mb-2 font-semibold text-gray-700">
          Seleccionar año
        </label>

        <select
          value={selectedYear}
          onChange={(e) => setSelectedYear(e.target.value)}
          className="w-full border rounded p-2 mb-6"
        >
          <option value="">-- Seleccionar --</option>
          {years.map((y) => (
            <option key={y} value={y}>
              {y}
            </option>
          ))}
        </select>

        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400"
          >
            Cancelar
          </button>

          <button
            onClick={exportExcel}
            disabled={!selectedYear}
            className="px-4 py-2 rounded bg-green-600 text-white hover:bg-green-700 disabled:opacity-50"
          >
            Exportar
          </button>
        </div>
      </div>
    </div>
  );
}
