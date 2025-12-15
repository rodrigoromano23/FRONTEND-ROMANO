import { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const API_BASE_URL = import.meta.env.VITE_API_BASE || "https://backend-romano.onrender.com";
export default function SensoForm() {
  const [form, setForm] = useState({
    nombre: "",
    edad: "",
    sexo: "",
    discapacidadFisicaTipo: "",
    discapacidadFisicaGrado: "",
    discapacidadFisicaOtra: "",
    discapacidadNeurologicaTipo: "",
    discapacidadNeurologicaGrado: "",
    discapacidadNeurologicaOtra: "",
    observaciones: "",
  });

  const [selectedYear, setSelectedYear] = useState("2025");
  const [sensoData, setSensoData] = useState([]);
  const [loading, setLoading] = useState(true);

  // Manejo de cambios en el formulario
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // Enviar formulario al backend
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        `${API_BASE_URL}/api/senso`,
        {
          nombre: form.nombre,
          edad: Number(form.edad),
          sexo: form.sexo,
          discapacidadFisica: form.discapacidadFisicaTipo
            ? {
                tipo: form.discapacidadFisicaTipo,
                grado: form.discapacidadFisicaGrado,
                descripcionOtra: form.discapacidadFisicaOtra,
              }
            : undefined,
          discapacidadNeurologica: form.discapacidadNeurologicaTipo
            ? {
                tipo: form.discapacidadNeurologicaTipo,
                grado: form.discapacidadNeurologicaGrado,
                descripcionOtra: form.discapacidadNeurologicaOtra,
              }
            : undefined,
          observaciones: form.observaciones,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      Swal.fire("Guardado", "Registro Senso creado", "success");
      setForm({
        nombre: "",
        edad: "",
        sexo: "",
        discapacidadFisicaTipo: "",
        discapacidadFisicaGrado: "",
        discapacidadFisicaOtra: "",
        discapacidadNeurologicaTipo: "",
        discapacidadNeurologicaGrado: "",
        discapacidadNeurologicaOtra: "",
        observaciones: "",
      });
      fetchSensoData(); // refrescar los datos para exportación
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "No se pudo guardar", "error");
    }
  };

  // Cargar datos de Senso para la exportación
  const fetchSensoData = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/senso`);
      setSensoData(response.data);
      setLoading(false);
    } catch (err) {
      console.error("Error cargando los datos de Senso:", err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSensoData();
  }, []);


  const handleDeleteAll = async () => {
  const result = await Swal.fire({
    title: "⚠️ ¿Estás seguro?",
    text: "Esto eliminará TODOS los registros del Senso. Esta acción no se puede deshacer.",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#d33",
    cancelButtonColor: "#3085d6",
    confirmButtonText: "Sí, borrar todo",
    cancelButtonText: "Cancelar",
  });

  if (!result.isConfirmed) return;

  try {
    const token = localStorage.getItem("token");

    await axios.delete(`${API_BASE_URL}/api/senso`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    Swal.fire(
      "Borrado",
      "Todos los datos del Senso fueron eliminados",
      "success"
    );

    // Refrescar estado
    setSensoData([]);
    setSelectedYear("");
  } catch (error) {
    console.error("Error borrando datos:", error);
    Swal.fire("Error", "No se pudieron borrar los datos", "error");
  }
};


  // Exportar gráficos por año
const exportGraphToExcel = async () => {
  try {
    const token = localStorage.getItem("token"); // Obtener el token desde localStorage

    if (!token) {
      Swal.fire("Error", "No está autenticado. Por favor, inicie sesión.", "error");
      return;
    }

    const response = await axios.get(
      `${API_BASE_URL}/api/senso/export/${selectedYear}`,
      {
        headers: { Authorization: `Bearer ${token}` },  // Añadir el token en los encabezados
        responseType: "blob" // Asegurarnos de que el servidor devuelve el archivo
      }
    );

    // Crear un enlace para descargar el archivo
    const link = document.createElement("a");
    link.href = URL.createObjectURL(response.data);
    link.download = `Grafico_Senso_${selectedYear}.xlsx`;
    link.click(); // Descargar el archivo
  } catch (err) {
    console.error("Error exportando los gráficos:", err);
    Swal.fire("Error", "No se pudo exportar el gráfico", "error");
  }
};

// Obtener años disponibles para exportación
const yearsAvailable = [...new Set(sensoData.map((d) => d.anio))];

if (loading) return <div>Cargando...</div>;

  return (
    <div className="max-w-5xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-3xl font-bold mb-6 text-purple-700">Carga de datos Censo</h1>

      {/* Formulario */}
      <form onSubmit={handleSubmit} className="space-y-8">
        {/* DATOS BÁSICOS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <input
              name="nombre"
              placeholder="Nombre"
              value={form.nombre}
              onChange={handleChange}
              className="input w-full p-2.5 bg-pink-100 text-gray-700 border border-pink-300 rounded-lg shadow-sm"
              required
            />
          </div>
          <div>
            <input
              type="number"
              name="edad"
              placeholder="Edad"
              value={form.edad}
              onChange={handleChange}
              className="input w-full p-2.5 bg-blue-100 text-gray-700 border border-blue-300 rounded-lg shadow-sm"
              required
            />
          </div>
          <div>
            <select
              name="sexo"
              value={form.sexo}
              onChange={handleChange}
              className="input w-full p-2.5 bg-yellow-100 text-gray-700 border border-yellow-300 rounded-lg shadow-sm"
              required
            >
              <option value="">Sexo</option>
              <option value="masculino">Masculino</option>
              <option value="femenino">Femenino</option>
              <option value="otro">Otro</option>
            </select>
          </div>
        </div>

        {/* Discapacidad Física */}
        <fieldset className="border p-4 rounded-lg bg-green-50">
          <legend className="font-semibold text-xl text-purple-700">Discapacidad Física</legend>
          <select
            name="discapacidadFisicaTipo"
            value={form.discapacidadFisicaTipo}
            onChange={handleChange}
            className="input w-full p-2.5 bg-green-100 text-gray-700 border border-green-300 rounded-lg shadow-sm mb-4"
          >
            <option value="">Seleccionar</option>
            <option value="paralisis cerebral">Parálisis cerebral</option>
            <option value="espina bifida">Espina bífida</option>
            <option value="amputacion">Amputación</option>
            <option value="artritis">Artritis</option>
            <option value="fibromialgia">Fibromialgia</option>
            <option value="Esclerosis multiple">Esclerosis Multiple</option>
            <option value="parkinson">Parkinson</option>
            <option value="distrofia muscular">Distrofia Muscular</option>
            <option value="otro">Otro</option>
          </select>

          {form.discapacidadFisicaTipo && (
            <div>
              <select
                name="discapacidadFisicaGrado"
                value={form.discapacidadFisicaGrado}
                onChange={handleChange}
                className="input w-full p-2.5 bg-green-100 text-gray-700 border border-green-300 rounded-lg shadow-sm mb-4"
              >
                <option value="">Grado</option>
                <option value="leve">Leve</option>
                <option value="moderado">Moderado</option>
                <option value="grave">Grave</option>
              </select>

              {form.discapacidadFisicaTipo === "otro" && (
                <input
                  name="discapacidadFisicaOtra"
                  placeholder="Especificar"
                  value={form.discapacidadFisicaOtra}
                  onChange={handleChange}
                  className="input w-full p-2.5 bg-green-100 text-gray-700 border border-green-300 rounded-lg shadow-sm mb-4"
                />
              )}
            </div>
          )}
        </fieldset>

        {/* Discapacidad Neurológica */}
        <fieldset className="border p-4 rounded-lg bg-blue-50">
          <legend className="font-semibold text-xl text-purple-700">Discapacidad Neurológica</legend>
          <select
            name="discapacidadNeurologicaTipo"
            value={form.discapacidadNeurologicaTipo}
            onChange={handleChange}
            className="input w-full p-2.5 bg-blue-100 text-gray-700 border border-blue-300 rounded-lg shadow-sm mb-4"
          >
            <option value="">Seleccionar</option>
            <option value="autismo">Autismo</option>
            <option value="esquizofrenia">Esquizofrenia</option>
            <option value="epilepsia">Epilepsia</option>
            <option value="parálisis cerebral">Parálisis cerebral</option>
            <option value="sindrome down">Sindorme de Down</option>
            <option value="retraso madurativo">Retraso Madurativo</option>
            <option value="cerebro lesion">Cerebro Lesion</option>
            <option value="enfermedad de alzheimer">Enfermedad de Alzheimer</option>
            <option value="tdah">TDAH</option>
            <option value="otro">Otro</option>
          </select>

          {form.discapacidadNeurologicaTipo && (
            <div>
              <select
                name="discapacidadNeurologicaGrado"
                value={form.discapacidadNeurologicaGrado}
                onChange={handleChange}
                className="input w-full p-2.5 bg-blue-100 text-gray-700 border border-blue-300 rounded-lg shadow-sm mb-4"
              >
                <option value="">Grado</option>
                <option value="leve">Leve</option>
                <option value="moderado">Moderado</option>
                <option value="grave">Grave</option>
              </select>

              {form.discapacidadNeurologicaTipo === "otro" && (
                <input
                  name="discapacidadNeurologicaOtra"
                  placeholder="Especificar"
                  value={form.discapacidadNeurologicaOtra}
                  onChange={handleChange}
                  className="input w-full p-2.5 bg-blue-100 text-gray-700 border border-blue-300 rounded-lg shadow-sm mb-4"
                />
              )}
            </div>
          )}
        </fieldset>

        {/* Observaciones */}
        <div>
          <textarea
            name="observaciones"
            value={form.observaciones}
            onChange={handleChange}
            placeholder="Observaciones"
            className="input w-full p-2.5 bg-yellow-100 text-gray-700 border border-yellow-300 rounded-lg shadow-sm"
          />
        </div>

        {/* Botón de enviar */}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
        >
          Guardar datos
        </button>
      </form>

      {/* Si no hay datos cargados */}
      {sensoData.length === 0 && (
        <div className="text-center mt-4 text-red-500 font-semibold">
          Sin datos cargados
        </div>
      )}

      {/* Exportar Gráfico */}
      {sensoData.length > 0 && yearsAvailable.length > 0 && (
        <div className="mt-4 text-center">
          <button
            onClick={exportGraphToExcel}
            className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600"
          >
            Exportar Gráfico para {selectedYear}
          </button>


        </div>

        
      )}
      {/* Botón BORRAR TODO */}
      {sensoData.length > 0 && (
        <div className="mt-6 text-center">
          <button
            onClick={handleDeleteAll}
            className="bg-red-600 text-white py-2 px-6 rounded-lg hover:bg-red-700 transition"
          >
            🧨 Borrar todos los datos
          </button>
        </div>
      )}


    </div>
    
  );
}




