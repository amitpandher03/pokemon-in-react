import { useState } from 'react'
import PokemonDetail from './PokemonDetail'

const PokemonCard = ({ pokemon }) => {
  const [showDetail, setShowDetail] = useState(false)

  return (
    <>
      <div className="card bg-white/90 backdrop-blur-sm shadow-xl hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300">
        <figure className="px-6 pt-6">
          <img 
            src={pokemon.sprites.other['official-artwork'].front_default} 
            alt={pokemon.name}
            className="rounded-xl h-48 w-48 object-contain drop-shadow-md"
            loading="lazy"
          />
        </figure>
        <div className="card-body">
          <h2 className="card-title capitalize justify-center text-2xl mb-2">
            {pokemon.name}
          </h2>
          <TypeBadges types={pokemon.types} />
          <Stats stats={pokemon.stats} />
          <div className="card-actions justify-center mt-4">
            <button 
              onClick={() => setShowDetail(true)} 
              className="btn btn-primary btn-wide"
            >
              View Details
            </button>
          </div>
        </div>
      </div>

      {showDetail && (
        <PokemonDetail 
          pokemon={pokemon} 
          onClose={() => setShowDetail(false)}
        />
      )}
    </>
  )
}

const TypeBadges = ({ types }) => (
  <div className="flex gap-2 justify-center mb-3">
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

const Stats = ({ stats }) => (
  <div className="stats shadow">
    <div className="stat place-items-center">
      <div className="stat-title">HP</div>
      <div className="stat-value text-primary">{stats[0].base_stat}</div>
    </div>
    <div className="stat place-items-center">
      <div className="stat-title">Attack</div>
      <div className="stat-value text-secondary">{stats[1].base_stat}</div>
    </div>
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

export default PokemonCard 