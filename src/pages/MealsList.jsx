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
        if (error.request) {
          alert('Cannot connect to backend server. Make sure it is running on http://localhost:8000')
        } else {
          alert(error.response?.data?.detail || 'Failed to delete meal. Please try again.')
        }
      }
    }
  }

  const getCategoryColor = (category) => {
    const colors = {
      breakfast: 'bg-yellow-100 text-yellow-800',
      lunch: 'bg-green-100 text-green-800',
      dinner: 'bg-blue-100 text-blue-800',
    }
    return colors[category] || 'bg-gray-100 text-gray-800'
  }

  if (loading) {
    return <div className="text-center py-12">Loading meals...</div>
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">All Meals</h1>
        <Link
          to="/add-meal"
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Add New Meal
        </Link>
      </div>

      {meals.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-lg shadow">
          <p className="text-gray-600 mb-4">No meals found. Add your first meal!</p>
          <Link
            to="/add-meal"
            className="text-blue-600 hover:underline"
          >
            Add a meal →
          </Link>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {meals.map((meal) => (
            <div
              key={meal.id}
              className="bg-white rounded-lg shadow-md p-6 hover:shadow-xl transition"
            >
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-xl font-semibold text-gray-800">
                  {meal.name}
                </h2>
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${getCategoryColor(
                    meal.category
                  )}`}
                >
                  {meal.category}
                </span>
              </div>

              <div className="mb-4">
                <h3 className="text-sm font-medium text-gray-600 mb-2">
                  Ingredients:
                </h3>
                <p className="text-gray-700 text-sm whitespace-pre-wrap">
                  {meal.ingredients}
                </p>
              </div>

              <div className="flex space-x-2">
                <Link
                  to={`/edit-meal/${meal.id}`}
                  className="flex-1 bg-blue-600 text-white text-center px-4 py-2 rounded hover:bg-blue-700 transition"
                >
                  Edit
                </Link>
                <button
                  onClick={() => handleDelete(meal.id)}
                  className="flex-1 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default MealsList

