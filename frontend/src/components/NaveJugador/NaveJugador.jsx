import { forwardRef, useState, useEffect } from "react";
import api from "../axios/api";
import { useUser } from "../../hooks/useUser";

const NaveJugador = forwardRef(({ style }, ref) => {
  const { user } = useUser();
  const [naveImg, setNaveImg] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNave = async () => {
      try {
        console.log("1 - userId:", user.id);

        const resPerfil = await api.post("/perfil/getByUserId", { userId: user.id });
        console.log("2 - resPerfil.data:", resPerfil.data);

        const idNave = resPerfil.data.id_nave;

        const resNave = await api.get(`/nave/${idNave}`);

        setNaveImg(resNave.data.data.avatar_url);
      } catch (e) {
        console.error("Error:", e.response?.data);
        setError("No se pudo cargar la nave.");
      } finally {
        setLoading(false);
      }
    };

    if (user?.id) fetchNave();
  }, [user?.id]);

  if (loading) return <div ref={ref} style={style} className="w-16 h-16" />;
  if (error)   return <div ref={ref} style={style}>❌</div>;

  return (
    <img
      ref={ref}
      style={style}
      src={naveImg}
      alt="Nave del jugador"
      className="fixed bottom-1 w-20 h-20 object-contain img-sh-verde"
    />
  );
});

NaveJugador.displayName = "NaveJugador";

export default NaveJugador;