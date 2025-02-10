import React from 'react'
import '../styles/CartaPokemon.css'

function CartaPokemon({nombre = "Pokemon", imagen = "https://projectpokemon.org/home/uploads/monthly_2021_02/image.png.6059c201d296da4fb927ea2292c065ae.png", sonido}) {
  
  nombre = nombre.charAt(0).toUpperCase() + nombre.slice(1);

  const playSound = () => {
  if (sonido) {
    const audio = new Audio(sonido);
    audio.play();
  }
  };

  return (
  <div className='carta-pokemon' onMouseEnter={playSound}>
    <h2 className='nombre-pokemon'>{nombre}</h2>
    <img className='imagen-pokemon' src={imagen} alt={nombre} />
  </div>
  )
}

export default CartaPokemon