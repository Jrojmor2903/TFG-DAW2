import { useState, useEffect } from "react";
import api from "../components/axios/api";
import CardLogro from "../components/card/CardLogro";
import { useUser } from "../hooks/useUser";
import LoadingPage from "../components/Loading/LoadingPage";
export default function Logros() {
  const { user } = useUser();
  const [allLogros, setAllLogros] = useState([]);
  const [userLogros, setUserLogros] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const itemsPerPage = 4;

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        setError(false);
        const [resAll, resUser] = await Promise.all([
          api.get("/logro"),
          api.get(`/mis-logros/${user.id}`)
        ]);
        setAllLogros(resAll.data.data || []);
        setUserLogros(resUser.data || []);
      } catch (err) {
        console.error(err);
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    if (user?.id) fetchData();
  }, [user?.id]);

  const unlockedIds = new Set(userLogros.map(l => l.id));

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = allLogros.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(allLogros.length / itemsPerPage);

  if (loading) return <LoadingPage />;

  if (error) {
    return (
      <div className="background-general min-h-screen flex flex-col items-center justify-center gap-4">
        <p className="text-red-400 text-xl font-bold">Error al cargar los logros</p>
        <button
          onClick={() => window.location.reload()}
          className="px-6 py-2 bg-neutral-900 border border-neutral-800 text-white rounded-xl hover:bg-neutral-800 transition"
        >
          Reintentar
        </button>
      </div>
    );
  }

  return (
    <div className="background-general min-h-screen flex flex-col items-center py-10 gap-10">
      <h1 className="text-5xl md:text-7xl font-extrabold tracking-widest text-white text-sh-tema select-none uppercase">
        Lista de Logros
      </h1>

      {allLogros.length === 0 ? (
        <p className="text-white/40 text-xl">No hay logros disponibles</p>
      ) : (
        <>
          <div className="grid grid-cols-2 gap-8 w-full max-w-2xl px-4">
            {currentItems.map((logro) => (
              <CardLogro
                key={logro.id}
                logro={logro}
                isLocked={!unlockedIds.has(logro.id)}
              />
            ))}
          </div>

          {totalPages > 1 && (
            <div className="flex gap-6 items-center mt-6 justify-center select-none">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="px-5 py-2.5 bg-neutral-900 border border-neutral-800 text-white rounded-xl disabled:opacity-40 disabled:cursor-not-allowed font-bold hover:bg-neutral-800 transition-colors duration-200"
              >
                Anterior
              </button>

              <span className="text-neutral-400 font-medium md:text-lg font-mono">
                Página <strong className="text-white font-bold">{currentPage}</strong> de {totalPages}
              </span>

              <button
                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="px-5 py-2.5 bg-neutral-900 border border-neutral-800 text-white rounded-xl disabled:opacity-40 disabled:cursor-not-allowed font-bold hover:bg-neutral-800 transition-colors duration-200"
              >
                Siguiente
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}