import { useState } from "react";
import ExportSensoModal from "../components/senso/ExportSensoModal";

export default function SensoAdminView() {
  const [openExport, setOpenExport] = useState(false);

  return (
    <>
      {/* HEADER / TÍTULO DEL FORMULARIO */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-purple-700">
          Carga Senso
        </h1>

        <button
          onClick={() => setOpenExport(true)}
          className="px-4 py-2 rounded bg-green-500 text-white hover:bg-green-600"
        >
          Exportar
        </button>
      </div>

      {/* acá va tu formulario Senso */}

      <ExportSensoModal
        open={openExport}
        onClose={() => setOpenExport(false)}
      />
    </>
  );
}
