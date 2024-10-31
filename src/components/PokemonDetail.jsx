const PokemonDetail = ({ pokemon, onClose }) => (
  <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
    <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
      <div className="relative p-6">
        <button 
          onClick={onClose}
          className="btn btn-circle btn-sm absolute right-4 top-4"
        >
          ✕
        </button>
        
        <div className="text-center mb-6">
          <img 
            src={pokemon.sprites.other['official-artwork'].front_default}
            alt={pokemon.name}
            className="w-48 h-48 mx-auto mb-4"
          />
          <h2 className="text-3xl font-bold capitalize mb-2">{pokemon.name}</h2>
          <TypeBadges types={pokemon.types} />
        </div>

        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="stat bg-base-200 rounded-box">
            <div className="stat-title">Height</div>
            <div className="stat-value text-primary">{pokemon.height / 10}m</div>
          </div>
          <div className="stat bg-base-200 rounded-box">
            <div className="stat-title">Weight</div>
            <div className="stat-value text-secondary">{pokemon.weight / 10}kg</div>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-xl font-bold">Base Stats</h3>
          {pokemon.stats.map(stat => (
            <div key={stat.stat.name} className="space-y-2">
              <div className="flex justify-between">
                <span className="capitalize">{stat.stat.name}</span>
                <span className="font-bold">{stat.base_stat}</span>
              </div>
              <progress 
                className="progress progress-primary w-full" 
                value={stat.base_stat} 
                max="255"
              />
            </div>
          ))}
        </div>

        <div className="mt-6">
          <h3 className="text-xl font-bold mb-3">Abilities</h3>
          <div className="flex flex-wrap gap-2">
            {pokemon.abilities.map(ability => (
              <span 
                key={ability.ability.name}
                className="badge badge-lg"
              >
                {ability.ability.name.replace('-', ' ')}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  </div>
)

const TypeBadges = ({ types }) => (
  <div className="flex gap-2 justify-center">
    {types.map((type) => (
      <span 
        key={type.type.name}
        className={`badge badge-lg capitalize ${getTypeColor(type.type.name)}`}
      >
        {type.type.name}
      </span>
    ))}
  </div>
)

const getTypeColor = (type) => {
  const colors = {
    normal: 'badge-neutral', fire: 'badge-error', water: 'badge-info',
    grass: 'badge-success', electric: 'badge-warning', ice: 'badge-info',
    fighting: 'badge-error', poison: 'badge-secondary', ground: 'badge-warning',
    flying: 'badge-info', psychic: 'badge-secondary', bug: 'badge-success',
    rock: 'badge-neutral', ghost: 'badge-secondary', dragon: 'badge-primary',
    dark: 'badge-neutral', steel: 'badge-neutral', fairy: 'badge-secondary',
  }
  return colors[type] || 'badge-neutral'
}

export default PokemonDetail 