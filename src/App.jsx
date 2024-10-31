import { useState, useEffect } from 'react'
import PokemonCard from './components/PokemonCard'
import LoadingSpinner from './components/LoadingSpinner'
import ErrorMessage from './components/ErrorMessage'
import ReactPaginate from 'react-paginate'
import './App.css'

const App = () => {
  const [pokemons, setPokemons] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [filteredPokemons, setFilteredPokemons] = useState([])
  const [itemOffset, setItemOffset] = useState(0)
  const itemsPerPage = 12 // Show 12 Pokémon per page

  useEffect(() => {
    const fetchPokemons = async () => {
      try {
        const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=500')
        if (!response.ok) throw new Error('Failed to fetch')
        const data = await response.json()
        
        const pokemonDetails = await Promise.all(
          data.results.map(async (pokemon) => {
            const res = await fetch(pokemon.url)
            return res.json()
          })
        )
        setPokemons(pokemonDetails)
        setLoading(false)
      } catch (err) {
        setError(err.message)
        setLoading(false)
      }
    }

    fetchPokemons()
  }, [])
  

  useEffect(() => {
    const timer = setTimeout(() => {
      const filtered = pokemons.filter(pokemon =>
        pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
      setFilteredPokemons(filtered)
    }, 1000)

    return () => clearTimeout(timer)
  }, [searchTerm, pokemons])

  const pageCount = Math.ceil(filteredPokemons.length / itemsPerPage)
  const currentItems = filteredPokemons.slice(
    itemOffset,
    itemOffset + itemsPerPage
  )

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % filteredPokemons.length
    setItemOffset(newOffset)
  }

  if (loading) return <LoadingSpinner />
  if (error) return <ErrorMessage error={error} />

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl md:text-5xl font-bold text-center text-white mb-8 drop-shadow-lg">
          Pokédex
        </h1>
        
        <div className="mb-6">
          <input
            type="text"
            placeholder="Search Pokémon..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full max-w-md mx-auto block px-4 py-2 rounded-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {currentItems.map((pokemon) => (
            <PokemonCard key={pokemon.name} pokemon={pokemon} />
          ))}
        </div>

        <ReactPaginate
          className="flex justify-center gap-2 mt-8"
          pageClassName="px-3 py-2 rounded-lg bg-white hover:bg-gray-100 cursor-pointer"
          activeClassName="!bg-blue-500 text-white"
          previousClassName="px-3 py-2 rounded-lg bg-white hover:bg-gray-100 cursor-pointer"
          nextClassName="px-3 py-2 rounded-lg bg-white hover:bg-gray-100 cursor-pointer"
          disabledClassName="opacity-50 cursor-not-allowed"
          breakClassName="px-3 py-2"
          previousLabel="Previous"
          nextLabel="Next"
          pageCount={pageCount}
          pageRangeDisplayed={3}
          marginPagesDisplayed={2}
          onPageChange={handlePageClick}
        />
      </div>
    </div>
  )
}

export default App
