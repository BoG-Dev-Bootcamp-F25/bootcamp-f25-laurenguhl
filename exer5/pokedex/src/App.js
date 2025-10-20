import './App.css';
import PokeDisplay from './components/PokeDisplay.tsx';
import PokeInfo from './components/PokeInfo.tsx';
import { useState, useEffect } from 'react';

const URL = "https://pokeapi.co/api/v2/pokemon/";

const getPokemonJSON = async (dexNumber) => {
  try {
    const response = await fetch(`${URL}${dexNumber}/`); 
    const pokemonJSON = await response.json();
    return pokemonJSON;
  } catch(e) {
      throw e;
  }
}

function App() {
  const [pokemon, setPokemon] = useState(null); // json of pokemon data
  const [id, setId] = useState(1); // curr pokemon id number

  // when id changes, fetch new pokemon data
  useEffect(() => {
    getPokemonJSON(id).then(pokemon => {
      setPokemon(pokemon);
    });
  }, [id]);

  // give PokeDisplay the ability to change the current pokemon id
  const incId = () => {
    if (id < 1025) { // don't increment above 1025
      setId(id + 1);
    }
  };
  const decId = () => {
    if (id > 1) { // don't decrement below 1
      setId(id - 1);
    }
  };

  return (
    <div className="pokedex">
      <h1 className="title">Exercise 5: Pokedex</h1>
      <div className="content">
        <div><PokeDisplay pokemon={pokemon} inc={incId} dec={decId}/></div>
        <div><PokeInfo pokemon={pokemon}/></div>
      </div>
    </div>
  );
}

export default App;
