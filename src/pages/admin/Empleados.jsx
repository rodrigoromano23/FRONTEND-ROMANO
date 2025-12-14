

// NUEVO CON SEGURIDAD

import { useEffect, useState } from "react";
import api from "../../services/api";
import Loader from "../../components/UI/Loader";
import Swal from "sweetalert2";
import { toast } from "react-toastify";

export default function Empleados() {
  const [empleados, setEmpleados] = useState([]);
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    try {
      const { data } = await api.get("/api/admin/users");
      setEmpleados(data);
    } catch (err) {
      console.error("ERROR AL CARGAR EMPLEADOS:", err);
      toast.error("Error al cargar empleados");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  // ---------------------------------------
  // 🔥 ELIMINAR EMPLEADO con SweetAlert2
  // ---------------------------------------
  const handleDelete = async (id) => {
    const r = await Swal.fire({
      title: "¿Eliminar empleado?",
      text: "Esta acción no se puede deshacer",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
      reverseButtons: true,
      background: "#ffffff",
      confirmButtonColor: "#e11d48", // rojo elegante
      cancelButtonColor: "#6b7280",
    });

    if (!r.isConfirmed) return;

    try {
      await api.delete(`/api/admin/users/${id}`);

      setEmpleados((prev) => prev.filter((u) => u._id !== id));
      setSelected(null);

      Swal.fire({
        title: "Empleado eliminado",
        icon: "success",
        timer: 1400,
        showConfirmButton: false,
      });

      toast.success("Empleado eliminado correctamente");
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "No se pudo eliminar", "error");
      toast.error("Error eliminando empleado");
    }
  };

  if (loading) return <Loader />;

  return (
    <div className="py-6 flex gap-6">

      {/* ---------------------------- */}
      {/* LISTA DE EMPLEADOS */}
      {/* ---------------------------- */}
      <aside className="w-64 bg-white rounded-xl shadow p-3 h-[60vh] overflow-auto border border-gray-100">
        <h2 className="text-xl font-bold px-2 pb-2">Empleados</h2>
        {empleados.map((e) => (
          <div
            key={e._id}
            className={`p-2 rounded-md cursor-pointer transition-all
            border-b border-gray-100 
            ${selected?._id === e._id ? "bg-blue-50 font-semibold shadow-sm" : "hover:bg-gray-50"}
          `}
            onClick={() => setSelected(e)}
          >
            {e.nombre}
          </div>
        ))}
      </aside>

      {/* ---------------------------- */}
      {/* TARJETA DEL EMPLEADO */}
      {/* ---------------------------- */}
      <main className="flex-1 bg-white p-6 rounded-xl shadow border border-gray-100 min-h-[60vh]">
        {!selected ? (
          <p className="text-gray-500 text-lg text-center mt-10">
            Seleccione un empleado para ver su información
          </p>
        ) : (
          <div className="flex gap-8 items-start animate-fadeIn">

            {/* FOTO */}
            <div className="flex flex-col items-center">
              <img
                src={
                  selected.fotoUrl ||"/default-avatar.png"
                }
                alt={selected.nombre}
                className="w-44 h-44 object-cover rounded-xl border shadow-md"
              />

              <p className="mt-3 text-gray-600 text-sm italic">
                Foto del empleado
              </p>
            </div>

            {/* INFO */}
            <div className="flex-1">
              <h3 className="text-3xl font-bold mb-4 text-gray-800">
                {selected.nombre}
              </h3>

              <div className="grid grid-cols-2 gap-4 text-gray-700">
                <p><strong>Email:</strong> {selected.correo}</p>
                <p><strong>Celular:</strong> {selected.celular}</p>
                <p><strong>DNI:</strong> {selected.dni}</p>
                <p><strong>Puesto:</strong> {selected.rol}</p>
                <p><strong>Domicilio:</strong> {selected.domicilio}</p>
                <p><strong>Edad:</strong> {selected.edad}</p>
                <p><strong>Fecha Nac:</strong> {selected.fechaNacimiento}</p>
              </div>

              <button
                onClick={() => handleDelete(selected._id)}
                className="mt-6 bg-red-600 hover:bg-red-700 transition px-5 py-2 rounded-lg text-white font-semibold shadow"
              >
                Eliminar empleado
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}


