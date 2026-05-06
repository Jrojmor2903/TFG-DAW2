function ModalGameOver({ onReintentar, onSalir }) {
  return (
    <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/70">
      <div className="w-lg h-96 bg-(--negro-opacity) rounded-xl border border-red-600 flex flex-col justify-around p-20">

        <h2 className="text-4xl font-bold text-center tracking-widest uppercase text-red-500 text-sh-verde">
          GAME OVER
        </h2>

        <p className="text-center text-white text-sh-verde text-lg tracking-wide">
          Tu nave ha sido destruida
        </p>

        <div className="flex flex-col gap-3 mt-2">
          <button
            onClick={onReintentar}
            className="bg-(--verde-base) hover:bg-black hover:text-white transition rounded-lg py-2 font-semibold tracking-wide"
          >
            ↺ Reintentar
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

export default ModalGameOver;