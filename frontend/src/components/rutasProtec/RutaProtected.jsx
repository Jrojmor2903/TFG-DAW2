import { Navigate } from "react-router-dom";
import { useUser } from "../../hooks/useUser";
import LoadingPage from "../Loading/LoadingPage";


function RutaProtected({ children }) {
  const { user, loading } = useUser();

  if (loading) return <LoadingPage />;;
  
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default RutaProtected;