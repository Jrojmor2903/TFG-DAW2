import { useState, useEffect, useRef, useCallback } from "react";

const COLUMNAS = 9;

export function useEnemigos(
  containerRef,
  pausado = false,
  onGameOver,
  config = {},
  tiposEnemigo = []   // 👈 nuevo parámetro
) {
  const {
    velocidad = 80,
    intervaloOleada = 5000,
    enemigosOleada = 3,
  } = config;

  const velocidadRef = useRef(velocidad);
  const intervaloRef = useRef(intervaloOleada);
  const enemigosOleadaRef = useRef(enemigosOleada);
  const pausadoRef = useRef(pausado);
  const tiposEnemigoRef = useRef(tiposEnemigo);  // 👈

  useEffect(() => { velocidadRef.current = velocidad; }, [velocidad]);
  useEffect(() => { intervaloRef.current = intervaloOleada; }, [intervaloOleada]);
  useEffect(() => { enemigosOleadaRef.current = enemigosOleada; }, [enemigosOleada]);
  useEffect(() => { pausadoRef.current = pausado; }, [pausado]);
  useEffect(() => { tiposEnemigoRef.current = tiposEnemigo; }, [tiposEnemigo]); // 👈

  const [enemigos, setEnemigos] = useState([]);

  const frameRef = useRef();
  const lastTimeRef = useRef(0);
  const oleadaRef = useRef(null);

  const generarOleada = useCallback(() => {
    const containerWidth = containerRef.current?.clientWidth || window.innerWidth;
    const anchColumna = containerWidth / COLUMNAS;
    const tipos = tiposEnemigoRef.current;

    // Si aún no hay tipos cargados, no generar
    if (!tipos || tipos.length === 0) return;

    const columnas = [...Array(COLUMNAS).keys()]
      .sort(() => Math.random() - 0.5)
      .slice(0, enemigosOleadaRef.current);

    const nuevos = columnas.map((col) => {
      // Elegir tipo aleatorio entre los disponibles para este nivel
      const tipo = tipos[Math.floor(Math.random() * tipos.length)];
      const vidaMax = tipo.vida_base ?? 1;

      return {
        id: `${Date.now()}-${col}-${Math.random()}`,
        x: col * anchColumna + anchColumna / 2 - 24,
        y: -48,
        columna: col,
        vida: vidaMax,
        vidaMax,
        tipoId: tipo.id,           // 👈 para contar derrotados por tipo
        imagen_url: tipo.imagen_url ?? "/Enemigo.png",  // 👈
      };
    });

    setEnemigos((prev) => [...prev, ...nuevos]);
  }, [containerRef]);

  // Movimiento
  useEffect(() => {
    const loop = (time) => {
      if (!lastTimeRef.current) lastTimeRef.current = time;
      const delta = (time - lastTimeRef.current) / 1000;
      lastTimeRef.current = time;

      if (!pausadoRef.current) {
        setEnemigos((prev) => {
          const alturaLimite = containerRef.current?.offsetHeight || window.innerHeight;

          const actualizados = prev.map((e) => ({
            ...e,
            y: e.y + velocidadRef.current * delta,
          }));

          // Solo game over si el enemigo supera el límite Y ya era visible (y > 0)
          // Así evitamos el game over fantasma al generar enemigos
          const llego = actualizados.some(
            (e) => e.y > alturaLimite && e.y - velocidadRef.current * delta > 0
          );

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

  // Oleadas
  useEffect(() => {
    // Esperar a que haya tipos antes de la primera oleada
    if (tiposEnemigo.length === 0) return;

    generarOleada();

    oleadaRef.current = setInterval(() => {
      if (!pausadoRef.current) generarOleada();
    }, intervaloRef.current);

    return () => clearInterval(oleadaRef.current);
  }, [generarOleada, intervaloOleada, tiposEnemigo.length]); // 👈 depende de que haya tipos

  const golpearEnemigo = useCallback((id) => {
    setEnemigos((prev) =>
      prev
        .map((e) => e.id === id ? { ...e, vida: e.vida - 1 } : e)
        .filter((e) => e.vida > 0)
    );
  }, []);

  return {
    enemigos,
    setEnemigos,
    golpearEnemigo,
  };
}