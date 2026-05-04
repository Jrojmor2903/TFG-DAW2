import { useEffect, useRef, useState } from "react";

export function useHorizontalMovement(speed = 300) {
  const [x, setX] = useState(0);

  const keys = useRef({});
  const frame = useRef();
  const lastTime = useRef(0);

  const containerRef = useRef(null);
  const playerRef = useRef(null);

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

      setX((prev) => {
        let next = prev;

        if (keys.current["ArrowLeft"] || keys.current["KeyA"]) {
          next -= speed * delta;
        }
        if (keys.current["ArrowRight"] || keys.current["KeyD"]) {
          next += speed * delta;
        }

        const containerWidth = containerRef.current?.offsetWidth || 0;
        const playerWidth = playerRef.current?.offsetWidth || 0;

        const min = 0;
        const max = containerWidth - playerWidth;

        return Math.max(min, Math.min(max, next));
      });

      frame.current = requestAnimationFrame(loop);
    };

    frame.current = requestAnimationFrame(loop);

    return () => cancelAnimationFrame(frame.current);
  }, [speed]);

  return { x, containerRef, playerRef };
}