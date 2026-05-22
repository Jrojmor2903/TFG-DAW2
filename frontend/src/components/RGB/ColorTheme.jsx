import { useEffect, useState } from "react";
import api from "../axios/api";
import { useUser } from "../../hooks/useUser";

function ColorTheme() {
  const { user } = useUser()
  const [color, setColor] = useState("#4affb7");
  const idPerfil = user.perfil.id
  // Cargar desde localStorage al entrar
  useEffect(() => {
    const saved = localStorage.getItem("tema_visual");
    if (saved) {
      setColor(saved);
      applyColor(saved);
    }
  }, []);

function applyColor(hex) {
    document.documentElement.style.setProperty("--tema-visual", hex);
}

  async function saveColor() {
    try {

      // 1. Guardar en backend
      await api.put(`/perfil/usuario/${user.id}`, { tema_visual: color });

      // 2. Guardar en localStorage
      localStorage.setItem("tema_visual", color);

      // 3. Aplicar visualmente
      applyColor(color);
    } catch (err) {
      console.error(err);
        console.error(err.response?.data); // ← this shows Laravel's actual error
    }
  }

  return (
    <div className="flex gap-4 items-center">
      <input
      className="h-12 w-12"
        type="color"
        value={color}
        onChange={(e) => setColor(e.target.value)}
      />

      <button
        onClick={saveColor}
        className="btn w-30 cursor-pointer"
      >
        Confirmar
      </button>
    </div>
  );
}

export default ColorTheme;