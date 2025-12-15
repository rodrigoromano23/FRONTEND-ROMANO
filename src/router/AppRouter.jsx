import { Routes, Route } from "react-router-dom";

/* PUBLIC LAYOUT */
import PublicLayout from "../layout/PublicLayout";

/* PUBLIC PAGES */
import Inicio from "../pages/public/Inicio";
import Formulario from "../pages/public/Formulario";
import Juegos from "../pages/public/Juegos";
import ProyectosFuturos from "../pages/public/ProyectosFuturos";
import QuienesSomos from "../pages/public/QuienesSomos";
import Salidas from "../pages/public/Salidas";
import Talleres from "../pages/public/Talleres";

/* ADMIN LAYOUT */
import AdminLayout from "../layout/AdminLayout";

/* AUTH */
import AdminAuth from "../pages/admin/AdminAuth";
import ProtectedRoute from "../components/admin/ProtectedRoute";
import AdminForgot from "../pages/admin/AdminForgot";

/* ADMIN PRIVATE PAGES */
import AdminDashboard from "../pages/admin/AdminDashboard";
import AdminSecciones from "../pages/admin/AdminSecciones";
import AdminTalleres from "../pages/admin/AdminTalleres";
import AdminJuegos from "../pages/admin/AdminJuegos";
import CargarContenido from "../pages/admin/CargarContenido";
import CargarJuego from "../pages/admin/CargarJuego";
import Empleados from "../pages/admin/Empleados";
import Inscriptos from "../pages/admin/Inscriptos";
import EditarPerfil from "../pages/admin/EditarPerfil";
import Publicaciones from "../pages/admin/Publicaciones"; // ✔ FALTABA ESTE IMPORT
import SensoForm from "../pages/admin/SensoForm";

/* ERROR */
import NotFound from "../pages/NotFound";

export default function AppRouter() {
  return (
    <Routes>
      {/* ---------------------- PUBLIC ROUTES ---------------------- */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<Inicio />} />
        <Route path="/formulario" element={<Formulario />} />
        <Route path="/juegos" element={<Juegos />} />
        <Route path="/proyectos-futuros" element={<ProyectosFuturos />} />
        <Route path="/quienes-somos" element={<QuienesSomos />} />
        <Route path="/salidas" element={<Salidas />} />
        <Route path="/talleres" element={<Talleres />} />
      </Route>

      {/* ---------------------- ADMIN – PUBLIC ACCESS ---------------------- */}
      <Route path="/admin" element={<AdminAuth />} />
      <Route path="/admin/forgot" element={<AdminForgot />} />
     

      {/* ---------------------- ADMIN – PRIVATE ROUTES ---------------------- */}
      
        
        <Route
          index // Opcional: para que /admin cargue el dashboard por defecto
          element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>}
        />
        
        <Route
          path="dashboard" // ⬅️ Rutas Relativas
          element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>}
        />

        <Route
          path="secciones" // ⬅️ Rutas Relativas
          element={<ProtectedRoute><AdminSecciones /></ProtectedRoute>}
        />

        <Route
          path="juegos" // ⬅️ Rutas Relativas
          element={<ProtectedRoute><AdminJuegos /></ProtectedRoute>}
        />

        <Route
          path="empleados" // ⬅️ Rutas Relativas
          element={<ProtectedRoute><Empleados /></ProtectedRoute>}
        />

        <Route
          path="editar-perfil" // ⬅️ Rutas Relativas
          element={<ProtectedRoute><EditarPerfil /></ProtectedRoute>}
        />

        <Route
          path="inscriptos" // ⬅️ Rutas Relativas
          element={<ProtectedRoute><Inscriptos /></ProtectedRoute>}
        />

        <Route
          path="publicaciones" // ⬅️ Rutas Relativas
          element={<ProtectedRoute><Publicaciones /></ProtectedRoute>}
        />

        <Route
          path="sensoform" // ⬅️ Cambiado a minúsculas para consistencia
          element={<ProtectedRoute><SensoForm /></ProtectedRoute>}
        />

        {/* Añadir Cargar Contenido/Juego si tienen un path en el header */}
      </Route>

      {/* ---------------------- ERROR ---------------------- */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
