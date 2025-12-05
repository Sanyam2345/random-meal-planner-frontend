import { useState, useEffect } from 'react'
import { getMeals, getShoppingList } from '../api'

function ShoppingList() {
  const [meals, setMeals] = useState([])
  const [selectedMealIds, setSelectedMealIds] = useState([])
  const [shoppingList, setShoppingList] = useState(null)
  const [loading, setLoading] = useState(true)
  const [generating, setGenerating] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    loadMeals()
  }, [])

  const loadMeals = async () => {
    try {
      const response = await getMeals()
      setMeals(response.data)
    } catch (err) {
      console.error('Error loading meals:', err)
      if (err.request) {
        setError('Cannot connect to backend server. Make sure it is running on http://localhost:8000')
      } else {
        setError('Failed to load meals. Please try again.')
      }
    } finally {
      setLoading(false)
    }
  }

  const handleMealToggle = (mealId) => {
    setSelectedMealIds((prev) => {
      if (prev.includes(mealId)) {
        return prev.filter((id) => id !== mealId)
      } else {
        return [...prev, mealId]
      }
    })
  }

  const handleGenerate = async () => {
    if (selectedMealIds.length === 0) {
      setError('Please select at least one meal')
      return
    }

    setGenerating(true)
    setError('')

    try {
      const response = await getShoppingList(selectedMealIds)
      setShoppingList(response.data)
    } catch (err) {
      console.error('Error generating shopping list:', err)
      if (err.request) {
        setError('Cannot connect to backend server. Make sure it is running on http://localhost:8000')
      } else {
        setError(err.response?.data?.detail || 'Failed to generate shopping list. Please try again.')
      }
    } finally {
      setGenerating(false)
    }
  }

  const handleClear = () => {
    setSelectedMealIds([])
    setShoppingList(null)
    setError('')
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
    return (
      <div className="max-w-6xl mx-auto">
        <div className="text-center py-12">Loading meals...</div>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Shopping List</h1>
        <div className="flex space-x-4">
          {selectedMealIds.length > 0 && (
            <button
              onClick={handleClear}
              className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition"
            >
              Clear Selection
            </button>
          )}
          <button
            onClick={handleGenerate}
            disabled={generating || selectedMealIds.length === 0}
            className="bg-orange-600 text-white px-6 py-2 rounded-lg hover:bg-orange-700 transition disabled:bg-gray-400 disabled:cursor-not-allowed font-medium"
          >
            {generating ? 'Generating...' : 'Generate Shopping List'}
          </button>
        </div>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
          {error}
        </div>
      )}

      <div className="grid md:grid-cols-2 gap-6">
        {/* Meal Selection */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Select Meals ({selectedMealIds.length} selected)
          </h2>

          {meals.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <p>No meals available. Add some meals first!</p>
            </div>
          ) : (
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {meals.map((meal) => (
                <label
                  key={meal.id}
                  className={`flex items-start p-3 border-2 rounded-lg cursor-pointer transition ${
                    selectedMealIds.includes(meal.id)
                      ? 'border-orange-500 bg-orange-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={selectedMealIds.includes(meal.id)}
                    onChange={() => handleMealToggle(meal.id)}
                    className="mt-1 mr-3 h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded"
                  />
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-medium text-gray-800">{meal.name}</span>
                      <span
                        className={`px-2 py-1 rounded text-xs font-medium ${getCategoryColor(
                          meal.category
                        )}`}
                      >
                        {meal.category}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 line-clamp-2">{meal.ingredients}</p>
                  </div>
                </label>
              ))}
            </div>
          )}
        </div>

        {/* Shopping List */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Shopping List</h2>

          {!shoppingList ? (
            <div className="text-center py-12 text-gray-500">
              <p className="mb-2">Select meals and generate your shopping list</p>
              <p className="text-sm">Ingredients will be combined and deduplicated</p>
            </div>
          ) : shoppingList.ingredients.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <p>No ingredients found in selected meals</p>
            </div>
          ) : (
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {shoppingList.ingredients.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition"
                >
                  <span className="text-gray-800 font-medium capitalize">{item.ingredient}</span>
                  {item.count > 1 && (
                    <span className="bg-orange-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                      {item.count}x
                    </span>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default ShoppingList

