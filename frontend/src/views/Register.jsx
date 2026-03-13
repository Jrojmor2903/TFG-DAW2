import api from "../components/axios/api";
import { useState } from "react";
import styles from "./Modules/Login.module.css"

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/register", { email, password });
      alert("Login correcto");
    } catch (err) {
      console.error(err);
      alert("Login fallido");
    }
  };

  return (
    <div className={styles["contenedor"]}>

      <form onSubmit={handleSubmit} className={styles["form"]}>
        <h1>Crear Usuario</h1>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Contraseña"
        />
        <button type="submit">Entrar</button>
      </form>
    </div>
  );
}
export default Login;