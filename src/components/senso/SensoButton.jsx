

//responsive=========================================================

import { useState } from "react";
import SensoModal from "../../components/admin/SensoModal";

export default function SensoButton() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        aria-label="Abrir modal de censo"  // Mejora de accesibilidad
        className="
          fixed bottom-9 right-10 z-50
          bg-green-600 hover:bg-gray-700
          text-white font-semibold
          w-16 h-16 rounded-full
          shadow-lg transition duration-300
          focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2
        "
      >
        <span className="text-xl">Censo</span>  {/* Si quieres un texto en el botón */}
      </button>

      {open && (
        <SensoModal onClose={() => setOpen(false)} />
      )}
    </>
  );
}
