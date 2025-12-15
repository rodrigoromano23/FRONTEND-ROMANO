


//nuevo =====================================================

import { Outlet } from "react-router-dom";
import HeaderPublic from "../components/public/HeaderPublic";
import FooterPublic from "../components/public/FooterPublic";
import SensoButton from "../components/senso/SensoButton";

export default function PublicLayout() {
  return (
    <div
      className="min-h-screen bg-cover bg-center bg-fixed"
      style={{ backgroundImage: "url('/GRULLA.webp')" }}
    >
      <HeaderPublic />

      {/* El main se expande para empujar el contenido hacia abajo */}
      <main className="pt-28 max-w-7xl mx-auto px-4 pb-20"> {/* Aquí agregamos el padding inferior */}
        <Outlet />
      </main>

      <FooterPublic className="fixed bottom-0 w-full bg-white z-10" /> {/* Footer fijo */}
      
      {/* Botón flotante Senso */}
      <SensoButton />
    </div>
  );
}
