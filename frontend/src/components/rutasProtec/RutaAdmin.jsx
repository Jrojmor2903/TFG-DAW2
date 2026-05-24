import { useState, useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useUser } from "../../hooks/useUser"; // Ajusta a tu ruta real
import api from "../axios/api";

export default function RutaAdmin({ children }) {
  const { user, loading: contextLoading } = useUser();
  const [verificandoBackend, setVerificandoBackend] = useState(true);
  const [isServerAdmin, setIsServerAdmin] = useState(false);

  useEffect(() => {
    let control = true;

    async function verificarRolEnServidor() {

      if (contextLoading) return;

      if (!user) {
        if (control) {
          setIsServerAdmin(false);
          setVerificandoBackend(false);
        }
        return;
      }

      try {

        const res = await api.get("/user/check-admin");
        
        if (control) {

          if (res.data.success === true) {
            setIsServerAdmin(true);
          } else {
            setIsServerAdmin(false);
          }
        }
      } catch (err) {
        console.error("Error en la verificación de seguridad:", err);
        if (control) setIsServerAdmin(false);
      } finally {
        if (control) setVerificandoBackend(false);
      }
    }

    verificarRolEnServidor();

    return () => { control = false; };
  }, [user, contextLoading]);


  if (contextLoading || verificandoBackend) {
    return (
      <div className="min-h-screen bg-neutral-950 text-green-400 font-mono flex items-center justify-center">
        🔒 VERIFICANDO PERMISOS EN EL SERVIDOR CENTRAL...
      </div>
    );
  }

  if (!isServerAdmin) {
    console.log("Acceso denegado: Redireccionando al index");
    return <Navigate to="/" replace />;
  }

  return children ? children : <Outlet />;
}