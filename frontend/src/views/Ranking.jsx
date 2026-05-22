import { useState, useEffect } from "react";
import api from "../components/axios/api";

export default function Ranking() {
  const [rankingTotal, setrankingTotal] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  // 🛠️ MODIFICADO: Subimos a 8 elementos por página para rellenar la pantalla en escritorio
  const itemsPerPage = 8; 

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await api.get("/ranking");
        console.log(res)
        setrankingTotal(res.data.data || res.data || []);
      } catch (err) {
        console.error(err);
      }
    }
    fetchData();
  }, []);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = rankingTotal.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(rankingTotal.length / itemsPerPage);

  return (
    // MODIFICADO: Ajustamos paddings (py-16) y espacios generales
    <div className="background-general min-h-screen flex flex-col items-center py-12 md:py-16 gap-10 bg-black text-white px-4">
      
      {/* Título más imponente en escritorio (text-6xl md:text-7xl) */}
      <h1 className="text-5xl md:text-7xl font-extrabold tracking-widest text-white text-sh-tema select-none uppercase">
        Rankings
      </h1>

      {/* 🛠️ MODIFICADO: Ampliamos el contenedor máximo a 'max-w-5xl' en PC para que se vea imponente */}
      <div className="w-full max-w-5xl flex flex-col gap-4 font-semibold">
        
        {/* Cabecera de la tabla con textos más grandes en PC (md:text-xl) */}
        <div className="grid grid-cols-4 text-center text-white text-sh-tema text-base md:text-xl pb-4 px-6 md:px-8 border-b-2 border-neutral-800 tracking-wider">
          <div>Posición</div>
          <div>Usuario</div>
          <div>Fecha</div>
          <div>Puntuación</div>
        </div>

        {/* Cuerpo del Ranking */}
        <div className="flex flex-col gap-3.5">
          {currentItems.map((ranking, index) => {
            const posicionReal = indexOfFirstItem + index + 1;

            return (
              <div 
                key={ranking.id || index} 
                // 🛠️ MODIFICADO: Más padding vertical en PC (md:py-4.5) y textos más grandes (md:text-xl)
                className="grid grid-cols-4 text-center items-center py-3.5 md:py-4.5 px-6 md:px-8 rounded-xl border border-neutral-800 bg-black/50 backdrop-blur-md hover:border-[var(--tema-visual,rgb(34,197,94))] hover:scale-[1.01] transition-all duration-200"
              >
                {/* Posición con estilo destacado */}
                <span className="text-white text-sh-tema text-lg md:text-2xl font-black">
                  #{posicionReal}
                </span>
                
                {/* Nombre de Usuario */}
                <span className="text-neutral-200 text-sm md:text-xl tracking-wide truncate">
                  {ranking.usuario_nombre || ranking.username || "Paquito"}
                </span>
                
                {/* Tiempo / Fecha */}
                <span className="text-neutral-400 text-sm md:text-lg font-mono">
                  {ranking.fecha_partida || "01:23:00"}
                </span>
                
                {/* Puntuación masiva y brillante */}
                <span className="text-[var(--tema-visual,rgb(34,197,94))] font-mono text-base md:text-2xl tracking-widest font-bold drop-shadow-[0_0_10px_rgba(34,197,94,0.2)]">
                  {ranking.puntuacion || ranking.score || "100000"}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Paginación estilizada */}
      <div className="flex gap-6 items-center mt-6 justify-center select-none">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="px-5 py-2.5 bg-neutral-900 border border-neutral-800 text-white rounded-xl disabled:opacity-40 disabled:cursor-not-allowed font-bold hover:bg-neutral-800 transition-colors duration-200"
        >
          Anterior
        </button>

        <span className="text-neutral-400 font-medium md:text-lg font-mono">
          Página <strong className="text-white font-bold">{currentPage}</strong> de {totalPages || 1}
        </span>

        <button
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages || totalPages === 0}
          className="px-5 py-2.5 bg-neutral-900 border border-neutral-800 text-white rounded-xl disabled:opacity-40 disabled:cursor-not-allowed font-bold hover:bg-neutral-800 transition-colors duration-200"
        >
          Siguiente
        </button>
      </div>
    </div>
  );
}