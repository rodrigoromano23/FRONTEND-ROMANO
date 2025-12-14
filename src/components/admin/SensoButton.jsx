import { useState } from "react";
import SensoModal from "./SensoModal";

export default function SensoButton() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 w-16 h-16 rounded-full bg-purple-700 text-white font-bold shadow-lg z-[9999] hover:bg-purple-800 transition"
        aria-label="Información de accesibilidad Senso"
      >
        Senso
      </button>

      {open && <SensoModal onClose={() => setOpen(false)} />}
    </>
  );
}
