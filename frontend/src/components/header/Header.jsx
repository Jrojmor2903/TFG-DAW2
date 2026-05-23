import { useState } from "react"; // 👈 Importamos useState
import { NavLink } from "react-router-dom";
import { useUser } from "../../hooks/useUser";
import ImagenHover from "../imagenEffect/ImagenHover";
import styles from "./modules/Header.module.css";

const Header = () => {
  const { user, roles, loading, logout } = useUser();
  const [menuAbierto, setMenuAbierto] = useState(false); // 👈 Estado para controlar el menú

  const isAdmin = !loading && user && roles?.some(role => role.slug === "admin");
  const isCreador = !loading && user && roles?.some(role => role.slug === "cread");

  // Función para cerrar el menú al hacer clic en un enlace (comportamiento móvil ideal)
  const cerrarMenu = () => setMenuAbierto(false);

  return (
    <div className={styles["header"]}>
      <div className={styles["contenedor-imagen"]}>
        <NavLink to="/" onClick={cerrarMenu}>
          <ImagenHover classname="w-20"/>
        </NavLink>
      </div>

      {/* 🍔 Botón Hamburguesa: Solo se verá en pantallas pequeñas */}
      <button 
        className={`${styles["boton-hamburguesa"]} ${menuAbierto ? styles["abierto"] : ""}`}
        onClick={() => setMenuAbierto(!menuAbierto)}
        aria-label="Abrir menú de navegación"
      >
        <span className={styles["linea"]}></span>
        <span className={styles["linea"]}></span>
        <span className={styles["linea"]}></span>
      </button>

      {/* 📱 Contenedor de navegación: Añade clase dinámica según el estado */}
      <div className={`${styles["contenedor-navegador"]} ${menuAbierto ? styles["menu-activo"] : ""}`}>
        <NavLink
          to="/perfil"
          onClick={cerrarMenu}
          className={({ isActive }) =>
            isActive ? `${styles["link"]} ${styles["activo"]}` : styles["link"]
          }
        >
          Perfil
        </NavLink>

        {isAdmin && (
          <NavLink 
            to="/admin" 
            onClick={cerrarMenu}
            className={({ isActive }) =>
              isActive ? `${styles["link"]} ${styles["activo"]}` : styles["link"]
            }
          >
            Panel Admin
          </NavLink>
        )}

        <NavLink
          to="/logros"
          onClick={cerrarMenu}
          className={({ isActive }) =>
            isActive ? `${styles["link"]} ${styles["activo"]}` : styles["link"]
          }
        >
          Logros
        </NavLink>

        <NavLink
          to="/ranking"
          onClick={cerrarMenu}
          className={({ isActive }) =>
            isActive ? `${styles["link"]} ${styles["activo"]}` : styles["link"]
          }
        >
          Ranking
        </NavLink>

        <NavLink
          to="/naves"
          onClick={cerrarMenu}
          className={({ isActive }) =>
            isActive ? `${styles["link"]} ${styles["activo"]}` : styles["link"]
          }
        >
          Naves
        </NavLink>

        <NavLink
          to="/logout"
          className={({ isActive }) =>
            isActive ? `${styles["link"]} ${styles["activo"]}` : styles["link"]
          }
          onClick={() => { logout(); cerrarMenu(); }}
        >
          Cerrar Sesión
        </NavLink>
      </div>
    </div>
  );
};

export default Header;