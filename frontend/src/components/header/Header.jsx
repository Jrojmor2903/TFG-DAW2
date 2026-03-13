import { NavLink } from "react-router-dom"

import styles from "./modules/Header.module.css";


const Header = () => {

  return (
    <div className={styles["header"]}>
      <div className={styles["contenedor-imagen"]}>
        <NavLink to="/">
          <img src="/Logo.png"/>
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
        >
          Cerrar Sesión
        </NavLink>
      </div>

    </div>
  );
};





export default Header;