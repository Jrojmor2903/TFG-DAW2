import { useRef, useCallback, useEffect } from "react";
import { useUser } from "../hooks/useUser.jsx";
import { useVerticalBG } from "../hooks/useVerticalBG.jsx";
import { useHorizontalMovement } from "../hooks/useHorizontalMovement.jsx";
import { useDisparos } from "../hooks/useDisparos.jsx";
import { useSonido } from "../hooks/useSonido.jsx";
import { usePausa } from "../hooks/usePausa.jsx";
import NaveJugador from "../components/NaveJugador/NaveJugador.jsx";
import ModalPausa from "../components/Modal/ModalPausa.jsx";
import { useNavigate } from "react-router-dom";

function Juego() {
  const { user } = useUser();
  const navigate = useNavigate();
  const y = useVerticalBG(100);
  const { x, containerRef, playerRef } = useHorizontalMovement(400);

  const {
    volumenMusica,
    setVolumenMusica,
    volumenDisparo,
    setVolumenDisparo,
    pausarMusica,
    reanudarMusica,
  } = useSonido();

  const { pausado, continuar } = usePausa(pausarMusica, reanudarMusica);

  const xRef = useRef(x);
  useEffect(() => { xRef.current = x; }, [x]);

  const getPlayerX = useCallback(() => xRef.current, []);
  const getPlayerWidth = useCallback(
    () => playerRef.current?.offsetWidth || 32,
    [playerRef]
  );

  const { disparos, explotarDisparo } = useDisparos(
    getPlayerX,
    getPlayerWidth,
    volumenDisparo,
    pausado
  );

  return (
    <div className="flex">
      <div className="flex-1 bg-black">{user.name}</div>

      <div
        className="flex-6 w-screen h-screen bg-repeat-y bg-cover relative overflow-hidden"
        style={{
          backgroundImage: "url(/asd.png)",
          backgroundPosition: `0px ${y}px`,
        }}
        ref={containerRef}
      >
        <NaveJugador
          ref={playerRef}
          style={{ transform: `translateX(${x}px)` }}
        />

        {disparos.map((d) => (
          <img
            key={d.id}
            src={d.explota ? "/explosion.png" : "/disparo.png"}
            alt={d.explota ? "explosión" : "disparo"}
            style={{
              position: "absolute",
              left: d.x,
              top: d.y,
              width: d.explota ? "64px" : "16px",
              pointerEvents: "none",
              transform: "rotate(90deg)",
              width: "40px"
            }}
          />
        ))}

        {/* ✅ Modal de pausa encima de todo */}
        {pausado && (
          <ModalPausa
            onContinuar={continuar}
            onSalir={() => navigate("/")}
            volumenMusica={volumenMusica}
            setVolumenMusica={setVolumenMusica}
            volumenDisparo={volumenDisparo}
            setVolumenDisparo={setVolumenDisparo}
          />
        )}
      </div>

      <div className="flex-1 bg-black">{user.name}</div>
    </div>
  );
}

export default Juego;