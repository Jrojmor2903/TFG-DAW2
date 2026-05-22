import { useEffect, useState, useRef } from "react";

export function useVerticalBG(speed = 100, pausado = false) {
  const [y, setY] = useState(0);
  const pausadoRef = useRef(pausado);
  useEffect(() => { pausadoRef.current = pausado; }, [pausado]);

  useEffect(() => {
    let frame;
    let lastTime = 0;

    const loop = (time) => {
      if (!lastTime) lastTime = time;
      const delta = (time - lastTime) / 1000;
      lastTime = time;

      if (!pausadoRef.current) {
        setY((prev) => prev + speed * delta);
      }

      frame = requestAnimationFrame(loop);
    };

    frame = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(frame);
  }, [speed]);

  return y;
}