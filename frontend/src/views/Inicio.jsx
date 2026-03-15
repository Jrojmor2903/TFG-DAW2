import { useUser } from "../hooks/useUser";
import ImagenNivel from "../components/imagenEffect/ImagenNivel";
function Inicio() {
  const { user } = useUser();

  return (
    <div className="background-general min-h-screen flex items-center justify-center gap-8">
      <div className="card-inicio"></div>

      <div className="card-inicio">
        <ImagenNivel nivel={user.nivel_actual} />
        <h1>Nivel {user.nivel_actual}</h1>
      </div>

      <div className="card-inicio"></div>
    </div>
  );
}

export default Inicio;
