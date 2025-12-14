/*import { Outlet } from "react-router-dom";
import HeaderEmpleados from "../components/admin/HeaderEmpleados";
import HeaderJefe from "../components/admin/HeaderJefe";

export default function AdminLayout() {
  const user = JSON.parse(localStorage.getItem("user"));
  const rol = user?.rol;

  return (
    <div className="min-h-screen bg-gray-100">

      {/* HEADER FIJO ARRIBA /}
      <header className="fixed top-0 left-0 w-full z-50">
        {rol === "empleado" && <HeaderEmpleados />}
        {rol === "jefe" && <HeaderJefe />}
      </header>

      {/* CONTENIDO BAJO EL HEADER /}
      <main className="pt-20 max-w-7xl mx-auto px-4">
        <Outlet />
      </main>
    </div>
  );
}*/

import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import HeaderEmpleados from "../components/admin/HeaderEmpleados";
import HeaderJefe from "../components/admin/HeaderJefe";

export default function AdminLayout() {
  const [user, setUser] = useState(null);

  // Escucha cambios en localStorage (por login)
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }

    const handleStorage = () => {
      const updatedUser = localStorage.getItem("user");
      if (updatedUser) {
        setUser(JSON.parse(updatedUser));
      }
    };

    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  if (!user) {
    // Podrías mostrar un loader o algo similar si no se encuentra el usuario
    return <div>Loading...</div>;
  }

  const rol = user?.rol;

  return (
    <div className="min-h-screen bg-gray-100">
      {/* HEADER FIJO ARRIBA */}
      <header className="fixed top-0 left-0 w-full z-50">
        {rol === "empleado" && <HeaderEmpleados />}
        {rol === "jefe" && <HeaderJefe />}
      </header>

      {/* CONTENIDO BAJO EL HEADER */}
      <main className="pt-28 max-w-7xl mx-auto px-4"> {/* Aumenté el padding-top aquí */}
        <Outlet />
      </main>
    </div>
  );
}




