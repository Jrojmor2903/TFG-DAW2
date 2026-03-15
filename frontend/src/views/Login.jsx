import api from "../components/axios/api";
import { useState } from "react";
import { useUser } from "../hooks/useUser";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { login } = useUser();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/login", { email, password });
      login(res);
      navigate("/");
    } catch (err) {
      console.error(err);
      alert("Login fallido");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen background-general">
      <form onSubmit={handleSubmit} className="form-log-reg text-sh-verde">
        <h1 className="text-white font-bold text-3xl">Iniciar Sesión</h1>
        <input
          className="input-log-reg"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        />
        <input
          className="input-log-reg"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Contraseña"
        />
        <button
          type="submit"
          className="btn text-sh-verde transition duration-500"
        >
          Entrar
        </button>
      </form>
    </div>
  );
}
export default Login;
