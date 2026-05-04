function ModalPausa({
  onContinuar,
  onSalir,
  volumenMusica,
  setVolumenMusica,
  volumenDisparo,
  setVolumenDisparo,
}) {
  return (
    // Fondo oscuro
    <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/70">

      {/* Modal */}
      <div className="bg-gray-900 border border-gray-600 rounded-2xl p-8 w-80 flex flex-col gap-6 text-white shadow-2xl">

        <h2 className="text-2xl font-bold text-center tracking-widest uppercase">
          Pausa
        </h2>

        {/* Volumen música */}
        <div className="flex flex-col gap-2">
          <label className="flex justify-between text-sm text-gray-300">
            <span>🎵 Música</span>
            <span>{Math.round(volumenMusica * 100)}%</span>
          </label>
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={volumenMusica}
            onChange={(e) => setVolumenMusica(parseFloat(e.target.value))}
            className="w-full accent-blue-500"
          />
        </div>

        {/* Volumen disparos */}
        <div className="flex flex-col gap-2">
          <label className="flex justify-between text-sm text-gray-300">
            <span>🔫 Disparos</span>
            <span>{Math.round(volumenDisparo * 100)}%</span>
          </label>
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={volumenDisparo}
            onChange={(e) => setVolumenDisparo(parseFloat(e.target.value))}
            className="w-full accent-yellow-500"
          />
        </div>

        {/* Botones */}
        <div className="flex flex-col gap-3 mt-2">
          <button
            onClick={onContinuar}
            className="bg-blue-600 hover:bg-blue-500 transition rounded-lg py-2 font-semibold tracking-wide"
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