import { useRandomMeal } from '../hooks/useMeals'
import toast from 'react-hot-toast'

function RandomMeal() {
  const { data: meals, refetch, isFetching, error } = useRandomMeal()

  const handleGenerate = () => {
    refetch().catch(() => toast.error('Failed to generate meal plan'))
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

  if (error) {
    toast.error('Something went wrong. Is the backend running?')
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
          disabled={isFetching}
          className="group relative inline-flex items-center justify-center px-12 py-6 overflow-hidden font-bold text-white transition-all duration-300 bg-white/20 rounded-full hover:bg-white/30 backdrop-blur-md border border-white/50 shadow-2xl hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
        >
          <span className="absolute inset-0 w-full h-full -mt-1 rounded-lg opacity-30 bg-gradient-to-b from-transparent via-transparent to-black" />
          <span className="relative flex items-center text-xl">
            {isFetching ? (
              <>
                <div className="animate-spin -ml-1 mr-3 h-6 w-6 text-white border-2 border-white/50 border-t-white rounded-full"></div>
                Cooking up a plan...
              </>
            ) : (
              <>🎲 &nbsp; GENERATE MENU</>
            )}
          </span>
        </button>
      </div>

      {meals && (
        <div className="grid md:grid-cols-3 gap-8 mt-8 animate-fade-in-up">
          {['breakfast', 'lunch', 'dinner'].map((category) => {
            const meal = meals[category]
            if (!meal) return null

            return (
              <div
                key={category}
                className="transform transition-all duration-500 hover:-translate-y-2"
              >
                <div className={`glass-card rounded-3xl overflow-hidden h-full flex flex-col group`}>
                  <div className={`h-2 bg-gradient-to-r ${getCategoryColor(category)}`}></div>

                  {/* Image Section */}
                  <div className="h-48 relative overflow-hidden">
                    <div className={`absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10`}></div>
                    <img
                      src={meal.image_url || `https://source.unsplash.com/400x300/?${encodeURIComponent(meal.name)}`}
                      alt={meal.name}
                      className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                      onError={(e) => {
                        e.target.src = `https://placehold.co/400x300?text=${encodeURIComponent(meal.name)}`
                      }}
                    />
                    <div className="absolute bottom-3 left-4 z-20 flex items-center gap-2">
                      <span className="text-3xl filter drop-shadow-md">{getCategoryEmoji(category)}</span>
                      <span className="text-white font-bold uppercase tracking-wider text-sm shadow-black">{category}</span>
                    </div>
                  </div>

                  <div className="p-6 flex flex-col h-full bg-white/40 backdrop-blur-sm">
                    <h3 className="text-2xl font-bold text-gray-800 mb-3 leading-tight">{meal.name}</h3>

                    <div className="flex gap-4 mb-4 text-xs font-bold text-gray-600">
                      {meal.prep_time && <span>⏱️ {meal.prep_time}m</span>}
                      {meal.servings && <span>👥 {meal.servings} ppl</span>}
                    </div>

                    <div className="bg-white/50 dark:bg-black/20 rounded-xl p-4 flex-grow border border-white/20">
                      <p className="text-gray-700 dark:text-gray-200 text-sm line-clamp-4 leading-relaxed">
                        {meal.ingredients}
                      </p>
                    </div>
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
