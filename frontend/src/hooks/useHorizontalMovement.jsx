import { useEffect, useRef, useState } from "react";

export function useHorizontalMovement(speed = 300, pausado = false) {
  const [x, setX] = useState(0);
  const keys = useRef({});
  const frame = useRef();
  const lastTime = useRef(0);
  const containerRef = useRef(null);
  const playerRef = useRef(null);
  const pausadoRef = useRef(pausado);
  // ── táctil: "ArrowLeft" | "ArrowRight" | null
  const touchDirRef = useRef(null);

  useEffect(() => { pausadoRef.current = pausado; }, [pausado]);

  useEffect(() => {
    const down = (e) => (keys.current[e.code] = true);
    const up = (e) => (keys.current[e.code] = false);
    window.addEventListener("keydown", down);
    window.addEventListener("keyup", up);
    return () => {
      window.removeEventListener("keydown", down);
      window.removeEventListener("keyup", up);
    };
  }, []);

  useEffect(() => {
    const loop = (time) => {
      if (!lastTime.current) lastTime.current = time;
      const delta = (time - lastTime.current) / 1000;
      lastTime.current = time;

      if (!pausadoRef.current) {
        setX((prev) => {
          let next = prev;
          const goLeft  = keys.current["ArrowLeft"]  || keys.current["KeyA"] || touchDirRef.current === "left";
          const goRight = keys.current["ArrowRight"] || keys.current["KeyD"] || touchDirRef.current === "right";
          if (goLeft)  next -= speed * delta;
          if (goRight) next += speed * delta;
          const containerWidth = containerRef.current?.offsetWidth || 0;
          const playerWidth    = playerRef.current?.offsetWidth    || 0;
          return Math.max(0, Math.min(containerWidth - playerWidth, next));
        });
      }

      frame.current = requestAnimationFrame(loop);
    };

    frame.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(frame.current);
  }, [speed]);

  return { x, containerRef, playerRef, touchDirRef };
}