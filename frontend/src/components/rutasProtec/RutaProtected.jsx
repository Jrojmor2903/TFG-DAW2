import { Navigate } from "react-router-dom";
import { useUser } from "../../hooks/useUser";


function RutaProtected({ children }) {
  const { user, loading } = useUser();

  if (loading) return <div>Cargando...</div>;
  
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default RutaProtected;