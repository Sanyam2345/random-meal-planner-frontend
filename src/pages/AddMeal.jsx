import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { createMeal } from '../api'

function AddMeal() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    name: '',
    ingredients: '',
    category: 'breakfast',
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    if (!formData.name.trim() || !formData.ingredients.trim()) {
      setError('Please fill in all required fields')
      setLoading(false)
      return
    }

    try {
      await createMeal(formData)
      navigate('/meals')
    } catch (err) {
      console.error('Error creating meal:', err)
      if (err.request) {
        setError('Cannot connect to backend server. Make sure it is running on http://localhost:8000')
      } else {
        setError(err.response?.data?.detail || 'Failed to create meal. Please try again.')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Add New Meal</h1>

      <div className="bg-white rounded-lg shadow-md p-6">
        <form onSubmit={handleSubmit}>
          {error && (
            <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
              {error}
            </div>
          )}

          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
              Meal Name *
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="e.g., Scrambled Eggs"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
              Category *
            </label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            >
              <option value="breakfast">Breakfast</option>
              <option value="lunch">Lunch</option>
              <option value="dinner">Dinner</option>
            </select>
          </div>

          <div className="mb-6">
            <label htmlFor="ingredients" className="block text-sm font-medium text-gray-700 mb-2">
              Ingredients *
            </label>
            <textarea
              id="ingredients"
              name="ingredients"
              value={formData.ingredients}
              onChange={handleChange}
              rows="6"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter ingredients separated by commas, newlines, or semicolons&#10;e.g., eggs, milk, butter, salt"
              required
            />
            <p className="mt-2 text-sm text-gray-500">
              Separate ingredients by commas, semicolons, or newlines
            </p>
          </div>

          <div className="flex space-x-4">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition disabled:bg-gray-400 disabled:cursor-not-allowed font-medium"
            >
              {loading ? 'Adding...' : 'Add Meal'}
            </button>
            <button
              type="button"
              onClick={() => navigate('/meals')}
              className="flex-1 bg-gray-200 text-gray-800 px-6 py-3 rounded-lg hover:bg-gray-300 transition font-medium"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AddMeal

