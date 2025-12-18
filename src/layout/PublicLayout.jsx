


//nuevo =====================================================

import { Outlet } from "react-router-dom";
import HeaderPublic from "../components/public/HeaderPublic";
import FooterPublic from "../components/public/FooterPublic";
import SensoButton from "../components/senso/SensoButton";
import ClimaAccuWeather from "../components/admin/ClimaAccuWeather";

export default function PublicLayout() {
  return (
    <div
      className="min-h-screen bg-cover bg-center bg-fixed"
      style={{ backgroundImage: "url('/GRULLA.webp')" }}
    >
      {/* HEADER FIJO */}
      <header className="fixed top-0 left-0 w-full z-50">
        <HeaderPublic />
      </header>

      {/* MAIN */}
      <main className="pt-28 pb-20 max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-6">

          {/* CONTENIDO */}
          <section className="w-full">
            <Outlet />
          </section>

          {/* CLIMA (NO FLOTA, NO TAPA) */}
          <aside className="hidden lg:block">
            <div
              className="sticky"
              style={{
                top: "72px",   // header
                height: "calc(100vh - 122px - 80px)", // header + footer
              }}
            >
              <ClimaAccuWeather />
            </div>
          </aside>

        </div>
      </main>

      {/* FOOTER FIJO */}
      <footer className="fixed bottom-0 left-0 w-full z-40">
        <FooterPublic />
      </footer>

      {/* BOTÓN SENSO */}
      <SensoButton />
    </div>
  );
}
