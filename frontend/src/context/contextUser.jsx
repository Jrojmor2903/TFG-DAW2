import { createContext, useState, useEffect } from "react";

// eslint-disable-next-line react-refresh/only-export-components
export const UserContext = createContext();

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const [roles, setRoles] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    try {
      const storedToken = localStorage.getItem("token");
      const storedUser = localStorage.getItem("user");
      const storedRoles = localStorage.getItem("roles");

      if (storedToken && storedUser) {
        setToken(storedToken);
        setUser(JSON.parse(storedUser));
        setRoles(JSON.parse(storedRoles));
      }
    } catch (err) {
      setError("Error leyendo los datos del usuario : " + err);
    } finally {
      setLoading(false);
    }
  }, []);

  const login = (res) => {
    try {
      const user = res.data.user;
      const roles = res.data.roles;
      const token = res.data.token;

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("roles", JSON.stringify(roles));

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
  };

  return (
    <UserContext.Provider
      value={{
        user,
        roles,
        token,
        login,
        logout,
        loading,
        error,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}