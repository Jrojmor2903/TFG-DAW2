function ImagenNivel({ nivel }) {

  const grupo = Math.floor((nivel - 1) / 3);

  const imagenes = [
    "Logo.png",
    "logo-azul.png",
    "logo-rosa.png",
    "logo-morado.png",
  ];

  const imagen = imagenes[grupo] || "Logo.png";

  return <img src={imagen} alt="nivel" className="w-[300px] mt-10 " />;
}
export default ImagenNivel;