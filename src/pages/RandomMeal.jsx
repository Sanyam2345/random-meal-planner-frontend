import { useState } from 'react'
import { getRandomMeals } from '../api'

function RandomMeal() {
  const [meals, setMeals] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleGenerate = async () => {
    setLoading(true)
    setError('')
    setMeals(null)

    try {
      const response = await getRandomMeals()
      setMeals(response.data)
      
      // Check if all categories are empty
      if (!response.data.breakfast && !response.data.lunch && !response.data.dinner) {
        setError('No meals found. Please add meals to your database first.')
      }
    } catch (err) {
      console.error('Error generating random meals:', err)
      
      // Better error messages
      if (err.response) {
        // Server responded with error
        setError(`Failed to generate random meals: ${err.response.data?.detail || err.response.statusText}`)
      } else if (err.request) {
        // Request was made but no response (backend not running)
        setError('Cannot connect to backend server. Make sure the backend is running on http://localhost:8000')
      } else {
        // Other errors
        setError('Failed to generate random meals. Please try again.')
      }
    } finally {
      setLoading(false)
    }
  }

  const getCategoryColor = (category) => {
    const colors = {
      breakfast: 'bg-yellow-100 text-yellow-800 border-yellow-300',
      lunch: 'bg-green-100 text-green-800 border-green-300',
      dinner: 'bg-blue-100 text-blue-800 border-blue-300',
    }
    return colors[category] || 'bg-gray-100 text-gray-800 border-gray-300'
  }

  const getCategoryEmoji = (category) => {
    const emojis = {
      breakfast: '🥞',
      lunch: '🍽️',
      dinner: '🌙',
    }
    return emojis[category] || '🍴'
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Random Meal Generator</h1>
        <p className="text-gray-600 text-lg">
          Get random meals for breakfast, lunch, and dinner
        </p>
      </div>

      <div className="flex justify-center mb-8">
        <button
          onClick={handleGenerate}
          disabled={loading}
          className="bg-purple-600 text-white text-xl font-bold px-12 py-6 rounded-lg hover:bg-purple-700 transition disabled:bg-gray-400 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transform hover:scale-105 transition-transform"
        >
          {loading ? (
            <span className="flex items-center">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Generating...
            </span>
          ) : (
            '🎲 Generate Random Meals'
          )}
        </button>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
          {error}
        </div>
      )}

      {meals && (
        <div className="grid md:grid-cols-3 gap-6">
          {['breakfast', 'lunch', 'dinner'].map((category) => {
            const meal = meals[category]
            return (
              <div
                key={category}
                className={`bg-white rounded-lg shadow-lg p-6 border-2 ${getCategoryColor(category)}`}
              >
                <div className="text-center mb-4">
                  <div className="text-4xl mb-2">{getCategoryEmoji(category)}</div>
                  <h2 className="text-2xl font-bold capitalize">{category}</h2>
                </div>

                {meal ? (
                  <div>
                    <h3 className="text-xl font-semibold mb-3 text-gray-800">{meal.name}</h3>
                    <div className="mb-4">
                      <h4 className="text-sm font-medium text-gray-600 mb-2">Ingredients:</h4>
                      <p className="text-gray-700 text-sm whitespace-pre-wrap bg-gray-50 p-3 rounded">
                        {meal.ingredients}
                      </p>
                    </div>
                    {meal.id && (
                      <p className="text-xs text-gray-400 mt-2">Meal ID: {meal.id}</p>
                    )}
                  </div>
                ) : (
                  <div className="text-center py-4 text-gray-500">
                    <p>No {category} meals available</p>
                    <p className="text-sm mt-2">Add some {category} meals first!</p>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      )}

      {!meals && !loading && !error && (
        <div className="text-center py-12 bg-white rounded-lg shadow">
          <p className="text-gray-600 text-lg">
            Click the button above to generate random meals!
          </p>
        </div>
      )}
    </div>
  )
}

export default RandomMeal

