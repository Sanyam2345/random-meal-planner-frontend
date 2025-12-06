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

      if (!response.data.breakfast && !response.data.lunch && !response.data.dinner) {
        setError('No meals found. Please add meals to your database first.')
      }
    } catch (err) {
      console.error('Error generating random meals:', err)
      if (err.response) {
        setError(`Failed to generate: ${err.response.data?.detail || err.response.statusText}`)
      } else if (err.request) {
        setError('Cannot connect to backend server. Make sure it is running on http://localhost:8000')
      } else {
        setError('Failed to generate random meals. Please try again.')
      }
    } finally {
      setLoading(false)
    }
  }

  const getCategoryColor = (category) => {
    const colors = {
      breakfast: 'from-orange-400 to-yellow-400 shadow-orange-500/30',
      lunch: 'from-green-400 to-emerald-400 shadow-green-500/30',
      dinner: 'from-blue-400 to-indigo-400 shadow-blue-500/30',
    }
    return colors[category] || 'from-gray-400 to-gray-500'
  }

  const getCategoryEmoji = (category) => {
    const emojis = {
      breakfast: '🥞',
      lunch: '🥗',
      dinner: '🍽️',
    }
    return emojis[category] || '🍴'
  }

  return (
    <div className="max-w-6xl mx-auto px-4">
      <div className="text-center py-12">
        <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 drop-shadow-lg">
          Feeling Indecisive?
        </h1>
        <p className="text-xl md:text-2xl text-blue-100 mb-12 max-w-2xl mx-auto font-light">
          Let the magic happen. Generate a perfect meal plan for your day with just one click.
        </p>

        <button
          onClick={handleGenerate}
          disabled={loading}
          className="group relative inline-flex items-center justify-center px-12 py-6 overflow-hidden font-bold text-white transition-all duration-300 bg-white/20 rounded-full hover:bg-white/30 backdrop-blur-md border border-white/50 shadow-2xl hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
        >
          <span className="absolute inset-0 w-full h-full -mt-1 rounded-lg opacity-30 bg-gradient-to-b from-transparent via-transparent to-black" />
          <span className="relative flex items-center text-xl">
            {loading ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Cooking up a plan...
              </>
            ) : (
              <>🎲 &nbsp; GENERATE MENU</>
            )}
          </span>
        </button>
      </div>

      {error && (
        <div className="glass-card p-6 bg-red-500/20 text-red-100 rounded-xl mb-8 border border-red-500/30 text-center max-w-2xl mx-auto back">
          {error}
        </div>
      )}

      {meals && (
        <div className="grid md:grid-cols-3 gap-8 mt-8 animate-fade-in-up">
          {['breakfast', 'lunch', 'dinner'].map((category) => {
            const meal = meals[category]
            return (
              <div
                key={category}
                className="transform transition-all duration-500 hover:-translate-y-2"
              >
                <div className={`glass-card rounded-3xl overflow-hidden h-full flex flex-col`}>
                  <div className={`h-2 bg-gradient-to-r ${getCategoryColor(category)}`}></div>
                  <div className="p-8 flex flex-col h-full bg-white/40">
                    <div className="flex items-center justify-between mb-6">
                      <span className="text-4xl filter drop-shadow-md">{getCategoryEmoji(category)}</span>
                      <span className="text-sm font-bold uppercase tracking-wider opacity-60 text-gray-800">{category}</span>
                    </div>

                    {meal ? (
                      <>
                        <h3 className="text-2xl font-bold text-gray-800 mb-4">{meal.name}</h3>
                        <div className="bg-white/50 rounded-xl p-4 flex-grow border border-white/20">
                          <p className="text-gray-700 text-sm whitespace-pre-wrap leading-relaxed">
                            {meal.ingredients}
                          </p>
                        </div>
                      </>
                    ) : (
                      <div className="flex-grow flex items-center justify-center text-gray-500 italic">
                        No meal available
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

export default RandomMeal

