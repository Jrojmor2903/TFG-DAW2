import { useRef, useEffect, useState } from "react";

export function useSonido() {
  const musicaRef = useRef(null);
  const [volumenMusica, setVolumenMusica] = useState(0.5);
  const [volumenDisparo, setVolumenDisparo] = useState(0.3);

  // Inicializar música
  useEffect(() => {
    musicaRef.current = new Audio("/musica-nivel.mp3"); // ✅ tu archivo en /public
    musicaRef.current.loop = true;
    musicaRef.current.volume = volumenMusica;
    musicaRef.current.play().catch(() => {
      // El navegador bloquea autoplay hasta interacción del usuario
      const unlock = () => {
        musicaRef.current.play();
        window.removeEventListener("keydown", unlock);
        window.removeEventListener("click", unlock);
      };
      window.addEventListener("keydown", unlock);
      window.addEventListener("click", unlock);
    });

    return () => {
      musicaRef.current.pause();
      musicaRef.current = null;
    };
  }, []);

  // Sincronizar volumen música
  useEffect(() => {
    if (musicaRef.current) {
      musicaRef.current.volume = volumenMusica;
    }
  }, [volumenMusica]);

  const pausarMusica = () => musicaRef.current?.pause();
  const reanudarMusica = () => musicaRef.current?.play();

  return {
    volumenMusica,
    setVolumenMusica,
    volumenDisparo,
    setVolumenDisparo,
    pausarMusica,
    reanudarMusica,
  };
}