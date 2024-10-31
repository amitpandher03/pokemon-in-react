const ErrorMessage = ({ error }) => (
  <div className="min-h-screen flex items-center justify-center bg-red-50">
    <div className="text-center p-8 bg-white rounded-lg shadow-xl">
      <div className="text-red-500 text-5xl mb-4">⚠️</div>
      <h2 className="text-2xl font-bold text-red-600 mb-2">Oops!</h2>
      <p className="text-gray-600">Error: {error}</p>
    </div>
  </div>
)

export default ErrorMessage 