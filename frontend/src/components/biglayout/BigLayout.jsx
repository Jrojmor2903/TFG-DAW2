import styles from "./modules/BigLayout.module.css"
import Header from "../header/Header";
import { Outlet } from "react-router-dom";

const Biglayout = () => {
  return (
    <div className={styles["pagina"]}>
      <Header className={styles["header"]}/>
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default Biglayout;