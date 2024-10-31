const LoadingSpinner = () => (
  <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 to-purple-600">
    <div className="text-center">
      <div className="loading loading-spinner loading-lg text-white"></div>
      <p className="mt-4 text-white text-xl">Catching Pokémon...</p>
    </div>
  </div>
)

export default LoadingSpinner 