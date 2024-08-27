import React from 'react';

function Card({ pokemon, isFlipping, onClick }) {
  return (
    <div className={`card ${isFlipping ? 'is-flipping' : ''}`} onClick={() => onClick(pokemon.id)}>
      <div className="card-inner">
        <div className="card-front">
          <img src={pokemon.image} alt={pokemon.name} />
          <h3>{pokemon.name}</h3>
        </div>
        <div className="card-back"></div>
      </div>
    </div>
  );
}

export default Card;
