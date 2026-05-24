import { useEffect, useState } from "react";
import api from "../components/axios/api";
import ColorTheme from "../components/RGB/ColorTheme";
import { useUser } from "../hooks/useUser";

function Perfil() {
  const { user, updateAvatar } = useUser();
  const [subiendoAvatar, setSubiendoAvatar] = useState(false);

  // ── Estados de Datos ──
  const [nave, setNave] = useState(null);
  const [ranking, setRanking] = useState(null);
  const [logros, setLogros] = useState({ conseguidos: 0, total: 0 });

  // ── Estados de Carga Colectivos/Individuales ──
  const [loadingNave, setLoadingNave] = useState(true);
  const [loadingRanking, setLoadingRanking] = useState(true);
  const [loadingLogros, setLoadingLogros] = useState(true);

  // ── Estados de Error Individuales ──
  const [errorNave, setErrorNave] = useState(false);
  const [errorRanking, setErrorRanking] = useState(false);
  const [errorLogros, setErrorErrorLogros] = useState(false);

  // ⚡ UN SOLO EFFECT MAESTRO: Ejecución secuencial estricta (1 por 1)
  useEffect(() => {
    async function cargarTodoElPerfil() {
      if (!user?.id) return;

      // ==========================================
      // PASO 1: Cargar la Nave
      // ==========================================
      if (user?.perfil?.id_nave) {
        try {
          setLoadingNave(true);
          setErrorNave(false);
          const resNave = await api.get(`/nave/${user.perfil.id_nave}`);
          setNave(resNave.data.data || resNave.data);
        } catch (err) {
          console.error("Error secuencial en Nave:", err);
          setErrorNave(true);
        } finally {
          setLoadingNave(false);
        }
      } else {
        setNave(null);
        setLoadingNave(false);
      }

      // ==========================================
      // PASO 2: Cargar el Ranking (Espera al Paso 1)
      // ==========================================
      try {
        setLoadingRanking(true);
        setErrorRanking(false);
        const resRanking = await api.get(`/ranking`);
        const lista = resRanking.data.data || resRanking.data || [];
        const posicion = lista.findIndex(r => r.id_usuario === user.id);
        setRanking({
          posicion: posicion >= 0 ? posicion + 1 : "-",
          puntos: lista[posicion]?.puntuacion ?? 0,
        });
      } catch (err) {
        console.error("Error secuencial en Ranking:", err);
        setErrorRanking(true);
      } finally {
        setLoadingRanking(false);
      }

      // ==========================================
      // PASO 3: Cargar los Logros (Espera al Paso 2)
      // ==========================================
      try {
        setLoadingLogros(true);
        setErrorErrorLogros(false);

        // Sub-secuencia interna para logros: primero el catálogo global, luego los míos
        const resAll = await api.get(`/logro`);
        const resMios = await api.get(`/mis-logros/${user.id}`);
        
        const total = (resAll.data.data || resAll.data || []).length;
        const conseguidos = (resMios.data || []).length;
        
        setLogros({ conseguidos, total });
      } catch (err) {
        console.error("Error secuencial en Logros:", err);
        setErrorErrorLogros(true);
      } finally {
        setLoadingLogros(false);
      }
    }

    cargarTodoElPerfil();
  }, [user?.id, user?.perfil?.id_nave]); // Se relanza limpiamente si cambia el usuario o su nave

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
    <>
      {/* 🚀 RESPONSIVE A 870PX MEDIANTE MEDIA QUERY INYECTADA */}
      <style>{`
        .perfil-grid-custom {
          display: grid;
          grid-template-columns: 1fr;
        }
        .card-usuario-completa {
          grid-column: 1 / -1;
        }
        @media (min-width: 870px) {
          .perfil-grid-custom {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }
          .card-nave-lateral {
            grid-row: span 2 / span 2;
          }
        }
      `}</style>

      <div className="background-general min-h-screen perfil-grid-custom gap-6 p-4 sm:p-10 lg:p-20">

        {/* Tarjeta de Usuario */}
        <div className="card-usuario-completa flex flex-col lg:flex-row justify-evenly items-center bg-(--negro-opacity) rounded-xl border border-(--tema-visual) p-6 gap-6">
          
          {/* Avatar del Usuario */}
          <div
            className="relative group cursor-pointer flex-shrink-0"
            onClick={() => document.getElementById('avatarInput').click()}
          >
            <img
              className="rounded-full w-32 sm:w-40 md:w-44 object-cover aspect-square border-2 border-dashed border-white/20 group-hover:border-(--tema-visual) transition-all"
              src={user.avatar_url}
              alt="User Foto"
            />
            <div className="absolute inset-0 rounded-full bg-black/60 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
              <span className="text-white text-xs font-mono tracking-wider uppercase font-bold bg-black/40 px-2 py-1 rounded">
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

          {/* Nombre del Usuario */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl text-white text-sh-tema font-bold text-center whitespace-nowrap">
            {user.name}
          </h1>

          {/* Selector de Color */}
          <div className="flex flex-col items-center justify-center min-w-[210px] gap-3 bg-black/20 p-4 rounded-lg border border-white/5">
            <h2 className="text-lg sm:text-xl text-white text-sh-tema font-medium whitespace-nowrap">
              Color de Perfil
            </h2>
            <div className="flex items-center justify-center">
              <ColorTheme />
            </div>
          </div>

        </div>

        {/* Tarjeta de Nave Lateral */}
        <div className="card-nave-lateral bg-(--negro-opacity) rounded-xl border border-(--tema-visual) flex flex-col items-center justify-center p-6 min-h-[300px]">
          <h2 className="text-3xl md:text-5xl text-white text-sh-tema mb-4">Nave Actual</h2>
          {loadingNave ? (
            <p className="text-white/40 animate-pulse">Cargando nave...</p>
          ) : errorNave ? (
            <p className="text-red-400 font-mono text-sm">⚠️ Error al cargar la nave</p>
          ) : nave ? (
            <>
              <img className="h-60 sm:h-72 md:h-90 object-contain" src={nave.avatar_url || nave.imagen_url} alt="Nave" />
              <p className="text-white/60 text-lg mt-4 font-mono tracking-widest">{nave.nombre}</p>
            </>
          ) : (
            <p className="text-white/40 font-mono text-sm">Sin nave equipada</p>
          )}
        </div>

        {/* Tarjeta de Rankings */}
        <div className="bg-(--negro-opacity) rounded-xl border border-(--tema-visual) flex flex-col items-center justify-center p-6 min-h-[150px] gap-4">
          <h2 className="text-3xl md:text-4xl text-white text-sh-tema">Rankings</h2>
          {loadingRanking ? (
            <p className="text-white/40 animate-pulse">Cargando...</p>
          ) : errorRanking ? (
            <p className="text-red-400 font-mono text-sm">⚠️ Error al cargar ranking</p>
          ) : ranking ? (
            <div className="flex flex-col items-center gap-2">
              <span className="text-6xl md:text-8xl font-bold text-white text-sh-tema">
                #{ranking.posicion}
              </span>
              <span className="text-white/60 text-lg font-mono">{ranking.puntos} puntos</span>
            </div>
          ) : (
            <p className="text-white/40 text-lg font-mono">Sin partidas jugadas</p>
          )}
        </div>

        {/* Tarjeta de Logros */}
        <div className="bg-(--negro-opacity) rounded-xl border border-(--tema-visual) flex flex-col items-center justify-center p-6 min-h-[150px] gap-4">
          <h2 className="text-3xl md:text-4xl text-white text-sh-tema">Logros</h2>
          {loadingLogros ? (
            <p className="text-white/40 animate-pulse">Cargando...</p>
          ) : errorLogros ? (
            <p className="text-red-400 font-mono text-sm">⚠️ Error al cargar logros</p>
          ) : (
            <>
              <div className="flex flex-col items-center gap-2">
                <span className="text-6xl md:text-8xl font-bold text-white text-sh-tema">
                  {logros.conseguidos}/{logros.total}
                </span>
                <span className="text-white/60 text-lg font-mono">conseguidos</span>
              </div>
              <div className="w-full bg-white/10 rounded-full h-3 mt-2 overflow-hidden">
                <div
                  className="h-3 rounded-full bg-(--tema-visual) transition-all duration-700 ease-out"
                  style={{ width: logros.total > 0 ? `${(logros.conseguidos / logros.total) * 100}%` : "0%" }}
                />
              </div>
            </>
          )}
        </div>

      </div>
    </>
  );
}

export default Perfil;