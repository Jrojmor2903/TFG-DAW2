import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../components/axios/api";
import LoadingPage from "../components/Loading/LoadingPage";

export default function CreadorNivel() {
  const navigate = useNavigate();
  const [enemigosDisponibles, setEnemigosDisponibles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [guardando, setGuardando] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    nombre_nivel: "",
    dificultad: "normal",
    velocidad: 80,
    intervalo_oleada: 5000,
    enemigos_oleada: 3,
  });

  // enemigos seleccionados: [{ id, nombre, cantidad }]
  const [enemigosSeleccionados, setEnemigosSeleccionados] = useState([]);

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

    setGuardando(true);
    try {
      await api.post("/nivel", {
        ...form,
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
    <div className="background-general min-h-screen flex flex-col items-center py-10 gap-8 px-4">
      <h1 className="text-4xl md:text-6xl font-extrabold text-white text-sh-tema tracking-widest uppercase">
        Crear Nivel
      </h1>

      <form onSubmit={handleSubmit} className="w-full max-w-2xl flex flex-col gap-6">

        {/* Datos del nivel */}
        <div className="bg-black/50 border border-gray-700 rounded-2xl p-6 flex flex-col gap-4">
          <h2 className="text-white text-xl font-bold text-sh-tema">Configuración del nivel</h2>

          <input
            name="nombre_nivel"
            value={form.nombre_nivel}
            onChange={handleForm}
            placeholder="Nombre del nivel"
            required
            className="input-log-reg"
          />

          <select
            name="dificultad"
            value={form.dificultad}
            onChange={handleForm}
            className="input-log-reg"
          >
            <option value="facil">Fácil</option>
            <option value="normal">Normal</option>
            <option value="dificil">Difícil</option>
          </select>

          <label className="text-white/70 text-sm flex flex-col gap-1">
            Velocidad enemigos: <strong className="text-white">{form.velocidad}</strong>
            <input type="range" name="velocidad" min="40" max="300" value={form.velocidad} onChange={handleForm} className="accent-[var(--tema-visual)]" />
          </label>

          <label className="text-white/70 text-sm flex flex-col gap-1">
            Intervalo entre oleadas (ms): <strong className="text-white">{form.intervalo_oleada}</strong>
            <input type="range" name="intervalo_oleada" min="1000" max="15000" step="500" value={form.intervalo_oleada} onChange={handleForm} className="accent-[var(--tema-visual)]" />
          </label>

          <label className="text-white/70 text-sm flex flex-col gap-1">
            Enemigos por oleada: <strong className="text-white">{form.enemigos_oleada}</strong>
            <input type="range" name="enemigos_oleada" min="1" max="9" value={form.enemigos_oleada} onChange={handleForm} className="accent-[var(--tema-visual)]" />
          </label>
        </div>

        {/* Selección de enemigos */}
        <div className="bg-black/50 border border-gray-700 rounded-2xl p-6 flex flex-col gap-4">
          <h2 className="text-white text-xl font-bold text-sh-tema">Enemigos del nivel</h2>

          <div className="grid grid-cols-2 gap-3">
            {enemigosDisponibles.map(enemigo => {
              const seleccionado = enemigosSeleccionados.find(e => e.id === enemigo.id);
              return (
                <div
                  key={enemigo.id}
                  onClick={() => toggleEnemigo(enemigo)}
                  className={`flex flex-col items-center gap-2 p-3 rounded-xl border cursor-pointer transition-all ${
                    seleccionado
                      ? "border-[var(--tema-visual)] bg-[var(--tema-visual)]/10"
                      : "border-gray-700 bg-black/30 opacity-50"
                  }`}
                >
                  <img src={enemigo.imagen_url} alt={enemigo.nombre} className="w-12 h-12 object-contain" />
                  <span className="text-white text-sm font-bold">{enemigo.nombre}</span>
                </div>
              );
            })}
          </div>

          {/* Cantidades de los seleccionados */}
          {enemigosSeleccionados.length > 0 && (
            <div className="flex flex-col gap-3 mt-2">
              <h3 className="text-white/70 text-sm">Cantidad a derrotar por tipo:</h3>
              {enemigosSeleccionados.map(e => (
                <div key={e.id} className="flex items-center justify-between gap-4">
                  <span className="text-white text-sm">{e.nombre}</span>
                  <input
                    type="number"
                    min="1"
                    max="100"
                    value={e.cantidad}
                    onChange={(ev) => handleCantidad(e.id, ev.target.value)}
                    onClick={(ev) => ev.stopPropagation()}
                    className="w-20 text-center rounded-lg bg-black/50 border border-gray-700 text-white p-1"
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        {error && <p className="text-red-400 text-sm text-center">{error}</p>}

        <button
          type="submit"
          disabled={guardando}
          className="w-full py-4 bg-[var(--tema-visual)] text-black font-extrabold text-lg rounded-xl tracking-widest transition-all active:scale-95 disabled:opacity-50"
        >
          {guardando ? "Guardando..." : "Crear Nivel"}
        </button>
      </form>
    </div>
  );
}