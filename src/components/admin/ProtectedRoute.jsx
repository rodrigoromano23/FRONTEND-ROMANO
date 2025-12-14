import { Navigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

export default function ProtectedRoute({ children }) {
  const { isAuthenticated, loading } = useAuth();

  if (loading) return <p>Cargando...</p>;

  if (!isAuthenticated) {
    return <Navigate to="/admin/dashboard" replace />;
  }

  return children;
}
