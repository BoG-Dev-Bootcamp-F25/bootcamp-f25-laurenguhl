import '../App.css';
import PokeTypes from './PokeTypes.tsx';

function PokeDisplay({pokemon, inc, dec}) {
    if (!pokemon) {
        return <div>Loading...</div>
    }

    return (
        <div className="display">
            <div className="image-container">
                <img src={pokemon.sprites.front_default}/>
            </div>
            <div className="name">{pokemon.name}</div>
            <div><PokeTypes types={pokemon.types.map(t => t.type.name)}/></div>
            <div className="buttons">
                <button onClick={dec} className="button">&lt;</button>
                <button onClick={inc} className="button">&gt;</button>
            </div>
        </div>
    )
}

export default PokeDisplay;