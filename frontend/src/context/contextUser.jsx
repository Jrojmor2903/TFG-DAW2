import { createContext, useState, useEffect } from "react";
import api, { validarToken } from "../components/axios/api";

// eslint-disable-next-line react-refresh/only-export-components
export const UserContext = createContext();

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const [roles, setRoles] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

useEffect(() => {
  const initAuth = async () => {
    try {
      const storedToken = localStorage.getItem("token");
      const storedUser = localStorage.getItem("user");
      const storedRoles = localStorage.getItem("roles");
      const storedTema = localStorage.getItem("tema_visual");

      if (storedToken && storedUser) {
        const esValido = await validarToken();

        if (esValido) {
          setToken(storedToken);
          setUser(JSON.parse(storedUser));
          setRoles(JSON.parse(storedRoles));
        } else {
          logout();
        }
      }

      if (storedTema) {
        document.documentElement.style.setProperty("--tema-visual", storedTema);
      }
    } catch (err) {
      setError("Error leyendo los datos del usuario: " + err);
    } finally {
      setLoading(false);
    }
  };

  initAuth();
}, []);

  const login = (res) => {
    try {
      const user = res.data.user;
      const roles = res.data.roles;
      const token = res.data.token;
      const tema = res.data.perfil?.tema_visual;

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("roles", JSON.stringify(roles));

      if (tema) {
        localStorage.setItem("tema_visual", tema);
        document.documentElement.style.setProperty("--tema-visual", tema);
      }

      setUser(user);
      setRoles(roles);
      setToken(token);
      setError(null);
    } catch (err) {
      setError("Error al iniciar sesión : " + err);
    }
  };

  const logout = () => {
    setUser(null);
    setRoles(null);
    setToken(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("roles");
    localStorage.removeItem("naves");
    localStorage.removeItem("tema_visual");
  };

  let saving = false;

  async function changeLevel(newLevel) {
    setUser((prev) => {
      const updated = { ...prev, nivel_actual: newLevel };
      localStorage.setItem("user", JSON.stringify(updated));
      return updated;
    });

    try {
      await api.patch(`/user/${user.id}/nivel`, {
        nivel_actual: newLevel,
      });
    } catch (err) {
      console.error("Error actualizando nivel:", err.response?.data);
    }
  }

async function updateAvatar(file) {
  if (!user) return;

  const formData = new FormData();
  formData.append("avatar", file);
  formData.append("nombreImg", user.name);

  try {
    const res = await api.post(`/user/${user.id}/avatar`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });


    const nuevaUrl = res.data.avatar_url;

    const updatedUser = { 
      ...user, 
      ...(res.data.data || {}),
      avatar_url: nuevaUrl
    };

    setUser(updatedUser);
    localStorage.setItem("user", JSON.stringify(updatedUser));
  } catch (err) {
    setError("Error al subir el avatar: " + err);
  }
}


  async function equiparNave(nave) {
    if (!user) return;


    const updatedUser = {
      ...user,
      perfil: {
        ...user.perfil,
        id_nave: nave.id,
      },
    };

    setUser(updatedUser);

    localStorage.setItem("user", JSON.stringify(updatedUser));

    if (saving) return;
    saving = true;

    try {

      await api.post("/user/equipar-nave", {
        nave_id: nave.id,
      });
    } catch (err) {
      setError("Error al equipar la nave en el servidor: " + err);
    } finally {
      saving = false;
    }
  }

  return (
    <UserContext.Provider
      value={{
        user,
        roles,
        token,
        login,
        logout,
        changeLevel,
        updateAvatar,
        equiparNave,
        loading,
        error,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
