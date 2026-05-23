import { useState, useEffect, useRef, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useUser } from "../hooks/useUser.jsx";
import { useVerticalBG } from "../hooks/useVerticalBG.jsx";
import { useHorizontalMovement } from "../hooks/useHorizontalMovement.jsx";
import { useDisparos } from "../hooks/useDisparos.jsx";
import { useSonido } from "../hooks/useSonido.jsx";
import { usePausa } from "../hooks/usePausa.jsx";
import { useEnemigos } from "../hooks/useEnemigos.jsx";
import NaveJugador from "../components/NaveJugador/NaveJugador.jsx";
import ModalPausa from "../components/Modal/ModalPausa.jsx";
import ModalGameOver from "../components/Modal/ModalGameOver.jsx";
import api from "../components/axios/api.jsx";

function Juego() {
  const { user, changeLevel } = useUser();
  const navigate = useNavigate();
  const { nivelId } = useParams();

  const esModoLibre = !!nivelId;
  const nivelActualId = nivelId ? Number(nivelId) : user.nivel_actual;

  const [config, setConfig] = useState(null);
  const [tiposEnemigo, setTiposEnemigo] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(false);
  const [escalados, setEscalados] = useState([]);
  const [derrotados, setDerrotados] = useState({});
  const [fondoUrl, setFondoUrl] = useState("/fondo-nivel.png");
  const [nivelCompletado, setNivelCompletado] = useState(false);
  const nivelSubidoRef = useRef(false);

  useEffect(() => {
    const fetchDatos = async () => {
      try {
        const resNivel = await api.get(`/nivel/${nivelActualId}`);
        const nivel = resNivel.data;

        let esUltimo = false;
        if (!esModoLibre) {
          const resTotal = await api.get(`/nivel/total`);
          esUltimo = nivelActualId >= resTotal.data.total;
        }

        setConfig({
          velocidad: nivel.velocidad,
          intervaloOleada: nivel.intervalo_oleada,
          enemigosOleada: nivel.enemigos_oleada,
          multiplicador: nivel.multiplicador_vida,
          esUltimo,
        });

        setTiposEnemigo(nivel.enemigos);
        setEscalados(
          nivel.enemigos.map((e) => ({
            id_enemigo: e.id,
            cantidad: e.pivot.cantidad,
            imagen: e.imagen_url,
            nombre: e.nombre,
          })),
        );
        setDerrotados({});
        nivelSubidoRef.current = false;
        setNivelCompletado(false);
      } catch (e) {
        console.error("Error cargando nivel:", e.response?.data ?? e);
        setError(true);
      } finally {
        setCargando(false);
      }
    };

    if (user?.id) fetchDatos();
  }, [nivelActualId]);

  const {
    volumenMusica,
    setVolumenMusica,
    volumenDisparo,
    setVolumenDisparo,
    pausarMusica,
    reanudarMusica,
  } = useSonido();

  const { pausado, continuar } = usePausa(pausarMusica, reanudarMusica);
  const [gameOver, setGameOver] = useState(false);

  const bloqueado = gameOver || nivelCompletado;
  const pausadoTotal = pausado || bloqueado;

  useEffect(() => {
    if (bloqueado) pausarMusica?.();
  }, [bloqueado]);

  const y = useVerticalBG(100, pausadoTotal);
  const { x, containerRef, playerRef, touchDirRef } = useHorizontalMovement(400, pausadoTotal);

  const xRef = useRef(x);
  useEffect(() => { xRef.current = x; }, [x]);

  const getPlayerX = useCallback(() => xRef.current, []);
  const getPlayerWidth = useCallback(() => playerRef.current?.offsetWidth || 32, [playerRef]);

  const { disparos, explotarDisparo, touchShootRef } = useDisparos(
    getPlayerX,
    getPlayerWidth,
    volumenDisparo,
    pausadoTotal,
  );

  const handleGameOver = useCallback(() => setGameOver(true), []);

  const { enemigos, golpearEnemigo } = useEnemigos(
    containerRef,
    pausadoTotal,
    handleGameOver,
    config ?? {},
    tiposEnemigo,
  );

  const escaladosRef = useRef(escalados);
  const derrotadosRef = useRef(derrotados);
  useEffect(() => { escaladosRef.current = escalados; }, [escalados]);
  useEffect(() => { derrotadosRef.current = derrotados; }, [derrotados]);

  useEffect(() => {
    if (bloqueado) return;

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

          const vidaRestante = enemigo.vida - 1;
          if (vidaRestante <= 0) {
            const idTipo = enemigo.tipoId;
            setDerrotados((prev) => {
              const nuevos = { ...prev, [idTipo]: (prev[idTipo] || 0) + 1 };
              const nivelSuperado = escaladosRef.current.every(
                (e) => (nuevos[e.id_enemigo] || 0) >= e.cantidad,
              );
              if (nivelSuperado && !nivelSubidoRef.current) {
                nivelSubidoRef.current = true;
                setNivelCompletado(true);
              }
              return nuevos;
            });
          }
        }
      });
    });
  }, [disparos, enemigos]);

  if (cargando) {
    return (
      <div className="w-screen h-screen bg-black flex items-center justify-center">
        <p className="text-white text-2xl tracking-widest animate-pulse">Cargando nivel...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-screen h-screen bg-black flex flex-col items-center justify-center gap-6">
        <p className="text-red-500 text-3xl font-bold">¡Algo ha salido mal!</p>
        <button onClick={() => navigate("/")} className="mt-4 px-6 py-3 bg-red-600 text-white rounded-lg">
          Volver al inicio
        </button>
      </div>
    );
  }

  return (
    <div className="flex">
      <div className="flex-1 bg-black">{user.name}</div>

      <div
        className="flex-6 w-screen h-screen bg-repeat-y bg-cover relative overflow-hidden"
        style={{
          backgroundImage: `url(${fondoUrl})`,
          backgroundPosition: `0px ${y}px`,
        }}
        ref={containerRef}
      >
        <NaveJugador ref={playerRef} style={{ transform: `translateX(${x}px)` }} />

        {/* ── Contador de enemigos ── */}
        <div className="absolute top-4 left-4 flex flex-col gap-2 z-20">
          {escalados.map((e) => (
            <div key={e.id_enemigo} className="flex items-center gap-2 bg-black/60 px-3 py-1 rounded-lg">
              <img src={e.imagen} alt={e.nombre} className="w-8 h-8 object-contain" />
              <span className="text-white font-bold text-sm">
                {Math.min(derrotados[e.id_enemigo] || 0, e.cantidad)}/{e.cantidad}
              </span>
            </div>
          ))}
        </div>

        {/* ── Enemigos ── */}
        {enemigos.map((e) => (
          <div
            key={e.id}
            style={{ position: "absolute", left: e.x, top: e.y, width: "48px", pointerEvents: "none" }}
          >
            <img src={e.imagen_url} alt="enemigo" className="w-20 h-20 z-10" />
            <div className="w-full h-1 bg-gray-700 mt-1 rounded">
              <div
                className="h-1 bg-red-500 rounded transition-all"
                style={{ width: `${(e.vida / e.vidaMax) * 100}%` }}
              />
            </div>
          </div>
        ))}

        {/* ── Disparos ── */}
        {disparos.map((d) => (
          <img
            key={d.id}
            src={d.explota ? "/explosion.webp" : "/disparo.png"}
            alt={d.explota ? "explosión" : "disparo"}
            style={{
              position: "absolute",
              left: d.x,
              top: d.y,
              width: d.explota ? "64px" : "40px",
              pointerEvents: "none",
              transform: "rotate(90deg)",
            }}
          />
        ))}

        {/* ── Controles táctiles ── */}
        <div className="absolute bottom-6 w-full flex justify-between px-6 z-30 pointer-events-none">
          <div className="flex gap-3 pointer-events-auto">
            <button
              className="w-16 h-16 bg-white/20 active:bg-white/40 rounded-full text-white text-2xl flex items-center justify-center select-none"
              onTouchStart={() => (touchDirRef.current = "left")}
              onTouchEnd={() => (touchDirRef.current = null)}
              onMouseDown={() => (touchDirRef.current = "left")}
              onMouseUp={() => (touchDirRef.current = null)}
              onMouseLeave={() => (touchDirRef.current = null)}
            >
              ◀
            </button>
            <button
              className="w-16 h-16 bg-white/20 active:bg-white/40 rounded-full text-white text-2xl flex items-center justify-center select-none"
              onTouchStart={() => (touchDirRef.current = "right")}
              onTouchEnd={() => (touchDirRef.current = null)}
              onMouseDown={() => (touchDirRef.current = "right")}
              onMouseUp={() => (touchDirRef.current = null)}
              onMouseLeave={() => (touchDirRef.current = null)}
            >
              ▶
            </button>
          </div>

          <div className="pointer-events-auto">
            <button
              className="w-20 h-20 bg-red-500/70 active:bg-red-400 rounded-full text-white text-3xl flex items-center justify-center select-none"
              onTouchStart={() => (touchShootRef.current = true)}
              onTouchEnd={() => (touchShootRef.current = false)}
              onMouseDown={() => (touchShootRef.current = true)}
              onMouseUp={() => (touchShootRef.current = false)}
              onMouseLeave={() => (touchShootRef.current = false)}
            >
              🔥
            </button>
          </div>
        </div>

        {/* ── Modales ── */}
        {pausado && !bloqueado && (
          <ModalPausa
            onContinuar={continuar}
            onSalir={() => navigate("/")}
            volumenMusica={volumenMusica}
            setVolumenMusica={setVolumenMusica}
            volumenDisparo={volumenDisparo}
            setVolumenDisparo={setVolumenDisparo}
          />
        )}

        {gameOver && (
          <ModalGameOver
            onReintentar={() => setGameOver(false)}
            onSalir={() => navigate("/")}
          />
        )}

        {nivelCompletado && (
          <div className="absolute inset-0 bg-black/70 flex items-center justify-center z-50">
            <div className="bg-gray-900 border border-yellow-400 rounded-2xl p-10 flex flex-col items-center gap-6 text-center">

              {config?.esUltimo ? (
                <>
                  <h2 className="text-yellow-400 text-4xl font-bold">¡Historia completada!</h2>
                  <p className="text-white text-lg">Has superado todos los niveles</p>
                  <button
                    onClick={() => navigate("/")}
                    className="px-6 py-3 bg-yellow-400 hover:bg-yellow-300 text-black rounded-lg font-bold"
                  >
                    Salir
                  </button>
                </>
              ) : esModoLibre ? (
                <>
                  <h2 className="text-yellow-400 text-4xl font-bold">¡Nivel completado!</h2>
                  <p className="text-white text-lg">Has superado este desafío</p>
                  <button
                    onClick={() => navigate("/lista-niveles")}
                    className="px-6 py-3 bg-yellow-400 hover:bg-yellow-300 text-black rounded-lg font-bold"
                  >
                    Volver a niveles
                  </button>
                </>
              ) : (
                <>
                  <h2 className="text-yellow-400 text-4xl font-bold">¡Nivel completado!</h2>
                  <p className="text-white text-lg">Nivel {user.nivel_actual} superado</p>
                  <div className="flex gap-4 mt-2">
                    <button
                      onClick={async () => {
                        await changeLevel(user.nivel_actual + 1);
                        navigate("/");
                      }}
                      className="px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-lg font-bold"
                    >
                      Salir
                    </button>
                    <button
                      onClick={() => changeLevel(user.nivel_actual + 1)}
                      className="px-6 py-3 bg-yellow-400 hover:bg-yellow-300 text-black rounded-lg font-bold"
                    >
                      Siguiente nivel
                    </button>
                  </div>
                </>
              )}

            </div>
          </div>
        )}
      </div>

      <div className="flex-1 bg-black">{user.name}</div>
    </div>
  );
}

export default Juego;