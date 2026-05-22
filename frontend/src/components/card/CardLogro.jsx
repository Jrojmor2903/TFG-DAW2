export default function CardLogro({ logro, isLocked }) {

// Función rápida para mapear nuestro alfabeto a las runas (Futhark) que incluye Caudex
const transcribirARunas = (texto) => {
  const diccionario = {
    'a': '𓋊', 'b': 'ᛒ', 'c': 'ᚲ', 'd': 'ᛑ', 'e': 'ᛖ', 'f': 'ᚠ', 'g': 'ᚴ', 'h': 'ᚼ', 
    'i': 'ᛁ', 'j': 'ᛌ', 'k': 'ᚲ', 'l': 'ᛚ', 'm': 'ᛘ', 'n': 'ᚾ', 'o': 'ᚢ', 'p': 'ᛕ', 
    'q': 'ᚲ', 'r': 'ᚱ', 's': 'ᛋ', 't': 'ᛏ', 'u': 'ᚢ', 'v': 'ᚢ', 'w': 'ᚢ', 'x': 'ᛋ', 
    'y': 'ᛁ', 'z': 'ᛘ', ' ': ' '
  };
  return texto
    .toLowerCase()
    .split('')
    .map(letra => diccionario[letra] || letra)
    .join('');
};

  return (
    <div className={`p-6 rounded-xl flex flex-col items-center justify-center text-center shadow-lg h-full min-h-[300px] bg-(--negro-opacity)`}>
      <div className="w-24 h-24 mb-4 flex items-center justify-center">
        {isLocked ? (
          <img 
            src="https://qifdqcldqkpzmhyswsjx.supabase.co/storage/v1/object/public/TFG-Bucket/uploads/candado.png" 
            alt="Bloqueado" 
            className="w-full h-full object-contain"
          />
        ) : (
          <img 
            src={logro.url} 
            alt={logro.nombre} 
            className="w-full h-full object-contain" 
          />
        )}
      </div>
      
      <h3 className="text-xl font-bold mb-2 text-white text-sh-tema">
        {isLocked ? "?????????" : logro.nombre}
      </h3>
      
    <p className={`text-sm text-white text-sh-tema tracking-widest ${isLocked ? "font-caudex text-red-500/70 font-bold" : "font-orbitron"}`}>
      {isLocked ? transcribirARunas("Continuw jugwndo pwrw desbloquewr") : logro.descripcion}
    </p>
    </div>
  );
}