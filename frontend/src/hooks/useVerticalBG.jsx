import { useEffect, useState } from "react";

export function useVerticalBG(speed = 100) {
  const [y, setY] = useState(0);

  useEffect(() => {
    let frame;
    let lastTime = 0;

    const loop = (time) => {
      if (!lastTime) lastTime = time;

      const delta = (time - lastTime) / 1000;
      lastTime = time;

      setY((prev) => prev + speed * delta);

      frame = requestAnimationFrame(loop);
    };

    frame = requestAnimationFrame(loop);

    return () => cancelAnimationFrame(frame);
  }, [speed]);

  return y;
}