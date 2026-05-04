import { useState, useEffect } from "react";

export function usePausa(onPausar, onReanudar) {
  const [pausado, setPausado] = useState(false);

  useEffect(() => {
    const handleKey = (e) => {
      if (e.code === "Escape" || e.code === "KeyP") {
        setPausado((prev) => {
          const nuevoPausado = !prev;
          nuevoPausado ? onPausar?.() : onReanudar?.();
          return nuevoPausado;
        });
      }
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onPausar, onReanudar]);

  const continuar = () => {
    setPausado(false);
    onReanudar?.();
  };

  return { pausado, continuar };
}