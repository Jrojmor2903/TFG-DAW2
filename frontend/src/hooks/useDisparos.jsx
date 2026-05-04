import { useState, useEffect, useRef, useCallback } from "react";

const VELOCIDAD_DISPARO = 600;
const COOLDOWN = 300;

export function useDisparos(getPlayerX, getPlayerWidth, volumenDisparo = 0.3, pausado = false) {
  const [disparos, setDisparos] = useState([]);
  const frameRef = useRef();
  const lastTimeRef = useRef(0);
  const lastShotRef = useRef(0);
  const spacePressed = useRef(false);

  // ✅ Audio del disparo
  const audioRef = useRef(null);
  useEffect(() => {
    audioRef.current = new Audio("/disparo.mp3");
    audioRef.current.volume = volumenDisparo;
  }, []);

  // ✅ Sincronizar volumen cuando cambia desde el modal
  const volumenRef = useRef(volumenDisparo);
  useEffect(() => {
    volumenRef.current = volumenDisparo;
    if (audioRef.current) {
      audioRef.current.volume = volumenDisparo;
    }
  }, [volumenDisparo]);

  // ✅ Sincronizar pausa
  const pausadoRef = useRef(pausado);
  useEffect(() => {
    pausadoRef.current = pausado;
  }, [pausado]);

  // Escuchar Space
  useEffect(() => {
    const down = (e) => {
      if (e.code === "Space") {
        e.preventDefault();
        spacePressed.current = true;
      }
    };
    const up = (e) => {
      if (e.code === "Space") {
        spacePressed.current = false;
      }
    };

    window.addEventListener("keydown", down);
    window.addEventListener("keyup", up);

    return () => {
      window.removeEventListener("keydown", down);
      window.removeEventListener("keyup", up);
    };
  }, []);

  // Loop principal
  useEffect(() => {
    const loop = (time) => {
      if (!lastTimeRef.current) lastTimeRef.current = time;
      const delta = (time - lastTimeRef.current) / 1000;
      lastTimeRef.current = time;

      // ✅ Si pausado, no hace nada
      if (!pausadoRef.current) {

        if (spacePressed.current) {
          const now = Date.now();
          if (now - lastShotRef.current >= COOLDOWN) {
            lastShotRef.current = now;

            // ✅ Sonido con volumen actual
            if (audioRef.current) {
              audioRef.current.currentTime = 0;
              audioRef.current.volume = volumenRef.current;
              audioRef.current.play();
            }

            const playerX = getPlayerX();
            const playerWidth = getPlayerWidth();

            setDisparos((prev) => [
              ...prev,
              {
                id: now,
                x: playerX + playerWidth / 2 - 18,
                y: window.innerHeight - 120,
                explota: false,
              },
            ]);
          }
        }

        setDisparos((prev) =>
          prev
            .map((d) => ({
              ...d,
              y: d.explota ? d.y : d.y - VELOCIDAD_DISPARO * delta,
            }))
            .filter((d) => {
              if (d.y < -32) return false;
              if (d.explota && Date.now() - d.explotaTime > 600) return false;
              return true;
            })
        );
      }

      frameRef.current = requestAnimationFrame(loop);
    };

    frameRef.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(frameRef.current);
  }, [getPlayerX, getPlayerWidth]);

  const explotarDisparo = useCallback((id) => {
    setDisparos((prev) =>
      prev.map((d) =>
        d.id === id ? { ...d, explota: true, explotaTime: Date.now() } : d
      )
    );
  }, []);

  return { disparos, explotarDisparo };
}