/*import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:4000/api",
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default api;*/

import axios from "axios";

/* ================================
   URL DEL BACKEND (RENDER)
================================ */
const api = axios.create({
  baseURL: "https://nombre-backend.onrender.com",
});

/* ================================
   TOKEN AUTOMÁTICO
================================ */
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

/* ================================
   AUTH
================================ */
export const login = (data) => api.post("/auth/login", data);
export const register = (data) => api.post("/auth/register", data);
export const getMe = () => api.get("/auth/me");
export const updateProfile = (data) => api.put("/auth/update-me", data);

/* ================================
   TALLERES
================================ */
export const getTalleres = () => api.get("/talleres");
export const createTaller = (data) => api.post("/talleres", data);
export const deleteTaller = (id) => api.delete(`/talleres/${id}`);

/* ================================
   INSCRIPTOS
================================ */
export const createInscripto = (data) => api.post("/inscriptos", data);
export const getInscriptos = () => api.get("/inscriptos");
export const exportInscriptos = () => api.get("/inscriptos/export");
export const deleteInscripto = (id) => api.delete(`/inscriptos/${id}`);
export const deleteInscriptoByDni = (dni) =>
  api.delete(`/inscriptos/dni/${dni}`);
export const clearInscriptos = () => api.delete("/inscriptos/clear");

/* ================================
   SENSO
================================ */
export const createSenso = (data) => api.post("/senso", data);
export const getSenso = () => api.get("/senso");
export const getSensoStats = () => api.get("/senso/estadisticas");
export const getSensoComparativa = () => api.get("/senso/comparativa");
export const getSensoYears = () => api.get("/senso/years");
export const exportSensoByYear = (year) =>
  api.get(`/senso/export/${year}`);

/* ================================
   SECCIONES
================================ */
export const getSecciones = () => api.get("/secciones");
export const getSeccionesPublicas = () => api.get("/secciones/public");
export const getSeccionBySlug = (slug) =>
  api.get(`/secciones/slug/${slug}`);
export const createSeccion = (data) => api.post("/secciones", data);
export const deleteSeccion = (id) =>
  api.delete(`/secciones/${id}`);

/* ================================
   PUBLICACIONES
================================ */
export const createPublicacion = (data) =>
  api.post("/publicaciones", data);
export const getPublicacionesBySeccion = (params) =>
  api.get("/publicaciones", { params });
export const getInicioPublicaciones = () =>
  api.get("/publicaciones/inicio");
export const deletePublicacion = (tipo, id) =>
  api.delete(`/publicaciones/${tipo}/${id}`);

/* ================================
   EDITOR
================================ */
export const createCanvas = (data) =>
  api.post("/editor/canvas", data);
export const createTexto = (data) =>
  api.post("/editor/texto", data);
export const createVideo = (data) =>
  api.post("/editor/video", data);
export const createCarrusel = (data) =>
  api.post("/editor/carrusel", data);

export const getEditorBySection = (section) =>
  api.get(`/editor/section/${section}`);
export const getEditorInicio = () =>
  api.get("/editor/inicio");
export const getTodasPublicaciones = () =>
  api.get("/editor/todas");
export const deleteEditorPublicacion = (tipo, id) =>
  api.delete(`/editor/${tipo}/${id}`);

/* ================================
   JUEGOS
================================ */
export const getJuegos = () => api.get("/juegos");
export const createJuego = (data) => api.post("/juegos", data);
export const deleteJuego = (id) => api.delete(`/juegos/${id}`);

/* ================================
   EMPLEADOS
================================ */
export const getEmpleados = () => api.get("/empleados/users");
export const deleteEmpleado = (id) =>
  api.delete(`/empleados/users/${id}`);

/* ================================
   CONTENIDO
================================ */
export const guardarContenido = (data) =>
  api.post("/contenido", data);



