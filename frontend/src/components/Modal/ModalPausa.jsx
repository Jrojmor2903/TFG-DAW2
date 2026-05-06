function ModalPausa({
  onContinuar,
  onSalir,
  volumenMusica,
  setVolumenMusica,
  volumenDisparo,
  setVolumenDisparo,
}) {
  return (

    <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/70">
      <div className="w-lg h-128 bg-(--negro-opacity) rounded-xl border border-(--verde-base) flex flex-col justify-around p-20">
        <h2 className="text-2xl font-bold text-center tracking-widest uppercase text-white text-sh-verde">
          Pausa
        </h2>
        <div className="flex flex-col gap-2">
          <label className="flex justify-between text-sm text-gray-300">
            <span className="text-sh-verde text-2xl">🎵 Música</span>
            <span className="text-sh-verde text-2xl">{Math.round(volumenMusica * 100)}%</span>
          </label>
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={volumenMusica}
            onChange={(e) => setVolumenMusica(parseFloat(e.target.value))}
            className="w-full accent-[var(--verde-base)]"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="flex justify-between text-sm text-gray-300">
            <span className="text-sh-verde text-2xl">🔫 Disparos</span>
            <span className="text-sh-verde text-2xl">{Math.round(volumenDisparo * 100)}%</span>
          </label>
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={volumenDisparo}
            onChange={(e) => setVolumenDisparo(parseFloat(e.target.value))}
            className="w-full accent-[var(--verde-base)]"
          />
        </div>
        <div className="flex flex-col gap-3 mt-2">
          <button
            onClick={onContinuar}
            className="bg-(--verde-base) hover:bg-black hover:text-white transition rounded-lg py-2 font-semibold tracking-wide"
          >
            ▶ Continuar
          </button>
          <button
            onClick={onSalir}
            className="bg-red-700 hover:bg-red-600 transition rounded-lg py-2 font-semibold tracking-wide"
          >
            ✕ Salir
          </button>
        </div>
      </div>
    </div>
  );
}

export default ModalPausa;