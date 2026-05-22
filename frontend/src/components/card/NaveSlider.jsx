import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
// Importamos tu instancia personalizada de axios
import api from "../axios/api";

// Máximo de iconos a mostrar por stat
const MAX_STAT = 4;
// Este componente recibe el NÚMERO (valor) y dibuja los iconos dinámicamente
function StatIconos({ valor, icono }) {
  return (
    // 📱 responsive: text-xl en móvil, text-2xl en pantallas más grandes para que quepan holgadamente
    <div className="flex gap-1.5 sm:gap-2">
      {Array.from({ length: MAX_STAT }).map((_, i) => (
        <span
          key={i}
          className={`text-xl sm:text-2xl transition-all duration-300 filter drop-shadow-[0_0_5px_rgba(255,255,255,0.3)] ${
            i < valor
              ? "opacity-100 scale-100"
              : "opacity-20 scale-95 grayscale"
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
      <div className="background-general min-h-screen flex items-center justify-center bg-black">
        <p className="text-white text-sh-tema text-xl animate-pulse tracking-widest font-mono">
          CONECTANDO CON EL HANGAR...
        </p>
      </div>
    );
  }

  if (!naves.length) {
    return (
      <div className="background-general min-h-screen flex items-center justify-center bg-black">
        <p className="text-white text-sh-tema text-xl font-mono">
          No se encontraron naves disponibles.
        </p>
      </div>
    );
  }

  const nave = naves[indice];

  const anterior = () =>
    setIndice((i) => (i - 1 + naves.length) % naves.length);
  const siguiente = () => setIndice((i) => (i + 1) % naves.length);

  return (
    <div className="background-general min-h-screen flex flex-col items-center justify-center p-4 sm:p-6 gap-6 sm:gap-8 bg-black">
      
      {/* 🛠️ CAMBIO EN EL CONTENEDOR PRINCIPAL:
        - flex-col-reverse: En móviles pone las flechas/controles debajo de la Card.
        - md:flex-row: En ordenadores vuelve a colocar Flecha Izquierda | Card | Flecha Derecha.
      */}
      <div className="flex flex-col-reverse md:flex-row items-center gap-6 w-full max-w-4xl px-2">
        
        {/* Contenedor exclusivo para agrupar las flechas en móviles, se oculta en md */}
        <div className="flex md:hidden justify-center items-center gap-12 w-full mt-2">
          <button
            onClick={anterior}
            className="text-white/60 hover:text-[var(--tema-visual)] text-5xl p-3 bg-neutral-900/50 rounded-xl active:scale-95 transition-all select-none"
          >
            ‹
          </button>
          <button
            onClick={siguiente}
            className="text-white/60 hover:text-[var(--tema-visual)] text-5xl p-3 bg-neutral-900/50 rounded-xl active:scale-95 transition-all select-none"
          >
            ›
          </button>
        </div>

        {/* Flecha izquierda (Solo visible desde pantallas medianas md en adelante) */}
        <button
          onClick={anterior}
          className="hidden md:block text-white/60 hover:text-[var(--tema-visual)] text-5xl p-2 hover:scale-125 transition-all select-none active:scale-95"
        >
          ‹
        </button>

        {/* Card Principal */}
        <div
          className="w-full flex-1 flex flex-col md:flex-row items-center gap-6 sm:gap-10
                        bg-black/40 border border-gray-800 rounded-2xl p-6 sm:p-8 md:p-10
                        backdrop-blur-md shadow-[0_0_40px_rgba(0,255,100,0.08)]"
        >
          {/* Zona Imagen */}
          <div className="relative flex-shrink-0 w-44 h-44 sm:w-56 sm:h-56 md:w-64 md:h-64 flex items-center justify-center group">
            <div className="absolute -inset-1 rounded-full bg-[var(--tema-visual)] blur-2xl opacity-40 md:opacity-100 transition duration-700"></div>
            <img
              src={nave.imagen_url || nave.avatar_url || "/nave.png"}
              alt={nave.nombre}
              className="relative w-full h-full object-contain filter drop-shadow-[0_0_20px_rgba(34,197,94,0.55)] transition-transform duration-500 hover:scale-105"
            />
          </div>

          {/* Zona Stats */}
          <div className="flex flex-col gap-4 sm:gap-6 flex-1 w-full justify-center">
            <h2 className="text-white text-2xl sm:text-3xl font-bold tracking-wider text-center md:text-left border-b border-white/5 pb-2">
              {nave.nombre}
            </h2>

            {/* Fila de Stats adaptadas a Grid para que nunca colapsen */}
            <div className="grid grid-cols-3 items-center w-full gap-2">
              <span className="text-white/90 text-sm sm:text-lg font-medium tracking-wide">
                Vida
              </span>
              <div className="col-span-2 flex justify-start pl-1 sm:pl-2">
                <StatIconos valor={nave.vida} icono="❤️" />
              </div>
            </div>

            <div className="grid grid-cols-3 items-center w-full gap-2">
              <span className="text-white/90 text-sm sm:text-lg font-medium tracking-wide">
                Velocidad
              </span>
              <div className="col-span-2 flex justify-start pl-1 sm:pl-2">
                <StatIconos
                  valor={nave.cadencia || nave.velocidad || 1}
                  icono="🥾"
                />
              </div>
            </div>

            <div className="grid grid-cols-3 items-center w-full gap-2">
              <span className="text-white/90 text-sm sm:text-lg font-medium tracking-wide">
                Daño
              </span>
              <div className="col-span-2 flex justify-start pl-1 sm:pl-2">
                <StatIconos
                  valor={nave.daño || nave.poder_disparo || 1}
                  icono="⚔️"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Flecha derecha (Solo visible desde pantallas medianas md en adelante) */}
        <button
          onClick={siguiente}
          className="hidden md:block text-white/60 hover:text-[var(--tema-visual)] text-5xl p-2 hover:scale-125 transition-all select-none active:scale-95"
        >
          ›
        </button>
      </div>

      {/* Puntos de Paginación Inferior */}
      <div className="flex gap-3">
        {naves.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndice(i)}
            className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
              i === indice
                ? "bg-[var(--tema-visual)] w-6 text-sh-tema"
                : "bg-white/20 hover:bg-white/40"
            }`}
          />
        ))}
      </div>

      {/* Botón Equipar */}
      <button
        onClick={() => {
          onEquipar?.(nave);
          navigate("/");
        }}
        className="w-full sm:w-auto px-12 py-3.5 bg-[var(--tema-visual)] hover:bg-black hover:text-white text-black font-extrabold
                   text-base sm:text-lg rounded-xl tracking-widest transition-all duration-300
                    active:scale-95 hover:border hover:border-[var(--tema-visual)] text-center"
      >
        EQUIPAR
      </button>
    </div>
  );
}