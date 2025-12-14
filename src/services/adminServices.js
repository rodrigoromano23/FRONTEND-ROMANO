import api from "./api";

export const getStats = () => api.get("/admin/stats");
export const listUsers = () => api.get("/admin/users");
export const deleteUser = (id) => api.delete(`/admin/users/${id}`);
export const listInscriptos = () => api.get("/inscriptos");
export const exportInscriptosUrl = () => `${import.meta.env.VITE_API_BASE || "http://localhost:4000"}/api/inscriptos/export`;

