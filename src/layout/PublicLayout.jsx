/*import { Outlet } from "react-router-dom";
import HeaderPublic from "../components/public/HeaderPublic";
import FooterPublic from "../components/public/FooterPublic";

export default function PublicLayout() {
  return (
    <div
          className="min-h-screen bg-cover bg-center bg-fixed"
          style={{
            backgroundImage: "url('/GRULLA.webp')"
          }}
        >
              
      <HeaderPublic />

      {/* El main se expande para empujar el footer hacia abajo /}
      <main className="flex-grow pt-28 max-w-7xl mx-auto px-4">
        <Outlet />
      </main>

      <FooterPublic />
    </div>
  );
}*/


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

      {/* El main se expande para empujar el footer hacia abajo */}
      <main className="flex-grow pt-28 max-w-7xl mx-auto px-4">
        <Outlet />
      </main>

      <FooterPublic />

      {/* Botón flotante Senso */}
      <SensoButton />
    </div>
  );
}


