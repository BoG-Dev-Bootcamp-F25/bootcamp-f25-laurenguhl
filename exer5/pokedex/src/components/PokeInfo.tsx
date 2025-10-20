import '../App.css';
import { useState } from 'react';

function PokeInfo({pokemon}) {
    const [panel, setPanel] = useState('Info'); // info or moves

    if (!pokemon) {
        return <div>Loading...</div>
    }

    return (
        <div className="panel-container">
            <div className="panel-title-container">
                <p className="panel-title">{panel === 'Info' ? 'Info' : 'Moves'}</p>
            </div>
            <div className="panel-content">
                {panel === "Moves" ? (
                    pokemon.moves.map((m) => (<div key={m.move.name}>{m.move.name}</div>))
                    ) : (
                    <div className="stats-list">
                        <div>height: {(pokemon.height * 0.1).toFixed(1)}m</div>
                        <div>weight: {(pokemon.weight * 0.1).toFixed(1)}kg</div>
                        {pokemon.stats.map((stat) => (
                            <div key={stat.stat.name}>
                                {stat.stat.name}: {stat.base_stat}
                            </div>
                        ))}
                    </div>
                )}
            </div>
            <div className="panel-buttons"> 
                <button onClick={() => setPanel('Info')} className={panel === 'Info' ? 'selected-btn' : 'unselected-btn'}>Info</button>
                <button onClick={() => setPanel('Moves')} className={panel === 'Moves' ? 'selected-btn' : 'unselected-btn'}>Moves</button>
            </div>
        </div>
    )
}

export default PokeInfo;