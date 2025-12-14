


//diseño responsive=============================================

import { useState } from "react";
import { Link } from "react-router-dom";

export default function HeaderPublic() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <header className="w-full fixed top-0 left-0 right-0 z-30 bg-gradient-to-r from-pink-200 via-purple-200 to-blue-200 shadow-md backdrop-blur-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3">

        {/* LOGOS */}
        <div className="flex items-center gap-4">
          <Link to="/" className="flex items-center gap-3">
            <img
              src="/OMNO.png"
              alt="Logo"
              className="h-12 w-auto object-contain drop-shadow-md"
            />
          </Link>
        </div>

        {/*  NAV DESKTOP */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-semibold text-gray-700">
          <Link to="/quienes-somos" className="hover:text-purple-600 transition-all hover:-translate-y-0.5">
            Quienes Somos
          </Link>
          <Link to="/talleres" className="hover:text-purple-600 transition-all hover:-translate-y-0.5">
            Talleres
          </Link>
          <Link to="/salidas" className="hover:text-purple-600 transition-all hover:-translate-y-0.5">
            Salidas
          </Link>
          <Link to="/juegos" className="hover:text-purple-600 transition-all hover:-translate-y-0.5">
            Juegos
          </Link>
          <Link to="/proyectos-futuros" className="hover:text-purple-600 transition-all hover:-translate-y-0.5">
            Proyectos Futuros
          </Link>

          {/* Botón destacado */}
          <Link
            to="/formulario"
            className="px-4 py-2 bg-purple-500 text-white rounded-xl shadow hover:bg-purple-600 transition-all hover:shadow-lg hover:-translate-y-0.5"
          >
            Formulario
          </Link>
        </nav>

        {/*  MOBILE MENU TOGGLE BUTTON */}
        <div className="md:hidden flex items-center">
          <button onClick={toggleMenu} className="text-gray-700">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              {isMenuOpen ? (
                <path
                  strokeLinecap="round"  // Cambiado de stroke-linecap a strokeLinecap
                  strokeLinejoin="round" // Cambiado de stroke-linejoin a strokeLinejoin
                  strokeWidth="2"        // Cambiado de stroke-width a strokeWidth
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"  // Cambiado de stroke-linecap a strokeLinecap
                  strokeLinejoin="round" // Cambiado de stroke-linejoin a strokeLinejoin
                  strokeWidth="2"        // Cambiado de stroke-width a strokeWidth
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/*  MOBILE NAVIGATION MENU */}
      {isMenuOpen && (
        <div className="md:hidden bg-white p-4 rounded-md shadow-md">
          <nav className="flex flex-col gap-4">
            <Link to="/quienes-somos" className="text-gray-700 hover:text-purple-600">
              Quienes Somos
            </Link>
            <Link to="/talleres" className="text-gray-700 hover:text-purple-600">
              Talleres
            </Link>
            <Link to="/salidas" className="text-gray-700 hover:text-purple-600">
              Salidas
            </Link>
            <Link to="/juegos" className="text-gray-700 hover:text-purple-600">
              Juegos
            </Link>
            <Link to="/proyectos-futuros" className="text-gray-700 hover:text-purple-600">
              Proyectos Futuros
            </Link>

            <Link
              to="/formulario"
              className="block px-4 py-2 bg-purple-500 text-white rounded-xl shadow hover:bg-purple-600 transition-all hover:shadow-lg"
            >
              Formulario
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
