import React from 'react';

function Card({ pokemon, onClick }) {
  return (
    <div className="card" onClick={() => onClick(pokemon.id)}>
      <img src={pokemon.image} alt={pokemon.name} />
      <h3>{pokemon.name}</h3>
    </div>
  );
}

export default Card;
