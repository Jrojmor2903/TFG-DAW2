import { useState, useEffect } from "react";
import api from "../components/axios/api";
import LoadingPage from "../components/Loading/LoadingPage";
import { useNavigate } from "react-router-dom";

export default function ListaNiveles() {
  const [niveles, setNiveles] = useState([]);
  const [creadores, setCreadores] = useState([]); // Para llenar el select de filtros
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  // Estados de los filtros
  const [filtroNombre, setFiltroNombre] = useState("");
  const [filtroCreadorId, setFiltroCreadorId] = useState(""); // Guarda la ID, no el texto

  useEffect(() => {
    async function fetchData() {
      try {
        // Traemos los niveles y los usuarios/creadores en paralelo
        const [resNiveles, resUsuarios] = await Promise.all([
          api.get("/nivel/creados"),
          api.get("/nivel/creadores"),
        ]);

        setNiveles(resNiveles.data.data || resNiveles.data || []);
        setCreadores(resUsuarios.data.data || resUsuarios.data || []);
      } catch (err) {
        setError("Error al cargar los datos de los niveles.");
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  // 🔄 LÓGICA DE FILTRADO COMBINADO
  const nivelesFiltrados = niveles.filter((nivel) => {
    // Filtro por texto del nombre del nivel
    const cumpleNombre = nivel.nombre_nivel
      ?.toLowerCase()
      .includes(filtroNombre.toLowerCase());

    // Filtro por ID del Creador (Si no hay filtro seleccionado, pasan todos)
    const cumpleCreador = filtroCreadorId
      ? String(nivel.id_creador) === String(filtroCreadorId)
      : true;

    return cumpleNombre && cumpleCreador;
  });

  if (loading) return <LoadingPage />;

  return (
    <div className="background-general min-h-screen p-4 md:p-8 text-white w-full box-border overflow-x-hidden">
      <div className="max-w-6xl mx-auto flex flex-col gap-8">
        {/* Cabecera */}
        <div className="text-center md:text-left">
          <h1 className="text-3xl md:text-5xl font-extrabold text-sh-tema tracking-widest uppercase">
            Niveles de la Comunidad
          </h1>
          <p className="text-gray-400 text-sm mt-2">
            Explora y filtra los desafíos creados por los jugadores
          </p>
        </div>

        {/* 🔍 BARRA DE FILTROS (Responsiva) */}
        <div className="bg-black/40 border border-gray-800 p-4 rounded-2xl flex flex-col sm:flex-row gap-4 w-full box-border">
          {/* Input Buscador por texto */}
          <div className="flex-1 flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
              Buscar por Nivel
            </label>
            <input
              type="text"
              placeholder="Introduce nombre del nivel..."
              value={filtroNombre}
              onChange={(e) => setFiltroNombre(e.target.value)}
              className="w-full bg-neutral-900 border border-neutral-800 focus:border-[var(--tema-visual)] rounded-xl p-3 text-sm text-white placeholder-neutral-600 focus:outline-none transition-all"
            />
          </div>

          {/* Selector por Creador (Muestra nombre, filtra por ID) */}
          <div className="w-full sm:w-64 flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
              Filtrar por Jugador
            </label>
            <select
              value={filtroCreadorId}
              onChange={(e) => setFiltorCreadorId(e.target.value)}
              className="w-full bg-neutral-900 border border-neutral-800 focus:border-[var(--tema-visual)] rounded-xl p-3 text-sm text-white focus:outline-none transition-all cursor-pointer"
            >
              <option value="">-- Todos los jugadores --</option>
              {creadores.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.name || user.username || `Jugador #${user.id}`}
                </option>
              ))}
            </select>
          </div>

          {/* Botón de limpiar filtros rápido */}
          {(filtroNombre || filtroCreadorId) && (
            <div className="flex items-end">
              <button
                onClick={() => {
                  setFiltroNombre("");
                  setFiltorCreadorId("");
                }}
                className="w-full sm:w-auto px-4 py-3 bg-neutral-800 hover:bg-neutral-700 text-gray-300 rounded-xl text-sm font-semibold transition-all"
              >
                Limpiar
              </button>
            </div>
          )}
        </div>

        {error && <p className="text-red-400 text-center">{error}</p>}

        {/* 🗺️ GRID DE NIVELES */}
        {nivelesFiltrados.length === 0 ? (
          <div className="text-center py-12 bg-black/20 border border-dashed border-gray-800 rounded-2xl">
            <p className="text-gray-500">
              No se encontraron niveles con los filtros aplicados.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
            {nivelesFiltrados.map((nivel) => (
              <div
                key={nivel.id}
                className="bg-neutral-900/60 border border-neutral-800 rounded-2xl overflow-hidden flex flex-col justify-between hover:border-[var(--tema-visual)]/50 transition-all group"
              >
                {/* Miniatura/Fondo del nivel */}
                <div className="h-36 w-full relative bg-neutral-950 overflow-hidden">
                  <img
                    src={nivel.fondo_url}
                    alt={nivel.nombre_nivel}
                    className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-3 right-3 bg-black/70 px-2.5 py-1 rounded-md text-xs font-bold border border-gray-700 uppercase">
                    Dificultad: {nivel.dificultad}
                  </div>
                </div>

                {/* Contenido */}
                <div className="p-5 flex flex-col gap-3 flex-1">
                  <div>
                    <h3 className="text-lg font-bold text-white tracking-wide truncate">
                      {nivel.nombre_nivel}
                    </h3>
                    <p className="text-xs text-gray-400 mt-1">
                      Creado por:{" "}
                      <span className="text-[var(--tema-visual)] font-semibold">
                        {nivel.creador?.name || `ID: ${nivel.id_creador}`}
                      </span>
                    </p>
                  </div>

                  {/* Lista rápida de enemigos incluidos (Badge visual) */}
                  {nivel.enemigos && nivel.enemigos.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 pt-2">
                      {nivel.enemigos.slice(0, 3).map((e, index) => (
                        <span
                          key={index}
                          className="text-[10px] bg-neutral-800 border border-neutral-700 px-2 py-0.5 rounded-full text-gray-300"
                        >
                          {e.nombre || `Enemigo #${e.id}`} x
                          {e.pivot?.cantidad || e.cantidad}
                        </span>
                      ))}
                      {nivel.enemigos.length > 3 && (
                        <span className="text-[10px] text-gray-500 pl-1">
                          +{nivel.enemigos.length - 3} más
                        </span>
                      )}
                    </div>
                  )}
                </div>

                {/* Acción */}
                <div className="p-5 pt-0">
                  <button
                    onClick={() => navigate(`/juego/${nivel.id}`)}
                    className="w-full py-2.5 bg-neutral-800 hover:bg-[var(--tema-visual)] hover:text-black font-bold text-sm rounded-xl transition-all"
                  >
                    Jugar Nivel
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
