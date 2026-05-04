import { useUser } from "../../hooks/useUser";
import ImagenNivel from "../imagenEffect/ImagenNivel";
import { useNavigate } from "react-router-dom";

function CardHistoria() {
  const { user } = useUser();
  const navigate = useNavigate();

  const grupo = Math.floor((user.nivel_actual - 1) / 3);

  const clases = [
    "text-sh-verde",
    "text-sh-blue",
    "text-sh-rosa",
    "text-sh-morado",
  ];

  const SombraText = clases[grupo] || "text-sh-verde";  

  return (
    <div
      className={`card-inicio cursor-pointer text-a ${SombraText}`}
      onClick={() => {
        navigate("/juego");
      }}
    >
      <ImagenNivel nivel={user.nivel_actual} />
      <h1 className="">Nivel {user.nivel_actual}</h1>
    </div>
  );
}
export default CardHistoria;
