import React from 'react';

export default function AdminModal({ type, entity, columns, rolesBackend = [], onClose, onSave, isSaving = false }) {
  if (!type) return null;

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-neutral-900 border border-neutral-800 rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden relative">
        
        {/* 🚀 CAPA DE BLOQUEO Y SPINNER VISUAL */}
        {isSaving && (
          <div className="absolute inset-0 bg-neutral-950/60 backdrop-blur-xs z-50 flex flex-col items-center justify-center gap-3">
            <div className="w-10 h-10 border-4 border-neutral-800 border-t-green-500 rounded-full animate-spin"></div>
            <p className="text-green-400 font-mono text-xs tracking-widest uppercase animate-pulse">Sincronizando Base de Datos...</p>
          </div>
        )}

        {/* Cabecera */}
        <div className="p-6 border-b border-neutral-800 flex justify-between items-center bg-neutral-950">
          <h2 className="text-xl font-bold uppercase tracking-wider">
            {type === "ver" && "👁️ Detalles del"}
            {type === "crear" && "➕ Crear Nuevo"}
            {type === "editar" && "✏️ Editar"} Registro
          </h2>
          <button 
            type="button" 
            onClick={onClose} 
            disabled={isSaving}
            className="text-neutral-400 hover:text-white transition-colors text-xl disabled:opacity-30 disabled:pointer-events-none"
          >
            &times;
          </button>
        </div>

        {/* Formulario */}
        <form onSubmit={onSave} className="p-6 space-y-4 max-h-[70vh] overflow-y-auto scrollbar-none">
          {columns.map((col) => {
            if (col === "id") return null;

            let valorInicial = entity ? entity[col] : "";

            if (col === "rol" && entity) {
              if (Array.isArray(entity.roles) && entity.roles.length > 0) {
                valorInicial = entity.roles[0].id;
              } else if (Array.isArray(entity.asignaciones) && entity.asignaciones.length > 0) {
                valorInicial = entity.asignaciones[0].rol_id;
              } else if (entity.rol && typeof entity.rol === 'object') {
                valorInicial = entity.rol.id;
              } else if (typeof entity.rol === 'number' || typeof entity.rol === 'string') {
                valorInicial = entity.rol;
              } else {
                valorInicial = "";
              }
            }

            return (
              <div key={col} className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-neutral-400 uppercase tracking-wider">
                  {col.replace("_", " ")}
                </label>

                {type === "ver" ? (
                  <div className="w-full bg-neutral-950 border border-neutral-800 rounded-xl p-3 text-sm font-mono text-neutral-300 truncate">
                    {col === "rol" ? (
                      (() => {
                        if (Array.isArray(entity?.roles)) return entity.roles.map(r => r.nombre || r.name).join(", ");
                        if (Array.isArray(entity?.asignaciones)) return entity.asignaciones.map(a => a.rol?.nombre || a.rol_id).join(", ");
                        return "N/A";
                      })()
                    ) : typeof entity?.[col] === 'object' ? (
                      JSON.stringify(entity[col])
                    ) : (
                      String(entity?.[col] ?? "N/A")
                    )}
                  </div>
                ) : col === "rol" ? (
                  <select
                    name="rol[]"
                    defaultValue={valorInicial}
                    required
                    disabled={isSaving}
                    className="w-full bg-neutral-950 border border-neutral-800 focus:border-green-500 rounded-xl p-3 text-sm font-sans text-white focus:outline-none transition-all cursor-pointer disabled:opacity-50"
                  >
                    <option value="" disabled>-- Selecciona un Rol del Sistema --</option>
                    {rolesBackend.map((r) => (
                      <option key={r.id} value={r.id}>
                        {r.nombre || r.nombre_rol || r.slug || `Rol #${r.id}`}
                      </option>
                    ))}
                  </select>
                ) : (
                  <>
                    <input
                      type={col === "email" ? "email" : col === "password" ? "password" : "text"}
                      name={col}
                      defaultValue={col === "password" ? "" : valorInicial}
                      placeholder={col === "password" && type === "editar" ? "Dejar en blanco para mantener actual..." : `Introduce ${col}...`}
                      disabled={isSaving}
                      required={
                        col !== "avatar_url" && 
                        col !== "url" && 
                        col !== "descripcion" && 
                        col !== "imagen_url" && 
                        col !== "fondo_url" &&
                        !(col === "password" && type === "editar")
                      }
                      className="w-full bg-neutral-950 border border-neutral-800 focus:border-green-500 rounded-xl p-3 text-sm font-mono text-white placeholder-neutral-600 focus:outline-none transition-all disabled:opacity-50"
                    />

                    {col === "password" && (type === "crear" || type === "editar") && (
                      <div className="flex flex-col gap-1.5 mt-2">
                        <label className="text-xs font-semibold text-neutral-400 uppercase tracking-wider">
                          Confirmar Password
                        </label>
                        <input
                          type="password"
                          name="password_confirmation"
                          placeholder={type === "editar" ? "Repite la contraseña si la vas a cambiar..." : "Repite la contraseña..."}
                          disabled={isSaving}
                          required={type === "crear"}
                          className="w-full bg-neutral-950 border border-neutral-800 focus:border-green-500 rounded-xl p-3 text-sm font-mono text-white placeholder-neutral-600 focus:outline-none transition-all disabled:opacity-50"
                        />
                      </div>
                    )}
                  </>
                )}
              </div>
            );
          })}

          {type !== "ver" && (
            <div className="flex justify-end gap-3 pt-4 border-t border-neutral-800/60 mt-6">
              <button
                type="button"
                onClick={onClose}
                disabled={isSaving}
                className="px-5 py-2.5 bg-neutral-800 text-neutral-300 hover:text-white rounded-xl font-semibold transition-all text-sm disabled:opacity-50"
              >
                Cancelar
              </button>
              <button
                type="submit"
                disabled={isSaving}
                className="px-6 py-2.5 bg-green-500 hover:bg-green-600 disabled:bg-green-500/50 text-black font-bold rounded-xl transition-all text-sm"
              >
                {isSaving ? "Guardando..." : "Guardar Registro"}
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}