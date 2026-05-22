import React from 'react';

export function AdminModal({ type, entity, columns, rolesBackend = [], onClose, onSave }) {
  if (!type) return null;

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-neutral-900 border border-neutral-800 rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden">
        
        {/* Cabecera */}
        <div className="p-6 border-b border-neutral-800 flex justify-between items-center bg-neutral-950">
          <h2 className="text-xl font-bold uppercase tracking-wider">
            {type === "ver" && "👁️ Detalles del"}
            {type === "crear" && "➕ Crear Nuevo"}
            {type === "editar" && "✏️ Editar"} Registro
          </h2>
          <button type="button" onClick={onClose} className="text-neutral-400 hover:text-white transition-colors text-xl">
            &times;
          </button>
        </div>

        {/* Formulario */}
        <form onSubmit={onSave} className="p-6 space-y-4 max-h-[70vh] overflow-y-auto scrollbar-none">
          {columns.map((col) => {
            if (col === "id") return null;

            let valorInicial = entity ? entity[col] : "";

            // 🔑 Extracción del ID del rol actual para pre-seleccionarlo en el modo Edición
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
                        if (Array.isArray(entity?.roles)) return entity.roles.map(r => r.nombre).join(", ");
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
                  /* ==========================================================================
                     🔑 SELECTOR TOTALMENTE DINÁMICO DESDE BACKEND
                     ========================================================================== */
                  <select
                    name="rol[]"
                    defaultValue={valorInicial}
                    required
                    className="w-full bg-neutral-950 border border-neutral-800 focus:border-green-500 rounded-xl p-3 text-sm font-sans text-white focus:outline-none transition-all cursor-pointer"
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
                    {/* Input principal de la columna (password, email o texto) */}
                    <input
                      type={col === "email" ? "email" : col === "password" ? "password" : "text"}
                      name={col}
                      defaultValue={valorInicial}
                      placeholder={`Introduce ${col}...`}
                      required={col !== "avatar_url" && col !== "url" && col !== "descripcion" && col !== "imagen_url" && col !== "fondo_url"}
                      className="w-full bg-neutral-950 border border-neutral-800 focus:border-green-500 rounded-xl p-3 text-sm font-mono text-white placeholder-neutral-600 focus:outline-none transition-all"
                    />

                    {/* 🚀 SI EL MÓDULO PIDE PASSWORD, AQUÍ SINCRO-INYECTAMOS EL INPUT DE CONFIRMACIÓN */}
                    {col === "password" && (type === "crear" || type === "editar") && (
                      <div className="flex flex-col gap-1.5 mt-2">
                        <label className="text-xs font-semibold text-neutral-400 uppercase tracking-wider">
                          Confirmar Password
                        </label>
                        <input
                          type="password"
                          name="password_confirmation"
                          defaultValue={valorInicial} // Mismo valor inicial si estamos editando
                          placeholder="Repite la contraseña..."
                          required={type === "crear"} // Solo obligatorio al crear un usuario nuevo
                          className="w-full bg-neutral-950 border border-neutral-800 focus:border-green-500 rounded-xl p-3 text-sm font-mono text-white placeholder-neutral-600 focus:outline-none transition-all"
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
                className="px-5 py-2.5 bg-neutral-800 text-neutral-300 hover:text-white rounded-xl font-semibold transition-all text-sm"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="px-6 py-2.5 bg-green-500 hover:bg-green-600 text-black font-bold rounded-xl transition-all text-sm"
              >
                Guardar Registro
              </button>
            </div>
          )}
        </form>

      </div>
    </div>
  );
}