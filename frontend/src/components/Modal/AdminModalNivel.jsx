import { useState, useEffect } from "react";
import api from "../axios/api";

export function AdminModalNivel({
  type,
  entity,
  onClose,
  onSave,
  isSaving = false,
}) {
  const [enemigosDisponibles, setEnemigosDisponibles] = useState([]);
  const [enemigosSeleccionados, setEnemigosSeleccionados] = useState([]);
  const [loadingEnemigos, setLoadingEnemigos] = useState(true);

  useEffect(() => {
    async function fetchEnemigos() {
      try {
        const res = await api.get("/enemigo");
        setEnemigosDisponibles(res.data.data || res.data || []);
      } finally {
        setLoadingEnemigos(false);
      }
    }
    fetchEnemigos();
  }, []);

  useEffect(() => {
    if (entity?.enemigos?.length > 0) {
      setEnemigosSeleccionados(
        entity.enemigos.map((e) => ({
          id: e.id,
          nombre: e.nombre,
          cantidad: e.pivot?.cantidad || 1,
        })),
      );
    } else {
      setEnemigosSeleccionados([]);
    }
  }, [entity]);

  const toggleEnemigo = (enemigo) => {
    if (isSaving) return; // 🚀 Frena clics accidentales mientras se guarda
    const existe = enemigosSeleccionados.find((e) => e.id === enemigo.id);
    if (existe) {
      setEnemigosSeleccionados((prev) =>
        prev.filter((e) => e.id !== enemigo.id),
      );
    } else {
      setEnemigosSeleccionados((prev) => [
        ...prev,
        { id: enemigo.id, nombre: enemigo.nombre, cantidad: 5 },
      ]);
    }
  };

  const handleCantidad = (id, cantidad) => {
    setEnemigosSeleccionados((prev) =>
      prev.map((e) => (e.id === id ? { ...e, cantidad: Number(cantidad) } : e)),
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    const payload = {
      nombre_nivel: formData.get("nombre_nivel"),
      dificultad: formData.get("dificultad"),
      fondo_url: formData.get("fondo_url") || null,
      tipo: "historia",
      enemigos: enemigosSeleccionados.map((e) => ({
        id: e.id,
        cantidad: e.cantidad,
      })),
    };

    onSave(payload);
  };

  if (!type) return null;

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-neutral-900 border border-neutral-800 rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden relative">
        {/* 🚀 CAPA DE CARGA Y BLOQUEO DEL FORMULARIO DE NIVELES */}
        {isSaving && (
          <div className="absolute inset-0 bg-neutral-950/60 backdrop-blur-xs z-50 flex flex-col items-center justify-center gap-3">
            <div className="w-10 h-10 border-4 border-neutral-800 border-t-green-500 rounded-full animate-spin"></div>
            <p className="text-green-400 font-mono text-xs tracking-widest uppercase animate-pulse">
              Compilando e inyectando nivel...
            </p>
          </div>
        )}

        {/* Cabecera */}
        <div className="p-6 border-b border-neutral-800 flex justify-between items-center bg-neutral-950">
          <h2 className="text-xl font-bold uppercase tracking-wider">
            {type === "ver" && "👁️ Detalles del"}
            {type === "crear" && "➕ Crear Nuevo"}
            {type === "editar" && "✏️ Editar"} Nivel
          </h2>
          <button
            type="button"
            onClick={onClose}
            disabled={isSaving}
            className="text-neutral-400 hover:text-white text-xl disabled:opacity-20"
          >
            &times;
          </button>
        </div>

        <form
          onSubmit={handleSubmit}
          className="p-6 space-y-4 max-h-[70vh] overflow-y-auto scrollbar-none"
        >
          {/* Nombre */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-neutral-400 uppercase tracking-wider">
              Nombre del nivel
            </label>
            {type === "ver" ? (
              <div className="bg-neutral-950 border border-neutral-800 rounded-xl p-3 text-sm font-mono text-neutral-300">
                {entity?.nombre_nivel}
              </div>
            ) : (
              <input
                name="nombre_nivel"
                defaultValue={entity?.nombre_nivel || ""}
                required
                disabled={isSaving}
                placeholder="Nombre del nivel..."
                className="w-full bg-neutral-950 border border-neutral-800 focus:border-green-500 rounded-xl p-3 text-sm font-mono text-white focus:outline-none transition-all disabled:opacity-50"
              />
            )}
          </div>

          {/* Dificultad */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-neutral-400 uppercase tracking-wider">
              Dificultad
            </label>
            {type === "ver" ? (
              <div className="bg-neutral-950 border border-neutral-800 rounded-xl p-3 text-sm font-mono text-neutral-300">
                {entity?.dificultad}
              </div>
            ) : (
              <select
                name="dificultad"
                defaultValue={entity?.dificultad || "2"}
                disabled={isSaving}
                className="w-full bg-neutral-950 border border-neutral-800 focus:border-green-500 rounded-xl p-3 text-sm text-white focus:outline-none transition-all disabled:opacity-50"
              >
                <option value="1">Fácil</option>
                <option value="2">Normal</option>
                <option value="3">Difícil</option>
                <option value="4">Extremo</option>
              </select>
            )}
          </div>

          {/* Fondo URL */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-neutral-400 uppercase tracking-wider">
              Fondo URL
            </label>
            {type === "ver" ? (
              <div className="bg-neutral-950 border border-neutral-800 rounded-xl p-3 text-sm font-mono text-neutral-300">
                {{ 1: "Fácil", 2: "Normal", 3: "Difícil", 4: "Extremo" }[
                  entity?.dificultad
                ] ?? entity?.dificultad}
              </div>
            ) : (
              <input
                name="fondo_url"
                defaultValue={entity?.fondo_url || ""}
                disabled={isSaving}
                placeholder="https://..."
                className="w-full bg-neutral-950 border border-neutral-800 focus:border-green-500 rounded-xl p-3 text-sm font-mono text-white focus:outline-none transition-all disabled:opacity-50"
              />
            )}
          </div>

          {/* Enemigos */}
          {type !== "ver" && (
            <div className="flex flex-col gap-3">
              <label className="text-xs font-semibold text-neutral-400 uppercase tracking-wider">
                Enemigos del nivel
              </label>
              {loadingEnemigos ? (
                <p className="text-neutral-500 text-sm animate-pulse">
                  Cargando enemigos...
                </p>
              ) : (
                <div className="grid grid-cols-2 gap-2">
                  {enemigosDisponibles.map((enemigo) => {
                    const seleccionado = enemigosSeleccionados.find(
                      (e) => e.id === enemigo.id,
                    );
                    return (
                      <div
                        key={enemigo.id}
                        onClick={() => toggleEnemigo(enemigo)}
                        className={`flex items-center gap-2 p-2 rounded-xl border transition-all ${
                          isSaving
                            ? "opacity-30 pointer-events-none"
                            : "cursor-pointer"
                        } ${
                          seleccionado
                            ? "border-green-500 bg-green-500/10"
                            : "border-neutral-700 bg-black/30 opacity-50"
                        }`}
                      >
                        <img
                          src={enemigo.imagen_url}
                          alt={enemigo.nombre}
                          className="w-8 h-8 object-contain flex-shrink-0"
                        />
                        <span className="text-white text-xs font-bold truncate">
                          {enemigo.nombre}
                        </span>
                      </div>
                    );
                  })}
                </div>
              )}

              {enemigosSeleccionados.length > 0 && (
                <div className="flex flex-col gap-2 mt-1">
                  <label className="text-xs text-neutral-500">
                    Cantidad a derrotar:
                  </label>
                  {enemigosSeleccionados.map((e) => (
                    <div
                      key={e.id}
                      className="flex items-center justify-between gap-3 bg-black/20 p-2 rounded-xl border border-neutral-800"
                    >
                      <span className="text-white text-xs truncate">
                        {e.nombre}
                      </span>
                      <input
                        type="number"
                        min="1"
                        max="100"
                        disabled={isSaving}
                        value={e.cantidad}
                        onChange={(ev) => handleCantidad(e.id, ev.target.value)}
                        onClick={(ev) => ev.stopPropagation()}
                        className="w-16 text-center rounded-lg bg-black/50 border border-neutral-700 text-white p-1 text-sm disabled:opacity-50"
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {type === "ver" && entity?.enemigos?.length > 0 && (
            <div className="flex flex-col gap-2">
              <label className="text-xs font-semibold text-neutral-400 uppercase tracking-wider">
                Enemigos
              </label>
              <div className="flex flex-wrap gap-2">
                {entity.enemigos.map((e, i) => (
                  <span
                    key={i}
                    className="text-xs bg-neutral-800 border border-neutral-700 px-2 py-1 rounded-full text-gray-300"
                  >
                    {e.nombre} x{e.pivot?.cantidad}
                  </span>
                ))}
              </div>
            </div>
          )}

          {type !== "ver" && (
            <div className="flex justify-end gap-3 pt-4 border-t border-neutral-800/60 mt-6">
              <button
                type="button"
                onClick={onClose}
                disabled={isSaving}
                className="px-5 py-2.5 bg-neutral-800 text-neutral-300 hover:text-white rounded-xl font-semibold text-sm disabled:opacity-50"
              >
                Cancelar
              </button>
              <button
                type="submit"
                disabled={isSaving}
                className="px-6 py-2.5 bg-green-500 hover:bg-green-600 text-black font-bold rounded-xl text-sm disabled:opacity-50"
              >
                {isSaving ? "Guardando..." : "Guardar Nivel"}
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
