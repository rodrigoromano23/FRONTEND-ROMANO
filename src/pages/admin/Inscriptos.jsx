

import { useEffect, useState } from "react";
import api from "../../services/api";
import Loader from "../../components/UI/Loader";
import Swal from "sweetalert2";

export default function Inscriptos() {
  const [inscriptos, setInscriptos] = useState([]);
  const [loading, setLoading] = useState(true);

  const [dniBuscar, setDniBuscar] = useState("");
  const [resultado, setResultado] = useState(null);

  // Cargar inscriptos
  const fetchInscriptos = async () => {
    try {
      const res = await api.get("/api/inscriptos", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setInscriptos(res.data);
    } catch (err) {
      console.error("Error cargando inscriptos:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInscriptos();
  }, []);

  // Buscar por DNI dinámico
  const handleBuscarDni = (valor) => {
    setDniBuscar(valor);

    if (valor.trim() === "") {
      setResultado(null);
      return;
    }

    const encontrado = inscriptos.find((i) => i.dni == valor);
    setResultado(encontrado || null);
  };

  // Eliminar individual
  const eliminarPorId = async (id) => {
    const confirm = await Swal.fire({
      title: "¿Eliminar inscripto?",
      text: "Esta acción no se puede deshacer.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    });

    if (!confirm.isConfirmed) return;

    try {
      await api.delete(`/api/inscriptos/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });

      Swal.fire({
        title: "Eliminado",
        text: "El inscripto fue eliminado correctamente.",
        icon: "success",
        timer: 1800,
      });

      fetchInscriptos();
      setResultado(null);
      setDniBuscar("");
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "No se pudo eliminar", "error");
    }
  };

  // Eliminar todos
  const eliminarTodos = async () => {
    const confirm = await Swal.fire({
      title: "¿Eliminar TODOS los inscriptos?",
      text: "Esta acción borra la lista completa.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, borrar todo",
    });

    if (!confirm.isConfirmed) return;

    try {
      await api.delete("/api/inscriptos/clear", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });

      Swal.fire("Listo", "La lista fue eliminada", "success");

      fetchInscriptos();
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "No se pudo eliminar la lista", "error");
    }
  };

  // Exportar Excel
  const handleExport = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await api.get("/api/inscriptos/export", {
        headers: { Authorization: `Bearer ${token}` },
        responseType: "blob",
      });

      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "inscriptos.xlsx");
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (err) {
      console.error("Error exportando inscriptos:", err);
      alert(err.response?.data?.msg || "Error al exportar");
    }
  };

  if (loading) return <Loader />;

  return (
    <div className="py-6 max-w-7xl mx-auto px-4">

      {/* TÍTULO Y BOTONES SUPERIORES */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-purple-700">Lista de Inscriptos</h2>

        <div className="flex gap-3">
          <button
            onClick={eliminarTodos}
            className="bg-red-200 text-red-800 px-4 py-2 rounded-lg hover:bg-red-300 transition"
          >
            Borrar todos
          </button>

          <button
            onClick={handleExport}
            className="bg-purple-200 text-purple-800 px-4 py-2 rounded-lg hover:bg-purple-300 transition"
          >
            Exportar XLSX
          </button>
        </div>
      </div>

      {/* BUSCADOR DNI */}
      <div className="mb-6 flex items-center gap-3">
        <input
          type="number"
          value={dniBuscar}
          onChange={(e) => handleBuscarDni(e.target.value)}
          placeholder="Buscar por DNI..."
          className="border border-purple-300 rounded px-3 py-2 w-64"
        />

        {resultado && (
          <button
            onClick={() => eliminarPorId(resultado._id)}
            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
          >
            Eliminar
          </button>
        )}
      </div>

      {/* RESULTADO DE BÚSQUEDA */}
      {resultado && (
        <div className="mb-6 p-4 bg-purple-50 border-l-4 border-purple-300 rounded">
          <p className="text-purple-700 font-semibold">
            Encontrado: {resultado.apellidoNombre} — {resultado.dni}
          </p>
        </div>
      )}

      {/* TABLA */}
      <div className="overflow-auto bg-white rounded shadow-md">
        <table className="w-full border-collapse">
          <thead className="bg-purple-100">
            <tr>
              {[
                "Nombre",
                "Fecha de Nacimiento",
                "Edad",
                "DNI",
                "Taller",
                "Correo",
                "Celular",
                "Dirección",
              ].map((header) => (
                <th
                  key={header}
                  className="p-3 text-left text-purple-700 font-semibold border-b border-purple-200"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {inscriptos.map((i) => (
              <tr
                key={i._id}
                className="border-b border-purple-100 hover:bg-purple-50 transition"
              >
                <td className="p-2">{i.apellidoNombre}</td>
                <td className="p-2">
                  {i.fechaNacimiento
                    ? new Date(i.fechaNacimiento).toLocaleDateString()
                    : ""}
                </td>
                <td className="p-2">{i.edad}</td>
                <td className="p-2">{i.dni}</td>
                <td className="p-2">{i.talleres}</td>
                <td className="p-2">{i.correo}</td>
                <td className="p-2">{i.celular}</td>
                <td className="p-2">{i.direccion}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
}
