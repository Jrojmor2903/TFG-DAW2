import { useState, useEffect } from "react";
import api from "../components/axios/api";
import CardLogro from "../components/card/CardLogro";
import { useUser } from "../hooks/useUser";

export default function Logros() {
  const {user} = useUser()
  const [allLogros, setAllLogros] = useState([]);
  const [userLogros, setUserLogros] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  useEffect(() => {
    async function fetchData() {
      try {
        const [resAll, resUser] = await Promise.all([
          api.get("/logro"),
          api.get(`/mis-logros/${user.id}`)
        ]);
        setAllLogros(resAll.data.data || []);
        setUserLogros(resUser.data || []);
        console.log(resAll)
        console.log(resUser)

      } catch (err) {
        console.error(err);
      }
    }
    fetchData();
  }, []);

  const unlockedIds = new Set(userLogros.map(l => l.id));

  // Lógica de Paginación
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = allLogros.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(allLogros.length / itemsPerPage);

  return (
    <div className="background-general min-h-screen flex flex-col items-center py-10 gap-10">
      <h1 className="text-5xl md:text-7xl font-extrabold tracking-widest text-white text-sh-tema select-none uppercase">Lista de Logros</h1>

      {/* Grid 2x2 */}
      <div className="grid grid-cols-2 gap-8 w-full max-w-2xl px-4">
        {currentItems.map((logro) => (
          <CardLogro 
            key={logro.id} 
            logro={logro} 
            isLocked={!unlockedIds.has(logro.id)} 
          />
        ))}
      </div>

      {/* Paginación */}
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