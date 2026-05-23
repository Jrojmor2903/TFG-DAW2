import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../axios/api";
import LoadingPage from "../Loading/LoadingPage";

const MAX_STAT = 4;
const BREAKPOINT = "min-width: 1100px";

function StatIconos({ valor, icono }) {
  return (
    <div className="flex gap-2 sm:gap-3">
      {Array.from({ length: MAX_STAT }).map((_, i) => (
        <span
          key={i}
          className={`text-2xl sm:text-3xl transition-all duration-300 filter drop-shadow-[0_0_5px_rgba(255,255,255,0.3)] ${
            i < valor ? "opacity-100 scale-100" : "opacity-20 scale-95 grayscale"
          }`}
          style={{ fontSize: "clamp(1.2rem, 2vw, 2.2rem)" }}
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
  const [error, setError] = useState(false);
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 1100);

  useEffect(() => {
    const mq = window.matchMedia(`(${BREAKPOINT})`);
    const handler = (e) => setIsDesktop(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  useEffect(() => {
    async function fetchNaves() {
      try {
        setLoading(true);
        setError(false);
        const res = await api.get("/nave");
        setNaves(res.data.data || res.data || []);
      } catch (err) {
        console.error("Error al cargar las naves de la API:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    fetchNaves();
  }, []);

  if (loading) return <LoadingPage />;

  if (error) {
    return (
      <div className="background-general min-h-screen flex flex-col items-center justify-center gap-4">
        <p className="text-red-400 text-xl font-bold">Error al cargar las naves</p>
        <button
          onClick={() => window.location.reload()}
          className="px-6 py-2 bg-neutral-900 border border-neutral-800 text-white rounded-xl hover:bg-neutral-800 transition"
        >
          Reintentar
        </button>
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
    <div className="background-general min-h-screen flex flex-col items-center justify-center p-4 gap-6">

      <div className="flex items-center gap-2 w-full max-w-6xl px-0">

        {/* Flecha izquierda — solo desktop (>=1100px) */}
        {isDesktop && (
          <button
            onClick={anterior}
            className="text-white/60 hover:text-[var(--tema-visual)] text-7xl p-3 hover:scale-125 transition-all select-none flex-shrink-0"
          >
            ‹
          </button>
        )}

        {/* Card */}
        <div
          className="flex-1 flex items-center gap-8 bg-black/50 border border-gray-700 rounded-3xl p-6 backdrop-blur-md shadow-[0_0_60px_rgba(0,255,100,0.08)]"
          style={{
            flexDirection: isDesktop ? "row" : "column",
            padding: isDesktop ? "3.5rem" : "1.5rem",
            minHeight: isDesktop ? "500px" : "420px",
          }}
        >
          {/* Imagen */}
          <div
            className="relative flex-shrink-0 flex items-center justify-center"
            style={{
              width: isDesktop ? "24rem" : "14rem",
              height: isDesktop ? "24rem" : "14rem",
            }}
          >
            <div className="absolute -inset-2 rounded-full bg-[var(--tema-visual)] blur-3xl opacity-50 transition duration-700" />
            <img
              src={nave.imagen_url || nave.avatar_url || "/nave.png"}
              alt={nave.nombre}
              className="relative w-full h-full object-contain filter drop-shadow-[0_0_30px_rgba(34,197,94,0.6)] transition-transform duration-500 hover:scale-105"
            />
          </div>

          {/* Stats */}
          <div className="flex flex-col gap-6 flex-1 w-full justify-center">
            <h2
              className="text-white font-bold tracking-wider border-b border-white/10 pb-4"
              style={{
                fontSize: isDesktop ? "3rem" : "1.8rem",
                textAlign: isDesktop ? "left" : "center",
              }}
            >
              {nave.nombre}
            </h2>

            <div className="grid grid-cols-3 items-center w-full gap-3">
              <span
                className="text-white/90 font-medium tracking-wide"
                style={{ fontSize: isDesktop ? "1.5rem" : "1rem" }}
              >
                Vida
              </span>
              <div className="col-span-2 flex justify-start pl-2">
                <StatIconos valor={nave.vida} icono="❤️" />
              </div>
            </div>

            <div className="grid grid-cols-3 items-center w-full gap-3">
              <span
                className="text-white/90 font-medium tracking-wide"
                style={{ fontSize: isDesktop ? "1.5rem" : "1rem" }}
              >
                Velocidad
              </span>
              <div className="col-span-2 flex justify-start pl-2">
                <StatIconos valor={nave.cadencia || nave.velocidad || 1} icono="🥾" />
              </div>
            </div>

            <div className="grid grid-cols-3 items-center w-full gap-3">
              <span
                className="text-white/90 font-medium tracking-wide"
                style={{ fontSize: isDesktop ? "1.5rem" : "1rem" }}
              >
                Daño
              </span>
              <div className="col-span-2 flex justify-start pl-2">
                <StatIconos valor={nave.daño || nave.poder_disparo || 1} icono="⚔️" />
              </div>
            </div>
          </div>
        </div>

        {/* Flecha derecha — solo desktop (>=1100px) */}
        {isDesktop && (
          <button
            onClick={siguiente}
            className="text-white/60 hover:text-[var(--tema-visual)] text-7xl p-3 hover:scale-125 transition-all select-none flex-shrink-0"
          >
            ›
          </button>
        )}
      </div>

      {/* Flechas móvil (<1100px) */}
      {!isDesktop && (
        <div className="flex justify-center items-center gap-16 w-full">
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
      )}

      {/* Puntos paginación */}
      <div className="flex gap-3">
        {naves.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndice(i)}
            className={`h-3 rounded-full transition-all duration-300 ${
              i === indice
                ? "bg-[var(--tema-visual)] w-8"
                : "w-3 bg-white/20 hover:bg-white/40"
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