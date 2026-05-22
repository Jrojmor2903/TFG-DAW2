import CardHistoria from "../components/card/CardHistoria";
import { useState, useEffect } from "react";

function Inicio() {
  const cards = [
    {
      key: "historia",
      img: null,
      label: "Modo Historia",
      isCardHistoria: true,
    },
    { key: "practica", img: "/practica.png", label: "Modo Práctica" },

    { key: "infinito", img: "/infinito-2.png", label: "Modo Infinito" },
  ];

  const [current, setCurrent] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 1024);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const prev = () => setCurrent((c) => (c - 1 + cards.length) % cards.length);
  const next = () => setCurrent((c) => (c + 1) % cards.length);

  const getStyle = (index) => {
    const total = cards.length;
    const angle = (index - current + total) % total;

    if (angle === 0)
      return {
        transform: "translateX(-50%) scale(1) rotateY(0deg)",
        left: "50%",
        zIndex: 10,
        opacity: 1,
        filter: "none",
        pointerEvents: "auto",
      };
    if (angle === 1)
      return {
        transform: "translateX(25%) scale(0.8) rotateY(-35deg)",
        left: "50%",
        zIndex: 5,
        opacity: 0.5,
        filter: "brightness(0.6)",
        pointerEvents: "none",
      };
    if (angle === 2)
      return {
        transform: "translateX(-125%) scale(0.8) rotateY(35deg)",
        left: "50%",
        zIndex: 5,
        opacity: 0.5,
        filter: "brightness(0.6)",
        pointerEvents: "none",
      };
  };

  return (
    <div className="background-general min-h-screen flex flex-col items-center justify-center">
      <div
        className="relative w-full h-[420px] flex items-center justify-center overflow-hidden" // ← overflow-hidden aquí
        style={{ perspective: "1000px" }}
      >
        <div className="relative w-[280px] h-[420px]">
          {cards.map((card, index) => (
            <div
              key={card.key}
              className="absolute top-0 w-full h-full"
              style={{
                transition: "all 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
                ...getStyle(index),
              }}
            >
              {card.isCardHistoria ? (
                <div className="w-[280px] h-[420px]">
                  <CardHistoria className="w-full h-full" />{" "}
                  {/* ← solo en móvil */}
                </div>
              ) : (
                <div className="card-inicio cursor-pointer text-a w-full h-full">
                  <img
                    src={card.img}
                    alt={card.label}
                    className="w-[200px] mt-10"
                  />
                  <h2>{card.label}</h2>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="flex gap-6 mt-8 items-center">
        <button onClick={prev} className="btn text-2xl px-4">
          ‹
        </button>
        <div className="flex gap-2">
          {cards.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`w-2 h-2 rounded-full transition-all ${
                i === current ? "bg-white scale-125" : "bg-white/40"
              }`}
            />
          ))}
        </div>
        <button onClick={next} className="btn text-2xl px-4">
          ›
        </button>
      </div>
    </div>
  );
}

export default Inicio;
