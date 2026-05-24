import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../components/axios/api";
import { AdminModalNivel } from "../components/Modal/AdminModalNivel";
import { AdminModalRanking } from "../components/Modal/AdminModalRanking";
import AdminModal from "../components/Modal/AdminModal";

const SECTIONS = {
  usuarios: {
    label: "Usuarios",
    endpoint: "/user",
    columns: ["id", "name", "email", "password", "nivel_actual", "rol", "avatar_url"],
  },
  roles: {
    label: "Roles",
    endpoint: "/rol",
    columns: ["id", "nombre", "slug"],
  },
  logros: {
    label: "Logros",
    endpoint: "/logro",
    columns: ["id", "nombre", "descripcion", "url"],
  },
  rankings: {
    label: "Rankings",
    endpoint: "/ranking",
    columns: ["id", "usuario_nombre", "puntuacion", "posicion"],
  },
  niveles: {
    label: "Niveles",
    endpoint: "/nivel",
    columns: ["id", "nombre_nivel", "dificultad", "fondo_url"],
  },
  enemigos: {
    label: "Enemigos",
    endpoint: "/enemigo",
    columns: ["id", "nombre", "vida", "daño", "imagen_url"],
  },
};

export default function AdminDashboard() {
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState("usuarios");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [rolesBackend, setRolesBackend] = useState([]);
  const [verPapelera, setVerPapelera] = useState(false);
  const [currentEntity, setCurrentEntity] = useState(null);
  const [modalType, setModalType] = useState(null);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        let url = SECTIONS[activeTab].endpoint;
        if (activeTab === "usuarios" && verPapelera) url = "/users-deleted";
        const res = await api.get(url);
        setData(res.data.data || res.data || []);
      } catch (err) {
        console.warn(`El endpoint para ${activeTab} no está disponible:`, err.message);
        setData([]);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [activeTab, verPapelera]);

  useEffect(() => {
    async function cargarRoles() {
      try {
        const res = await api.get("/rol");
        setRolesBackend(res.data.data || res.data || []);
      } catch (err) {
        console.error("No se pudieron cargar los roles:", err);
      }
    }
    cargarRoles();
  }, []);

  const cambiarPestana = (key) => {
    setVerPapelera(false);
    setActiveTab(key);
    setModalType(null);
  };

  const handleDelete = async (id) => {
    if (!window.confirm(`¿Seguro que deseas eliminar este registro de ${activeTab}?`)) return;
    try {
      await api.delete(`${SECTIONS[activeTab].endpoint}/${id}`);
      setData((prev) => prev.filter((item) => item.id !== id));
    } catch {
      alert("Error al eliminar el recurso.");
    }
  };

  const handleRestoreUser = async (id) => {
    try {
      await api.post(`/user/${id}/restore`);
      setData((prev) => prev.filter((item) => item.id !== id));
      alert("Usuario restaurado con éxito.");
    } catch {
      alert("Error al restaurar el usuario.");
    }
  };

  const handleForceDeleteUser = async (id) => {
    if (!window.confirm("⚠️ ¿Deseas borrar permanentemente este usuario?")) return;
    try {
      await api.delete(`/user/${id}/force`);
      setData((prev) => prev.filter((item) => item.id !== id));
    } catch {
      alert("Error al destruir permanentemente el usuario.");
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    const formData = new FormData(e.target);
    const payload = {};

    formData.forEach((value, key) => {
      if (key.endsWith("[]")) {
        const cleanKey = key.replace("[]", "");
        if (!payload[cleanKey]) payload[cleanKey] = [];
        if (value !== "") payload[cleanKey].push(Number(value) || value);
      } else {
        if (value !== "" && !isNaN(value) && key !== "email" && key !== "slug" && key !== "password") {
          payload[key] = Number(value);
        } else {
          payload[key] = value === "" ? null : value;
        }
      }
    });

    if (modalType === "editar" && !payload.password) {
      delete payload.password;
      delete payload.password_confirmation;
    }

    try {
      if (modalType === "crear") {
        const res = await api.post(SECTIONS[activeTab].endpoint, payload);
        setData((prev) => [...prev, res.data.data || res.data]);
        alert("Registro creado con éxito.");
      } else if (modalType === "editar") {
        const res = await api.put(`${SECTIONS[activeTab].endpoint}/${currentEntity.id}`, payload);
        setData((prev) =>
          prev.map((item) => item.id === currentEntity.id ? res.data.data || res.data : item)
        );
        alert("Registro actualizado con éxito.");
      }
      setModalType(null);
    } catch (err) {
      const msg = err.response?.data?.message || "Error interno del servidor.";
      alert(`No se pudo procesar: ${msg}`);
    } finally {
      setIsSaving(false);
    }
  };

  const handleSaveNivel = async (payload) => {
    setIsSaving(true);
    try {
      if (modalType === "crear") {
        const res = await api.post("/nivel", payload);
        setData((prev) => [...prev, res.data.data || res.data]);
        alert("Nivel creado con éxito.");
      } else if (modalType === "editar") {
        const res = await api.put(`/nivel/${currentEntity.id}`, payload);
        setData((prev) =>
          prev.map((item) => item.id === currentEntity.id ? res.data.data || res.data : item)
        );
        alert("Nivel actualizado con éxito.");
      }
      setModalType(null);
    } catch (err) {
      const msg = err.response?.data?.message || "Error al guardar el nivel.";
      alert(`No se pudo procesar: ${msg}`);
    } finally {
      setIsSaving(false);
    }
  };

  const handleSaveRanking = async (payload) => {
    setIsSaving(true);
    try {
      if (modalType === "crear") {
        const res = await api.post("/ranking", payload);
        setData((prev) => [...prev, res.data.data || res.data]);
        alert("Ranking creado con éxito.");
      } else if (modalType === "editar") {
        const res = await api.put(`/ranking/${currentEntity.id}`, payload);
        setData((prev) =>
          prev.map((item) => item.id === currentEntity.id ? res.data.data || res.data : item)
        );
        alert("Ranking actualizado con éxito.");
      }
      setModalType(null);
    } catch (err) {
      const msg = err.response?.data?.message || "Error al guardar el ranking.";
      alert(`No se pudo procesar: ${msg}`);
    } finally {
      setIsSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-neutral-950 text-green-400 font-mono flex items-center justify-center tracking-widest animate-pulse">
        SINCRO-DATOS: CARGANDO {verPapelera ? "PAPELERA DE" : "REGISTROS DE"}{" "}
        {activeTab.toUpperCase()}...
      </div>
    );
  }

  const currentCols = SECTIONS[activeTab].columns;

  const renderModal = () => {
    if (!modalType) return null;

    if (activeTab === "niveles") {
      return (
        <AdminModalNivel
          type={modalType}
          entity={currentEntity}
          onClose={() => setModalType(null)}
          onSave={handleSaveNivel}
          isSaving={isSaving}
        />
      );
    }

    if (activeTab === "rankings") {
      return (
        <AdminModalRanking
          type={modalType}
          entity={currentEntity}
          onClose={() => setModalType(null)}
          onSave={handleSaveRanking}
          isSaving={isSaving}
        />
      );
    }

    return (
      <AdminModal
        type={modalType}
        entity={currentEntity}
        columns={currentCols}
        rolesBackend={rolesBackend}
        onClose={() => setModalType(null)}
        onSave={handleSave}
        isSaving={isSaving}
      />
    );
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-white p-4 md:p-8 font-sans">
      {/* Encabezado */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-neutral-800 pb-6 mb-8 gap-4">
        <div>
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-white">
            Panel de Control{" "}
            <span className="text-[var(--tema-visual,rgb(34,197,94))]">Admin</span>
          </h1>
        </div>
        <div className="flex flex-wrap gap-3 w-full md:w-auto">
          {activeTab === "usuarios" && (
            <button
              onClick={() => setVerPapelera(!verPapelera)}
              className={`px-5 py-3 font-bold rounded-xl border transition-all text-sm ${
                verPapelera
                  ? "bg-red-500/20 text-red-400 border-red-500"
                  : "bg-neutral-900 text-neutral-400 border-neutral-800 hover:text-white"
              }`}
            >
              {verPapelera ? "Ver Activos" : "Ver Papelera"}
            </button>
          )}
          {!verPapelera && (
            <button
              onClick={() => {
                setCurrentEntity({});
                setModalType("crear");
              }}
              className="w-full md:w-auto px-6 py-3 bg-[var(--tema-visual,rgb(34,197,94))] text-white font-bold rounded-xl transition-all hover:scale-105 text-center text-sm"
            >
              Crear Nuevo Registro
            </button>
          )}
        </div>
      </div>

      {/* Pestañas */}
      <div className="flex gap-2 mb-6 border-b border-neutral-800 pb-2 overflow-x-auto scrollbar-none snap-x">
        {Object.entries(SECTIONS).map(([key, config]) => (
          <button
            key={key}
            onClick={() => cambiarPestana(key)}
            className={`snap-origin-left px-5 py-2.5 rounded-t-xl font-semibold transition-all duration-200 whitespace-nowrap ${
              activeTab === key
                ? "bg-neutral-800 text-[var(--tema-visual,rgb(34,197,94))] border-b-2 border-[var(--tema-visual,rgb(34,197,94))]"
                : "text-neutral-400 hover:text-white hover:bg-neutral-900"
            }`}
          >
            {config.label}
          </button>
        ))}
      </div>

      {/* Tabla */}
      <div className="w-full bg-neutral-900/40 border border-neutral-800 rounded-2xl overflow-x-auto backdrop-blur-sm shadow-xl">
        <table className="w-full min-w-[700px] md:min-w-full text-left border-collapse table-auto">
          <thead>
            <tr className="bg-neutral-950 border-b border-neutral-800 text-neutral-400 text-xs md:text-sm font-semibold uppercase tracking-wider">
              {currentCols.map((col) => (
                <th key={col} className="p-4">{col}</th>
              ))}
              <th className="p-4 text-center">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-800/60">
            {data.length === 0 ? (
              <tr>
                <td
                  colSpan={currentCols.length + 1}
                  className="p-8 text-center text-neutral-500 font-mono text-xs md:text-sm"
                >
                  {verPapelera
                    ? "La papelera está vacía."
                    : `Módulo [${activeTab.toUpperCase()}] sin registros.`}
                </td>
              </tr>
            ) : (
              data.map((item) => (
                <tr key={item.id} className="hover:bg-neutral-900/30 transition-colors">
                  {currentCols.map((col) => (
                    <td
                      key={col}
                      className="p-4 text-xs md:text-sm max-w-[150px] md:max-w-xs truncate font-mono text-neutral-200"
                    >
                      {col === "rol"
                        ? (() => {
                            if (Array.isArray(item.roles) && item.roles.length > 0)
                              return item.roles.map((r) => r.nombre || r.name).join(", ");
                            if (Array.isArray(item.asignaciones) && item.asignaciones.length > 0)
                              return item.asignaciones.map((a) => a.rol?.nombre || `Rol #${a.rol_id}`).join(", ");
                            if (item.rol && typeof item.rol === "object")
                              return item.rol.nombre || item.rol.name || "Asignado";
                            return "Sin Rol";
                          })()
                        : typeof item[col] === "object"
                          ? JSON.stringify(item[col])
                          : String(item[col] ?? "N/A")}
                    </td>
                  ))}
                  <td className="p-4 flex gap-1.5 justify-center items-center whitespace-nowrap">
                    {activeTab === "usuarios" && verPapelera ? (
                      <>
                        <button
                          onClick={() => handleRestoreUser(item.id)}
                          className="px-3 py-1.5 bg-green-500/10 text-green-400 border border-green-500/20 rounded-lg text-xs font-semibold hover:bg-green-500 hover:text-white transition-all"
                        >
                          Restaurar
                        </button>
                        <button
                          onClick={() => handleForceDeleteUser(item.id)}
                          className="px-3 py-1.5 bg-red-600/20 text-red-400 border border-red-500/30 rounded-lg text-xs font-semibold hover:bg-red-600 hover:text-white transition-all"
                        >
                          Borrado Permanente
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          onClick={() => { setCurrentEntity(item); setModalType("ver"); }}
                          className="px-2.5 py-1.5 bg-blue-500/10 text-blue-400 border border-blue-500/20 rounded-lg text-xs font-semibold hover:bg-blue-500 hover:text-white transition-all"
                        >
                          Ver
                        </button>
                        <button
                          onClick={() => { setCurrentEntity(item); setModalType("editar"); }}
                          className="px-2.5 py-1.5 bg-yellow-500/10 text-yellow-400 border border-yellow-500/20 rounded-lg text-xs font-semibold hover:bg-yellow-500 hover:text-white transition-all"
                        >
                          Editar
                        </button>
                        <button
                          onClick={() => handleDelete(item.id)}
                          className="px-3 py-1.5 bg-red-500/10 text-red-400 border border-red-500/20 rounded-lg text-xs font-semibold hover:bg-red-500 hover:text-white transition-all"
                        >
                          Eliminar
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {renderModal()}
    </div>
  );
}