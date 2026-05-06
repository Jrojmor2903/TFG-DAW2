import { useState, useEffect, useRef, useCallback } from "react";

const COLUMNAS = 9;

export function useEnemigos(
  containerRef,
  pausado = false,
  onGameOver,
  config = {}
) {
  const {
    velocidad = 80,
    intervaloOleada = 5000,
    enemigosOleada = 3,
  } = config;

  // refs para evitar recrear el loop
  const velocidadRef = useRef(velocidad);
  const intervaloRef = useRef(intervaloOleada);
  const enemigosOleadaRef = useRef(enemigosOleada);
  const pausadoRef = useRef(pausado);

  useEffect(() => { velocidadRef.current = velocidad; }, [velocidad]);
  useEffect(() => { intervaloRef.current = intervaloOleada; }, [intervaloOleada]);
  useEffect(() => { enemigosOleadaRef.current = enemigosOleada; }, [enemigosOleada]);
  useEffect(() => { pausadoRef.current = pausado; }, [pausado]);

  const [enemigos, setEnemigos] = useState([]);

  const frameRef = useRef();
  const lastTimeRef = useRef(0);
  const oleadaRef = useRef(null);

  // ✅ Generar enemigos correctamente
  const generarOleada = useCallback(() => {
    const containerWidth =
      containerRef.current?.offsetWidth || window.innerWidth;

    const anchColumna = containerWidth / COLUMNAS;

    const columnas = [...Array(COLUMNAS).keys()]
      .sort(() => Math.random() - 0.5)
      .slice(0, enemigosOleadaRef.current);

    const nuevos = columnas.map((col) => {
      const vidaMax = 1;

      return {
        id: `${Date.now()}-${col}-${Math.random()}`,
        x: col * anchColumna + anchColumna / 2 - 24,
        y: -48,
        columna: col,
        vida: vidaMax,
        avatar_url: null,
      };
    });

    setEnemigos((prev) => [...prev, ...nuevos]);
  }, [containerRef]);

  // ✅ Loop de movimiento
  useEffect(() => {
    const loop = (time) => {
      if (!lastTimeRef.current) lastTimeRef.current = time;

      const delta = (time - lastTimeRef.current) / 1000;
      lastTimeRef.current = time;

      if (!pausadoRef.current) {
        setEnemigos((prev) => {
          const actualizados = prev.map((e) => ({
            ...e,
            y: e.y + velocidadRef.current * delta,
          }));

          const alturaLimite =
            containerRef.current?.offsetHeight || window.innerHeight;

          const llego = actualizados.some((e) => e.y > alturaLimite);

          if (llego) {
            onGameOver?.();
            return [];
          }

          return actualizados;
        });
      }

      frameRef.current = requestAnimationFrame(loop);
    };

    frameRef.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(frameRef.current);
  }, [containerRef, onGameOver]);

  // ✅ Control de oleadas
  useEffect(() => {
    generarOleada();

    const arrancarIntervalo = () => {
      clearInterval(oleadaRef.current);

      oleadaRef.current = setInterval(() => {
        if (!pausadoRef.current) generarOleada();
      }, intervaloRef.current);
    };

    arrancarIntervalo();

    return () => clearInterval(oleadaRef.current);
  }, [generarOleada, intervaloOleada]);

  // ✅ Golpear enemigo (vida)
  const golpearEnemigo = useCallback((id) => {
    setEnemigos((prev) =>
      prev
        .map((e) =>
          e.id === id ? { ...e, vida: (e.vida ?? 1) - 1 } : e
        )
        .filter((e) => e.vida > 0)
    );
  }, []);

  return {
    enemigos,
    setEnemigos,
    golpearEnemigo,
  };
}