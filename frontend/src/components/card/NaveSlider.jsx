import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../axios/api";

const MAX_STAT = 4;

function StatIconos({ valor, icono }) {
  return (
    <div className="flex gap-2 sm:gap-3">
      {Array.from({ length: MAX_STAT }).map((_, i) => (
        <span
          key={i}
          className={`text-2xl sm:text-3xl md:text-4xl transition-all duration-300 filter drop-shadow-[0_0_5px_rgba(255,255,255,0.3)] ${
            i < valor ? "opacity-100 scale-100" : "opacity-20 scale-95 grayscale"
          }`}
        >
          {icono}
        </span>
      ))}
    </div>
  );
}

export default function NaveSlider({ onEquipar }) {
  const navigate = useNavigate();
  const [naves, setNaves] = useState([]);
  const [indice, setIndice] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchNaves() {
      try {
        setLoading(true);
        const res = await api.get("/nave");
        setNaves(res.data.data || res.data || []);
      } catch (err) {
        console.error("Error al cargar las naves de la API:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchNaves();
  }, []);

  if (loading) {
    return (
      <div className="background-general min-h-screen flex items-center justify-center">
        <p className="text-white text-sh-tema text-xl animate-pulse tracking-widest font-mono">
          CONECTANDO CON EL HANGAR...
        </p>
      </div>
    );
  }

  if (!naves.length) {
    return (
      <div className="background-general min-h-screen flex items-center justify-center">
        <p className="text-white text-sh-tema text-xl font-mono">
          No se encontraron naves disponibles.
        </p>
      </div>
    );
  }

  const nave = naves[indice];
  const anterior = () => setIndice((i) => (i - 1 + naves.length) % naves.length);
  const siguiente = () => setIndice((i) => (i + 1) % naves.length);

  return (
    <div className="background-general min-h-screen flex flex-col items-center justify-center p-4 sm:p-6 gap-6">

      {/* Contenedor principal — ocupa casi toda la pantalla */}
      <div className="flex items-center gap-2 sm:gap-4 w-full max-w-6xl px-0 sm:px-2">

        {/* Flecha izquierda desktop */}
        <button
          onClick={anterior}
          className="hidden md:flex text-white/60 hover:text-[var(--tema-visual)] text-7xl p-3 hover:scale-125 transition-all select-none flex-shrink-0"
        >
          ‹
        </button>

        {/* Card */}
        <div className="flex-1 flex flex-col md:flex-row items-center gap-8 md:gap-12
                        bg-black/50 border border-gray-700 rounded-3xl
                        p-6 sm:p-10 md:p-14
                        backdrop-blur-md shadow-[0_0_60px_rgba(0,255,100,0.08)]
                        min-h-[420px] md:min-h-[500px]">

          {/* Imagen */}
          <div className="relative flex-shrink-0 w-56 h-56 sm:w-72 sm:h-72 md:w-96 md:h-96 flex items-center justify-center">
            <div className="absolute -inset-2 rounded-full bg-[var(--tema-visual)] blur-3xl opacity-50 transition duration-700" />
            <img
              src={nave.imagen_url || nave.avatar_url || "/nave.png"}
              alt={nave.nombre}
              className="relative w-full h-full object-contain filter drop-shadow-[0_0_30px_rgba(34,197,94,0.6)] transition-transform duration-500 hover:scale-105"
            />
          </div>

          {/* Stats */}
          <div className="flex flex-col gap-6 sm:gap-8 flex-1 w-full justify-center">
            <h2 className="text-white text-3xl sm:text-4xl md:text-5xl font-bold tracking-wider text-center md:text-left border-b border-white/10 pb-4">
              {nave.nombre}
            </h2>

            <div className="grid grid-cols-3 items-center w-full gap-3">
              <span className="text-white/90 text-base sm:text-xl md:text-2xl font-medium tracking-wide">Vida</span>
              <div className="col-span-2 flex justify-start pl-2">
                <StatIconos valor={nave.vida} icono="❤️" />
              </div>
            </div>

            <div className="grid grid-cols-3 items-center w-full gap-3">
              <span className="text-white/90 text-base sm:text-xl md:text-2xl font-medium tracking-wide">Velocidad</span>
              <div className="col-span-2 flex justify-start pl-2">
                <StatIconos valor={nave.cadencia || nave.velocidad || 1} icono="🥾" />
              </div>
            </div>

            <div className="grid grid-cols-3 items-center w-full gap-3">
              <span className="text-white/90 text-base sm:text-xl md:text-2xl font-medium tracking-wide">Daño</span>
              <div className="col-span-2 flex justify-start pl-2">
                <StatIconos valor={nave.daño || nave.poder_disparo || 1} icono="⚔️" />
              </div>
            </div>
          </div>
        </div>

        {/* Flecha derecha desktop */}
        <button
          onClick={siguiente}
          className="hidden md:flex text-white/60 hover:text-[var(--tema-visual)] text-7xl p-3 hover:scale-125 transition-all select-none flex-shrink-0"
        >
          ›
        </button>
      </div>

      {/* Flechas móvil */}
      <div className="flex md:hidden justify-center items-center gap-16 w-full">
        <button
          onClick={anterior}
          className="text-white/60 hover:text-[var(--tema-visual)] text-6xl p-3 bg-neutral-900/50 rounded-xl active:scale-95 transition-all select-none"
        >
          ‹
        </button>
        <button
          onClick={siguiente}
          className="text-white/60 hover:text-[var(--tema-visual)] text-6xl p-3 bg-neutral-900/50 rounded-xl active:scale-95 transition-all select-none"
        >
          ›
        </button>
      </div>

      {/* Puntos paginación */}
      <div className="flex gap-3">
        {naves.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndice(i)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              i === indice
                ? "bg-[var(--tema-visual)] w-8 text-sh-tema"
                : "bg-white/20 hover:bg-white/40"
            }`}
          />
        ))}
      </div>

      {/* Botón equipar */}
      <button
        onClick={() => {
          onEquipar?.(nave);
          navigate("/");
        }}
        className="w-full sm:w-auto px-16 py-4 bg-[var(--tema-visual)] hover:bg-black hover:text-white
                   text-black font-extrabold text-lg sm:text-xl rounded-xl tracking-widest
                   transition-all duration-300 active:scale-95 hover:border hover:border-[var(--tema-visual)]"
      >
        EQUIPAR
      </button>
    </div>
  );
}