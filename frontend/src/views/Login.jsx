import api from "../components/axios/api";
import { useState } from "react";
import { useUser } from "../hooks/useUser";
import { useNavigate } from "react-router-dom";
import LoadingPage from "../components/Loading/LoadingPage";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login } = useUser();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await api.post("/login", { email, password });
      login(res);
      navigate("/");
    } catch (err) {
      console.error(err);
      setError("Email o contraseña incorrectos");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <LoadingPage />;

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

        {error && (
          <p className="text-red-400 text-sm text-center">{error}</p>
        )}

        <button
          type="submit"
          className="w-[150%] p-2.5 rounded-[15px] bg-(--verde-base) text-sh-verde transition duration-500"
        >
          Entrar
        </button>

        <a onClick={() => navigate("/register")} className="cursor-pointer">
          Crear Cuenta
        </a>
      </form>
    </div>
  );
}

export default Login;