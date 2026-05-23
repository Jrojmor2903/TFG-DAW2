import { Navigate } from "react-router-dom";
import { useUser } from "../../hooks/useUser";
import LoadingPage from "../Loading/LoadingPage";

function RutaCreador({ children }) {
  const { user, roles, loading } = useUser();

  if (loading) return <LoadingPage />;
  if (!user) return <Navigate to="/login" />;
  if (!roles?.some(r => r.slug === "creador" || r.slug === "admin")) {
    return <Navigate to="/" />;
  }

  return children;
}

export default RutaCreador;