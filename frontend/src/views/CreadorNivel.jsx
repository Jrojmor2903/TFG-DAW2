import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../components/axios/api";
import LoadingPage from "../components/Loading/LoadingPage";
import { useUser } from "../hooks/useUser";

export default function CreadorNivel() {
  const navigate = useNavigate();
  const { user } = useUser();
  
  const [enemigosDisponibles, setEnemigosDisponibles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [guardando, setGuardando] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    nombre_nivel: "",
    dificultad: 1,
    fondo_url: "https://qifdqcldqkpzmhyswsjx.supabase.co/storage/v1/object/public/TFG-Bucket/uploads/fondo-nivel.png",
    velocidad: 80,
    intervalo_oleada: 5000,
    enemigos_oleada: 3,
    id_creador: "", // Empezamos vacío de forma segura
  });

  // enemigos seleccionados: [{ id, nombre, cantidad }]
  const [enemigosSeleccionados, setEnemigosSeleccionados] = useState([]);

  // 🚀 SOLUCIÓN AL NULL: Escucha cuándo 'user' deja de ser nulo y actualiza el estado del form
  useEffect(() => {
    if (user?.id) {
      setForm(prev => ({ ...prev, id_creador: user.id }));
    }
  }, [user]);

  useEffect(() => {
    async function fetchEnemigos() {
      try {
        const res = await api.get("/enemigo");
        setEnemigosDisponibles(res.data.data || res.data || []);
      } catch {
        setError("Error cargando enemigos");
      } finally {
        setLoading(false);
      }
    }
    fetchEnemigos();
  }, []);

  const handleForm = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const toggleEnemigo = (enemigo) => {
    const existe = enemigosSeleccionados.find(e => e.id === enemigo.id);
    if (existe) {
      setEnemigosSeleccionados(prev => prev.filter(e => e.id !== enemigo.id));
    } else {
      setEnemigosSeleccionados(prev => [...prev, { id: enemigo.id, nombre: enemigo.nombre, cantidad: 5 }]);
    }
  };

  const handleCantidad = (id, cantidad) => {
    setEnemigosSeleccionados(prev =>
      prev.map(e => e.id === id ? { ...e, cantidad: Number(cantidad) } : e)
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (enemigosSeleccionados.length === 0) {
      setError("Añade al menos un tipo de enemigo");
      return;
    }

    // 🚀 Doble seguridad: Si por un fallo de carga id_creador sigue vacío, lo forzamos aquí antes de enviar
    const creadorId = form.id_creador || user?.id;
    if (!creadorId) {
      setError("Error: No se pudo identificar al creador de la sesión");
      return;
    }

    setGuardando(true);
    try {
      await api.post("/nivel", {
        ...form,
        id_creador: creadorId, // Forzamos el ID real asegurado
        enemigos: enemigosSeleccionados.map(e => ({ id: e.id, cantidad: e.cantidad })),
      });
      navigate("/");
    } catch (err) {
      const errores = err.response?.data?.errors;
      setError(errores ? Object.values(errores).flat().join(" ") : "Error al crear el nivel");
    } finally {
      setGuardando(false);
    }
  };

  if (loading) return <LoadingPage />;

  return (
    <div className="background-general min-h-screen flex flex-col items-center py-6 md:py-10 gap-6 md:gap-8 px-4 w-full box-border overflow-x-hidden">
      <h1 className="text-3xl sm:text-4xl md:text-6xl font-extrabold text-white text-sh-tema tracking-widest uppercase text-center break-words max-w-full">
        Crear Nivel
      </h1>

      <form onSubmit={handleSubmit} className="w-full max-w-2xl flex flex-col gap-6 min-w-0">

        {/* Datos del nivel */}
        <div className="bg-black/50 border border-gray-700 rounded-2xl p-4 md:p-6 flex flex-col gap-4 w-full min-w-0 box-border">
          <h2 className="text-white text-xl font-bold text-sh-tema">Configuración del nivel</h2>

          <input
            name="nombre_nivel"
            value={form.nombre_nivel}
            onChange={handleForm}
            placeholder="Nombre del nivel"
            required
            className="input-log-reg w-full box-border min-w-0"
          />

          <input 
            type="hidden" 
            name="dificultad" 
            value={form.dificultad} 
          />
        </div>

        {/* Selección de enemigos */}
        <div className="bg-black/50 border border-gray-700 rounded-2xl p-4 md:p-6 flex flex-col gap-4 w-full min-w-0 box-border">
          <h2 className="text-white text-xl font-bold text-sh-tema">Enemigos del nivel</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full">
            {enemigosDisponibles.map(enemigo => {
              const seleccionado = enemigosSeleccionados.find(e => e.id === enemigo.id);
              return (
                <div
                  key={enemigo.id}
                  onClick={() => toggleEnemigo(enemigo)}
                  className={`flex flex-col items-center gap-2 p-3 rounded-xl border cursor-pointer transition-all min-w-0 w-full box-border ${
                    seleccionado
                      ? "border-[var(--tema-visual)] bg-[var(--tema-visual)]/10"
                      : "border-gray-700 bg-black/30 opacity-50"
                  }`}
                >
                  <img src={enemigo.imagen_url} alt={enemigo.nombre} className="w-12 h-12 object-contain flex-shrink-0" />
                  <span className="text-white text-sm font-bold truncate max-w-full px-1">{enemigo.nombre}</span>
                </div>
              );
            })}
          </div>

          {/* Cantidades de los seleccionados */}
          {enemigosSeleccionados.length > 0 && (
            <div className="flex flex-col gap-3 mt-2 w-full min-w-0">
              <h3 className="text-white/70 text-sm">Cantidad a derrotar por tipo:</h3>
              {enemigosSeleccionados.map(e => (
                <div key={e.id} className="flex items-center justify-between gap-4 w-full bg-black/20 p-2 rounded-xl border border-gray-800/40">
                  <span className="text-white text-sm truncate pr-2">{e.nombre}</span>
                  <input
                    type="number"
                    min="1"
                    max="100"
                    value={e.cantidad}
                    onChange={(ev) => handleCantidad(e.id, ev.target.value)}
                    onClick={(ev) => ev.stopPropagation()}
                    className="w-16 sm:w-20 text-center rounded-lg bg-black/50 border border-gray-700 text-white p-1.5 font-mono flex-shrink-0"
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        {error && <p className="text-red-400 text-sm text-center break-words max-w-full px-2">{error}</p>}

        <button
          type="submit"
          disabled={guardando}
          className="w-full py-4 bg-[var(--tema-visual)] text-black font-extrabold text-lg rounded-xl tracking-widest transition-all active:scale-95 disabled:opacity-50 flex-shrink-0"
        >
          {guardando ? "Guardando..." : "Crear Nivel"}
        </button>
      </form>
    </div>
  );
}