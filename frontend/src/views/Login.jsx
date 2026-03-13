import api from "../components/axios/api";
import { useState } from "react";
import styles from "./Modules/Login.module.css"
import { useUser } from "../hooks/useUser";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { user, login } = useUser();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {

      const res = await api.post("/login", { email, password });
      login(res);
      navigate('/register');

    } catch (err) {
      console.error(err);
      alert("Login fallido");
    }
  };

  return (
    <div className={styles["contenedor"]}>

      <form onSubmit={handleSubmit} className={styles["form"]}>
        <h1>Iniciar Sesión</h1>
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