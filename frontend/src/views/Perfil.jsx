import { useEffect, useState } from "react";
import api from "../components/axios/api";
import ColorTheme from "../components/RGB/ColorTheme"
import { useUser } from "../hooks/useUser";

function Perfil() {
  const { user } = useUser()
  const [nave, setNave] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchNaveInfo() {
      if (!user || !user.perfil || !user.perfil.id_nave) {
        setLoading(false); // 👈 Importante apagar la carga si no hay nave
        return; 
      }
      try {
        setLoading(true);
        const res = await api.get(`/nave/${user.perfil.id_nave}`);
        setNave(res.data.data || res.data); 
      } catch (err) {
        console.error("Error al obtener la nave:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchNaveInfo();
  }, [user]); 

  if (!user || loading) {
    return <div className="text-white text-center mt-10">Cargando perfil...</div>;
  }

  const name = user.name;
  const avatar = user.avatar_url;
  const avatarNave = nave ? nave.avatar_url : "https://via.placeholder.com/150";

  return (
    // CAMBIADO: min-h-screen en lugar de h-screen. Padding dinámico (p-4 en móvil, p-10/20 en PC)
    // CAMBIADO: El grid ahora es de 1 columna en móviles y pasa a 2 columnas a partir de pantallas medianas (md:)
    <div className="background-general min-h-screen grid grid-cols-1 md:grid-cols-2 gap-6 p-4 sm:p-10 lg:p-20">
      
      {/* Caja Superior (Usuario) - col-span-1 en móvil, col-span-2 en PC */}
      <div className="col-span-1 md:col-span-2 flex flex-col sm:flex-row justify-evenly items-center bg-(--negro-opacity) rounded-xl border border-(--tema-visual) p-6 gap-6">
        <img className="rounded-full w-32 sm:w-40 md:w-50 object-cover aspect-square" src={avatar} alt="User Foto" />
        <h1 className="text-3xl sm:text-4xl md:text-5xl text-white text-sh-tema font-bold text-center">{name}</h1>
        <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-10">
          <h2 className="text-xl sm:text-2xl md:text-3xl text-white text-sh-tema">Color de Perfil</h2>
          <ColorTheme/>
        </div>
      </div>

      {/* Nave Actual - row-span-2 solo se activa en PC, en móvil fluye natural */}
      <div className="md:row-span-2 bg-(--negro-opacity) rounded-xl border border-(--tema-visual) flex flex-col items-center justify-center p-6 min-h-[300px]">
        <h2 className="text-3xl md:text-5xl text-white text-sh-tema mb-4">Nave Actual</h2>
        <img className="h-60 sm:h-72 md:h-90 object-contain" src={avatarNave} alt="Nave Avatar" />
      </div>

      {/* Rankings */}
      <div className="bg-(--negro-opacity) rounded-xl border border-(--tema-visual) flex flex-col items-center justify-center p-6 min-h-[150px]">
        <h2 className="text-3xl md:text-5xl text-white text-sh-tema">Rankings</h2>
      </div>

      {/* Logros */}
      <div className="bg-(--negro-opacity) rounded-xl border border-(--tema-visual) flex flex-col items-center justify-center p-6 min-h-[150px]">
        <h2 className="text-3xl md:text-5xl text-white text-sh-tema">Logros</h2>
      </div>

    </div>
  );
}

export default Perfil;