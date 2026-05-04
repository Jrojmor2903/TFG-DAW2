const enemigos =
  
  
  
  
    disparos.forEach((disparo) => {
    enemigos.forEach((enemigo) => {
      const colision =
        disparo.x < enemigo.x + enemigo.w &&
        disparo.x + 16 > enemigo.x &&
        disparo.y < enemigo.y + enemigo.h &&
        disparo.y + 32 > enemigo.y;

      if (colision && !disparo.explota) {
        explotarDisparo(disparo.id);
        eliminarEnemigo(enemigo.id);
      }
    });
  });

  export default enemigos;

