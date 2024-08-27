import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Card from './Card';
import Scoreboard from './Scoreboard';

function App() {
  const [pokemons, setPokemons] = useState([]);
  const [clickedPokemons, setClickedPokemons] = useState([]);
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [isFlipping, setIsFlipping] = useState(false); // NEW: Manage flip state for all cards

  useEffect(() => {
    fetchPokemons();
  }, []);

  const fetchPokemons = async () => {
    const newPokemons = [];
    for (let i = 1; i <= 6; i++) {  // Fetch 6 random Pokémon
      const res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${i}`);
      newPokemons.push({
        id: res.data.id,
        name: res.data.name,
        image: res.data.sprites.front_default,
      });
    }
    setPokemons(shuffleArray(newPokemons));
  };

  const shuffleArray = (array) => {
    return array.sort(() => Math.random() - 0.5);
  };

  const handleCardClick = (id) => {
    setIsFlipping(true); // Start flipping all cards // NEW
    setTimeout(() => {
      if (clickedPokemons.includes(id)) {
        setScore(0);
        setClickedPokemons([]);
      } else {
        setClickedPokemons([...clickedPokemons, id]);
        const newScore = score + 1;
        setScore(newScore);
        if (newScore > bestScore) {
          setBestScore(newScore);
        }
      }
      setPokemons(shuffleArray(pokemons)); // Reshuffle the cards after each click
      setIsFlipping(false); // Stop flipping all cards after reshuffle // NEW
    }, 800); // Match the duration of the CSS transition
  };

  return (
    <div className="App">
      <h1>PokéMemorize</h1>
      <Scoreboard score={score} bestScore={bestScore} />
      <div className="card-container">
        {pokemons.map(pokemon => (
          <Card 
            key={pokemon.id} 
            pokemon={pokemon} 
            isFlipping={isFlipping} // NEW: Pass flip state to each card
            onClick={handleCardClick} 
          />
        ))}
      </div>
    </div>
  );
}

export default App;
