import { NavLink } from "react-router-dom"
import { useUser } from "../../hooks/useUser";
import ImagenHover from "../imagenEffect/ImagenHover";
import styles from "./modules/Header.module.css";



const Header = () => {

  const { logout } = useUser();

  return (
    <div className={styles["header"]}>
      <div className={styles["contenedor-imagen"]}>
        <NavLink to="/">
          <ImagenHover classname="w-20"/>
        </NavLink>
      </div>

      <div className={styles["contenedor-navegador"]}>
        <NavLink
          to="/perfil"
          className={({ isActive }) =>
            isActive ? `${styles["link"]} ${styles["activo"]}` : styles["link"]
          }
        >
          Perfil
        </NavLink>

        <NavLink
          to="/logros"
          className={({ isActive }) =>
            isActive ? `${styles["link"]} ${styles["activo"]}` : styles["link"]
          }
        >
          Logros
        </NavLink>

        <NavLink
          to="/ranking"
          className={({ isActive }) =>
            isActive ? `${styles["link"]} ${styles["activo"]}` : styles["link"]
          }
        >
          Ranking
        </NavLink>

        <NavLink
          to="/naves"
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
          onClick={logout}
        >
          Cerrar Sesión
        </NavLink>
      </div>

    </div>
  );
};

export default Header;