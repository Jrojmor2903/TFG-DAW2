import { useState } from "react";

function ImagenHover({ classname }) {
  const [hover, setHover] = useState(false);

  return (
    <img
      className={classname}
      src={hover ? "logo-hover.png" : "Logo.png"}
      alt="imagen"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{ width: "106px" }}
    />
  );
}

export default ImagenHover;