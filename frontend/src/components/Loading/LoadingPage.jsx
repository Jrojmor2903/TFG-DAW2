function LoadingPage() {
  return (
    <div className="background-general min-h-screen flex flex-col items-center justify-center gap-6">
      <img src="/Logo.png" alt="logo" className="w-32 animate-pulse" />
      <p className="text-white text-sh-tema text-2xl tracking-widest animate-pulse font-mono">
        Cargando...
      </p>
    </div>
  );
}

export default LoadingPage;