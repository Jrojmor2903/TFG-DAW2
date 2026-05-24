import { useState, useEffect } from "react";
import api from "../axios/api";

export function AdminModalRanking({ type, entity, onClose, onSave, isSaving = false }) {
  const [usuarios, setUsuarios] = useState([]);
  const [loadingUsuarios, setLoadingUsuarios] = useState(true);

  useEffect(() => {
    async function fetchUsuarios() {
      try {
        const res = await api.get("/user");
        setUsuarios(res.data.data || res.data || []);
      } finally {
        setLoadingUsuarios(false);
      }
    }
    fetchUsuarios();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    const payload = {
      id_usuario:    Number(formData.get("id_usuario")),
      puntuacion:    Number(formData.get("puntuacion")),
      fecha_partida: formData.get("fecha_partida") || null,
    };

    onSave(payload);
  };

  if (!type) return null;

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-neutral-900 border border-neutral-800 rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden relative">

        {isSaving && (
          <div className="absolute inset-0 bg-neutral-950/60 backdrop-blur-xs z-50 flex flex-col items-center justify-center gap-3">
            <div className="w-10 h-10 border-4 border-neutral-800 border-t-green-500 rounded-full animate-spin"></div>
            <p className="text-green-400 font-mono text-xs tracking-widest uppercase animate-pulse">Actualizando ranking...</p>
          </div>
        )}

        {/* Cabecera */}
        <div className="p-6 border-b border-neutral-800 flex justify-between items-center bg-neutral-950">
          <h2 className="text-xl font-bold uppercase tracking-wider">
            {type === "ver"    && "👁️ Detalles del"}
            {type === "crear"  && "➕ Crear Nuevo"}
            {type === "editar" && "✏️ Editar"} Ranking
          </h2>
          <button
            type="button"
            onClick={onClose}
            disabled={isSaving}
            className="text-neutral-400 hover:text-white text-xl disabled:opacity-30"
          >
            &times;
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[70vh] overflow-y-auto scrollbar-none">

          {/* Usuario */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-neutral-400 uppercase tracking-wider">Usuario</label>
            {type === "ver" ? (
              <div className="bg-neutral-950 border border-neutral-800 rounded-xl p-3 text-sm font-mono text-neutral-300">
                {entity?.usuario_nombre ?? entity?.id_usuario ?? "N/A"}
              </div>
            ) : loadingUsuarios ? (
              <p className="text-neutral-500 text-sm animate-pulse">Cargando usuarios...</p>
            ) : (
              <select
                name="id_usuario"
                defaultValue={entity?.id_usuario || ""}
                required
                disabled={isSaving}
                className="w-full bg-neutral-950 border border-neutral-800 focus:border-green-500 rounded-xl p-3 text-sm text-white focus:outline-none transition-all disabled:opacity-50"
              >
                <option value="" disabled>-- Selecciona un usuario --</option>
                {usuarios.map((u) => (
                  <option key={u.id} value={u.id}>
                    {u.name} — {u.email}
                  </option>
                ))}
              </select>
            )}
          </div>

          {/* Puntuación */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-neutral-400 uppercase tracking-wider">Puntuación</label>
            {type === "ver" ? (
              <div className="bg-neutral-950 border border-neutral-800 rounded-xl p-3 text-sm font-mono text-neutral-300">
                {entity?.puntuacion ?? "N/A"}
              </div>
            ) : (
              <input
                type="number"
                name="puntuacion"
                min="0"
                defaultValue={entity?.puntuacion ?? ""}
                required
                disabled={isSaving}
                placeholder="0"
                className="w-full bg-neutral-950 border border-neutral-800 focus:border-green-500 rounded-xl p-3 text-sm font-mono text-white focus:outline-none transition-all disabled:opacity-50"
              />
            )}
          </div>

          {/* Fecha partida */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-neutral-400 uppercase tracking-wider">
              Fecha de Partida <span className="text-neutral-600 normal-case">(opcional)</span>
            </label>
            {type === "ver" ? (
              <div className="bg-neutral-950 border border-neutral-800 rounded-xl p-3 text-sm font-mono text-neutral-300">
                {entity?.fecha_partida ?? "N/A"}
              </div>
            ) : (
              <input
                type="date"
                name="fecha_partida"
                defaultValue={entity?.fecha_partida?.split("T")[0] || ""}
                disabled={isSaving}
                className="w-full bg-neutral-950 border border-neutral-800 focus:border-green-500 rounded-xl p-3 text-sm font-mono text-white focus:outline-none transition-all disabled:opacity-50"
              />
            )}
          </div>

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
                {isSaving ? "Guardando..." : "Guardar Ranking"}
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}