import { useEffect, useState } from "react";
import api from "../components/axios/api";
import ColorTheme from "../components/RGB/ColorTheme";
import { useUser } from "../hooks/useUser";

function Perfil() {
  const { user, updateAvatar } = useUser();
  const [subiendoAvatar, setSubiendoAvatar] = useState(false);

  // ── Nave ──
  const [nave, setNave] = useState(null);
  const [loadingNave, setLoadingNave] = useState(true);
  const [errorNave, setErrorNave] = useState(false);

  // ── Ranking ──
  const [ranking, setRanking] = useState(null);
  const [loadingRanking, setLoadingRanking] = useState(true);
  const [errorRanking, setErrorRanking] = useState(false);

  // ── Logros ──
  const [logros, setLogros] = useState({ conseguidos: 0, total: 0 });
  const [loadingLogros, setLoadingLogros] = useState(true);
  const [errorLogros, setErrorLogros] = useState(false);

  // ── Fetch nave ──
  useEffect(() => {
    async function fetchNave() {
      if (!user?.perfil?.id_nave) { setLoadingNave(false); return; }
      try {
        setLoadingNave(true);
        setErrorNave(false);
        const res = await api.get(`/nave/${user.perfil.id_nave}`);
        setNave(res.data.data || res.data);
      } catch {
        setErrorNave(true);
      } finally {
        setLoadingNave(false);
      }
    }
    fetchNave();
  }, [user?.perfil?.id_nave]);

  // ── Fetch ranking ──
  useEffect(() => {
    async function fetchRanking() {
      if (!user?.id) return;
      try {
        setLoadingRanking(true);
        setErrorRanking(false);
        const res = await api.get(`/ranking`);
        const lista = res.data.data || res.data || [];
        const posicion = lista.findIndex(r => r.id_usuario === user.id);
        setRanking({
          posicion: posicion >= 0 ? posicion + 1 : "-",
          puntos: lista[posicion]?.puntuacion ?? 0,
        });
      } catch {
        setErrorRanking(true);
      } finally {
        setLoadingRanking(false);
      }
    }
    fetchRanking();
  }, [user?.id]);

  // ── Fetch logros ──
  useEffect(() => {
    async function fetchLogros() {
      if (!user?.id) return;
      try {
        setLoadingLogros(true);
        setErrorLogros(false);
        const [resAll, resMios] = await Promise.all([
          api.get(`/logro`),
          api.get(`/mis-logros/${user.id}`),
        ]);
        const total = (resAll.data.data || resAll.data || []).length;
        const conseguidos = (resMios.data || []).length;
        setLogros({ conseguidos, total });
      } catch {
        setErrorLogros(true);
      } finally {
        setLoadingLogros(false);
      }
    }
    fetchLogros();
  }, [user?.id]);

  const handleAvatar = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setSubiendoAvatar(true);
    await updateAvatar(file);
    setSubiendoAvatar(false);
  };

  if (!user) {
    return <div className="text-white text-center mt-10">Cargando perfil...</div>;
  }

  return (
    <div className="background-general min-h-screen grid grid-cols-1 md:grid-cols-2 gap-6 p-4 sm:p-10 lg:p-20">

      {/* Usuario */}
      <div className="col-span-1 md:col-span-2 flex flex-col sm:flex-row justify-evenly items-center bg-(--negro-opacity) rounded-xl border border-(--tema-visual) p-6 gap-6">
        <div
          className="relative group cursor-pointer flex-shrink-0"
          onClick={() => document.getElementById('avatarInput').click()}
        >
          <img
            className="rounded-full w-32 sm:w-40 md:w-50 object-cover aspect-square"
            src={user.avatar_url}
            alt="User Foto"
          />
          <div className="absolute inset-0 rounded-full bg-black/50 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
            <span className="text-white text-sm font-bold">
              {subiendoAvatar ? "Subiendo..." : "Cambiar"}
            </span>
          </div>
          <input
            id="avatarInput"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleAvatar}
          />
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl text-white text-sh-tema font-bold text-center">
          {user.name}
        </h1>

        <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-10">
          <h2 className="text-xl sm:text-2xl md:text-3xl text-white text-sh-tema">Color de Perfil</h2>
          <ColorTheme />
        </div>
      </div>

      {/* Nave */}
      <div className="md:row-span-2 bg-(--negro-opacity) rounded-xl border border-(--tema-visual) flex flex-col items-center justify-center p-6 min-h-[300px]">
        <h2 className="text-3xl md:text-5xl text-white text-sh-tema mb-4">Nave Actual</h2>
        {loadingNave ? (
          <p className="text-white/40 animate-pulse">Cargando nave...</p>
        ) : errorNave ? (
          <p className="text-red-400">Error al cargar la nave</p>
        ) : nave ? (
          <>
            <img className="h-60 sm:h-72 md:h-90 object-contain" src={nave.avatar_url || nave.imagen_url} alt="Nave" />
            <p className="text-white/60 text-lg mt-4">{nave.nombre}</p>
          </>
        ) : (
          <p className="text-white/40">Sin nave equipada</p>
        )}
      </div>

      {/* Rankings */}
      <div className="bg-(--negro-opacity) rounded-xl border border-(--tema-visual) flex flex-col items-center justify-center p-6 min-h-[150px] gap-4">
        <h2 className="text-3xl md:text-4xl text-white text-sh-tema">Rankings</h2>
        {loadingRanking ? (
          <p className="text-white/40 animate-pulse">Cargando...</p>
        ) : errorRanking ? (
          <p className="text-red-400">Error al cargar el ranking</p>
        ) : ranking ? (
          <div className="flex flex-col items-center gap-2">
            <span className="text-6xl md:text-8xl font-bold text-white text-sh-tema">
              #{ranking.posicion}
            </span>
            <span className="text-white/60 text-lg">{ranking.puntos} puntos</span>
          </div>
        ) : (
          <p className="text-white/40 text-lg">Sin partidas jugadas</p>
        )}
      </div>

      {/* Logros */}
      <div className="bg-(--negro-opacity) rounded-xl border border-(--tema-visual) flex flex-col items-center justify-center p-6 min-h-[150px] gap-4">
        <h2 className="text-3xl md:text-4xl text-white text-sh-tema">Logros</h2>
        {loadingLogros ? (
          <p className="text-white/40 animate-pulse">Cargando...</p>
        ) : errorLogros ? (
          <p className="text-red-400">Error al cargar los logros</p>
        ) : (
          <>
            <div className="flex flex-col items-center gap-2">
              <span className="text-6xl md:text-8xl font-bold text-white text-sh-tema">
                {logros.conseguidos}/{logros.total}
              </span>
              <span className="text-white/60 text-lg">conseguidos</span>
            </div>
            <div className="w-full bg-white/10 rounded-full h-3 mt-2">
              <div
                className="h-3 rounded-full bg-(--tema-visual) transition-all duration-500"
                style={{ width: logros.total > 0 ? `${(logros.conseguidos / logros.total) * 100}%` : "0%" }}
              />
            </div>
          </>
        )}
      </div>

    </div>
  );
}

export default Perfil;