import { useState, useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useUser } from "../../hooks/useUser"; // Ajusta a tu ruta real
import api from "../axios/api";

export default function RutaAdmin({ children }) {
  const { user, loading: contextLoading } = useUser();
  const [verificandoBackend, setVerificandoBackend] = useState(true);
  const [isServerAdmin, setIsServerAdmin] = useState(false);

  useEffect(() => {
    let isMounted = true; // Para evitar actualizaciones si el componente se desmonta

    async function verificarRolEnServidor() {
      // Si el contexto de usuario está cargando, esperamos quietos
      if (contextLoading) return;

      // Si el contexto terminó y NI SIQUIERA hay usuario, no es admin seguro
      if (!user) {
        if (isMounted) {
          setIsServerAdmin(false);
          setVerificandoBackend(false);
        }
        return;
      }

      try {
        // Tu log nos dice que esta llamada devuelve un 200 con éxito
        const res = await api.get("/user/check-admin");
        
        if (isMounted) {
          // Validamos que el backend nos confirme la autorización
          if (res.data.success === true) {
            setIsServerAdmin(true);
          } else {
            setIsServerAdmin(false);
          }
        }
      } catch (err) {
        console.error("Error en la verificación de seguridad:", err);
        if (isMounted) setIsServerAdmin(false);
      } finally {
        if (isMounted) setVerificandoBackend(false); // 👈 Marcamos que el backend HA TERMINADO
      }
    }

    verificarRolEnServidor();

    return () => { isMounted = false; };
  }, [user, contextLoading]);

  // 1. MIENTRAS esté cargando el contexto OR el backend esté verificando, NO REDIRECCIONAMOS.
  // Nos quedamos en esta pantalla de carga para darle tiempo a los estados a actualizarse.
  if (contextLoading || verificandoBackend) {
    return (
      <div className="min-h-screen bg-neutral-950 text-green-400 font-mono flex items-center justify-center">
        🔒 VERIFICANDO PERMISOS EN EL SERVIDOR CENTRAL...
      </div>
    );
  }

  // 2. SOLO CUANDO ya terminó de comprobar todo, si el servidor dijo que NO es admin, se va fuera.
  if (!isServerAdmin) {
    console.log("Acceso denegado: Redireccionando al index");
    return <Navigate to="/" replace />;
  }

  // 3. Si el servidor dio el OK (isServerAdmin === true), pintamos el panel limpio
  return children ? children : <Outlet />;
}