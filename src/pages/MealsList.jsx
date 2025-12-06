import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { getMeals, deleteMeal } from '../api'

function MealsList() {
  const [meals, setMeals] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadMeals()
  }, [])

  const loadMeals = async () => {
    try {
      const response = await getMeals()
      setMeals(response.data)
    } catch (error) {
      console.error('Error loading meals:', error)
      if (error.request) {
        alert('Cannot connect to backend server. Make sure it is running on http://localhost:8000')
      }
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this meal?')) {
      try {
        await deleteMeal(id)
        loadMeals()
      } catch (error) {
        console.error('Error deleting meal:', error)
      }
    }
  }

  const getCategoryColor = (category) => {
    const colors = {
      breakfast: 'bg-yellow-100 text-yellow-800 border-yellow-200',
      lunch: 'bg-green-100 text-green-800 border-green-200',
      dinner: 'bg-blue-100 text-blue-800 border-blue-200',
    }
    return colors[category] || 'bg-gray-100 text-gray-800 border-gray-200'
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <div>
          <h1 className="text-4xl font-bold text-white drop-shadow-md mb-2">My Meal Collection</h1>
          <p className="text-blue-100">Manage and organize your favorite recipes</p>
        </div>
        <Link
          to="/add-meal"
          className="btn-primary"
        >
          + Add New Meal
        </Link>
      </div>

      {meals.length === 0 ? (
        <div className="glass-card rounded-2xl p-12 text-center text-gray-800">
          <p className="text-xl mb-6">No meals found. Start building your collection!</p>
          <Link
            to="/add-meal"
            className="text-blue-600 font-semibold hover:text-blue-800 underline decoration-2 underline-offset-4"
          >
            Add your first meal →
          </Link>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {meals.map((meal) => (
            <div
              key={meal.id}
              className="glass-card glass-card-hover rounded-2xl p-6 flex flex-col h-full group"
            >
              <div className="flex justify-between items-start mb-4">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide border ${getCategoryColor(
                    meal.category
                  )}`}
                >
                  {meal.category}
                </span>
                <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={() => handleDelete(meal.id)}
                    className="p-2 text-red-500 hover:bg-red-50 rounded-full transition-colors"
                    title="Delete"
                  >
                    🗑️
                  </button>
                </div>
              </div>

              <h2 className="text-2xl font-bold text-gray-800 mb-3 line-clamp-2">
                {meal.name}
              </h2>

              <div className="flex-grow">
                <h3 className="text-xs uppercase text-gray-400 font-semibold mb-2">Ingredients</h3>
                <p className="text-gray-600 text-sm line-clamp-4 leading-relaxed">
                  {meal.ingredients}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-gray-100 flex gap-4">
                <Link
                  to={`/edit-meal/${meal.id}`}
                  className="w-full text-center py-2 rounded-lg bg-gray-50 hover:bg-white text-gray-700 font-medium transition-colors border border-gray-200"
                >
                  Edit Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default MealsList

