import { useState, useEffect, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../hooks/useUser.jsx";
import { useVerticalBG } from "../hooks/useVerticalBG.jsx";
import { useHorizontalMovement } from "../hooks/useHorizontalMovement.jsx";
import { useDisparos } from "../hooks/useDisparos.jsx";
import { useSonido } from "../hooks/useSonido.jsx";
import { usePausa } from "../hooks/usePausa.jsx";
import { useEnemigos } from "../hooks/useEnemigos.jsx";
import NaveJugador from "../components/NaveJugador/NaveJugador.jsx";
import ModalPausa from "../components/Modal/ModalPausa.jsx";
import api from "../components/axios/api.jsx";

function Juego() {
  const { user } = useUser();
  const navigate = useNavigate();

  // ─── 1. Config del nivel ────────────────────────────────────────
  const [config, setConfig] = useState(null);
  const [tiposEnemigo, setTiposEnemigo] = useState([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const fetchDatos = async () => {
      try {
        const resPerfil = await api.post("/perfil/getByUserId", { userId: user.id });
        const nivelId = resPerfil.data.nivel_actual; // 🔧 ajusta

        const resNivel = await api.get(`/nivel/${nivelId}`);
        setConfig({
          velocidad:       resNivel.data.velocidad,
          intervaloOleada: resNivel.data.intervalo_oleada,
          enemigosOleada:  resNivel.data.enemigos_oleada,
          multiplicador:   resNivel.data.multiplicador_vida,
        });

        const resEnemigos = await api.get(`/nivel/${nivelId}/enemigos`);
        setTiposEnemigo(resEnemigos.data);

      } catch (e) {
        console.error("Error cargando nivel:", e.response?.data);
        setConfig({ velocidad: 80, intervaloOleada: 5000, enemigosOleada: 3, multiplicador: 1 });
        setTiposEnemigo([{ id: 1, avatar_url: "/enemigo.png", vida_base: 1 }]);
      } finally {
        setCargando(false);
      }
    };

    if (user?.id) fetchDatos();
  }, [user?.id]);

  // ─── 2. Sonido — antes de pausa porque pausa lo necesita ────────
  const {
    volumenMusica, setVolumenMusica,
    volumenDisparo, setVolumenDisparo,
    pausarMusica,  reanudarMusica,
  } = useSonido();

  // ─── 3. Pausa — antes de cualquier hook que la use ──────────────
  const { pausado, continuar } = usePausa(pausarMusica, reanudarMusica);

  // ─── 4. Movimiento — ya puede recibir pausado ───────────────────
  const y = useVerticalBG(100);
  const { x, containerRef, playerRef } = useHorizontalMovement(400, pausado);

  // ─── 5. Disparos ────────────────────────────────────────────────
  const xRef = useRef(x);
  useEffect(() => { xRef.current = x; }, [x]);

  const getPlayerX     = useCallback(() => xRef.current, []);
  const getPlayerWidth = useCallback(() => playerRef.current?.offsetWidth || 32, [playerRef]);

  const { disparos, explotarDisparo } = useDisparos(
    getPlayerX, getPlayerWidth, volumenDisparo, pausado
  );

  // ─── 6. Enemigos ────────────────────────────────────────────────
  const handleGameOver = useCallback(() => {
    navigate("/gameover"); // 🔧 ajusta tu ruta
  }, [navigate]);

  const { enemigos, golpearEnemigo } = useEnemigos(
    containerRef,
    pausado,
    handleGameOver,
    config ?? {},
    tiposEnemigo,
  );

  // ─── 7. Colisiones ──────────────────────────────────────────────
  useEffect(() => {
    disparos.forEach((disparo) => {
      if (disparo.explota) return;

      enemigos.forEach((enemigo) => {
        const colision =
          disparo.x < enemigo.x + 48 &&
          disparo.x + 16 > enemigo.x &&
          disparo.y < enemigo.y + 48 &&
          disparo.y + 32 > enemigo.y;

        if (colision) {
          explotarDisparo(disparo.id);
          golpearEnemigo(enemigo.id);
        }
      });
    });
  }, [disparos, enemigos]);

  // ─── Loading ────────────────────────────────────────────────────
  if (cargando) {
    return (
      <div className="w-screen h-screen bg-black flex items-center justify-center">
        <p className="text-white text-2xl tracking-widest animate-pulse">
          Cargando nivel...
        </p>
      </div>
    );
  }

  // ─── Render ─────────────────────────────────────────────────────
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

        {enemigos.map((e) => (
          <div
            key={e.id}
            style={{
              position: "absolute",
              left: e.x,
              top: e.y,
              width: "48px",
              pointerEvents: "none",
            }}
          >
            <img src="/Enemigo.png" alt="enemigo" className="w-20 h-20 z-10" />
            <div className="w-full h-1 bg-gray-700 mt-1 rounded">
              <div
                className="h-1 bg-red-500 rounded transition-all"
                style={{ width: `${(e.vida / e.vidaMax) * 100}%` }}
              />
            </div>
          </div>
        ))}

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