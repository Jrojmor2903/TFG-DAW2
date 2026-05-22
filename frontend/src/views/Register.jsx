import api from "../components/axios/api";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (password !== passwordConfirmation) {
      setError("Las contraseñas no coinciden");
      return;
    }

    try {
      await api.post("/register", {
        name,
        email,
        password,
        password_confirmation: passwordConfirmation,
      });

      navigate("/login");

    } catch (err) {
      const errores = err.response?.data?.errors;
      if (errores) {
        setError(Object.values(errores).flat().join(" "));
      } else {
        setError("Error al registrarse. Inténtalo de nuevo.");
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen background-general">
      <form onSubmit={handleSubmit} className="form-log-reg text-sh-verde">
        <h1 className="text-white font-bold text-3xl">Crear cuenta</h1>

        <input
          className="input-log-reg"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Usuario"
        />
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
        <input
          className="input-log-reg"
          type="password"
          value={passwordConfirmation}
          onChange={(e) => setPasswordConfirmation(e.target.value)}
          placeholder="Repetir contraseña"
        />

        {error && (
          <p className="text-red-400 text-sm text-center">{error}</p>
        )}

        <button
          type="submit"
          className="w-[150%] p-2.5 rounded-[15px] bg-(--verde-base) text-sh-verde transition duration-500"
        >
          Registrarse
        </button>

        <p className="text-white/60 text-sm text-center">
          ¿Ya tienes cuenta?{" "}
          <span
            className="text-[var(--tema-visual)] cursor-pointer hover:underline"
            onClick={() => navigate("/login")}
          >
            Iniciar sesión
          </span>
        </p>
      </form>
    </div>
  );
}

export default Register;