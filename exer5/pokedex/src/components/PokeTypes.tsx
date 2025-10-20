import '../App.css';

function PokeTypes({types}) {
    if (!types) {
        return <div>Loading...</div>
    }
    return (
        <div className="types">
            <p className="types-text">Types:</p>
            <div className="type-container">
                {types.map((type) => (
                <span
                    key={type}
                    className="type-box"
                    id={type}
                    >{type}
                </span>
                ))}
            </div>
        </div>
    )
}

export default PokeTypes;