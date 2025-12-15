/* IMPORTS NECESARIOS DE COMPONENTES */
import { Routes, Route } from "react-router-dom";

/* LAYOUTS */
// Asume que estos existen en tu proyecto
import PublicLayout from "../layout/PublicLayout"; 
import AdminLayout from "../layout/AdminLayout"; 

/* AUTH COMPONENTS */
import AdminAuth from "../pages/admin/AdminAuth";
import ProtectedRoute from "../components/admin/ProtectedRoute";
import AdminForgot from "../pages/admin/AdminForgot";

/* ADMIN PRIVATE PAGES */
import AdminDashboard from "../pages/admin/AdminDashboard";
import AdminSecciones from "../pages/admin/AdminSecciones";
import AdminJuegos from "../pages/admin/AdminJuegos";
import CargarContenido from "../pages/admin/CargarContenido"; 
import CargarJuego from "../pages/admin/CargarJuego"; 
import Empleados from "../pages/admin/Empleados";
import Inscriptos from "../pages/admin/Inscriptos";
import EditarPerfil from "../pages/admin/EditarPerfil";
import Publicaciones from "../pages/admin/Publicaciones"; 
import SensoForm from "../pages/admin/SensoForm";

/* PUBLIC PAGES */
// Asumí que estos existen en tu proyecto
import Inicio from "../pages/Inicio";
import Formulario from "../pages/Formulario";
import Juegos from "../pages/Juegos";
import ProyectosFuturos from "../pages/ProyectosFuturos";
import QuienesSomos from "../pages/QuienesSomos";
import Salidas from "../pages/Salidas";
import Talleres from "../pages/Talleres";

/* ERROR */
import NotFound from "../pages/NotFound";


export default function AppRouter() {
  return (
    <Routes>
      
      {/* ---------------------- RUTAS PÚBLICAS ---------------------- */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<Inicio />} />
        <Route path="/formulario" element={<Formulario />} />
        <Route path="/juegos" element={<Juegos />} />
        <Route path="/proyectos-futuros" element={<ProyectosFuturos />} />
        <Route path="/quienes-somos" element={<QuienesSomos />} />
        <Route path="/salidas" element={<Salidas />} />
        <Route path="/talleres" element={<Talleres />} />
      </Route>

      {/* ---------------------- ADMIN – ACCESO PÚBLICO (Login y Recuperación) ---------------------- */}
      {/* Las rutas de login y recuperación */}
      <Route path="/admin" element={<AdminAuth />} />
      <Route path="/admin/forgot" element={<AdminForgot />} />
      
      {/* ---------------------- ADMIN – RUTAS PRIVADAS (Con Layout y Protección) ---------------------- */}
      {/*  Route que usa el AdminLayout. */}
      {/* Las rutas internas ahora son relativas . */}
      <Route path="/admin" element={<AdminLayout />}>
        
        {/* DASHBOARD (Ruta por defecto al iniciar sesión si el login redirige a /admin) */}
        <Route index element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />

        {/* RUTAS DEL HEADER DE EMPLEADOS / JEFE */}
        <Route path="dashboard" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
        <Route path="secciones" element={<ProtectedRoute><AdminSecciones /></ProtectedRoute>} />
        <Route path="juegos" element={<ProtectedRoute><AdminJuegos /></ProtectedRoute>} />
        <Route path="empleados" element={<ProtectedRoute><Empleados /></ProtectedRoute>} />
        <Route path="inscriptos" element={<ProtectedRoute><Inscriptos /></ProtectedRoute>} />
        <Route path="publicaciones" element={<ProtectedRoute><Publicaciones /></ProtectedRoute>} />
        <Route path="SensoForm" element={<ProtectedRoute><SensoForm /></ProtectedRoute>} />
        
        {/* RUTAS DE ACCIONES ESPECÍFICAS */}
        <Route path="editar-perfil" element={<ProtectedRoute><EditarPerfil /></ProtectedRoute>} />
        <Route path="cargar-contenido" element={<ProtectedRoute><CargarContenido /></ProtectedRoute>} />
        <Route path="cargar-juego" element={<ProtectedRoute><CargarJuego /></ProtectedRoute>} />

      </Route>

      {/* ---------------------- ERROR ---------------------- */}
      <Route path="*" element={<NotFound />} />
      
    </Routes>
  );
}