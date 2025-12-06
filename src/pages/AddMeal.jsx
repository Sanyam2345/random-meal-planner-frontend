import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useMealMutation } from '../hooks/useMeals'
import toast from 'react-hot-toast'

function AddMeal() {
  const navigate = useNavigate()
  const { createMutation } = useMealMutation()

  const [formData, setFormData] = useState({
    name: '',
    ingredients: '',
    category: 'breakfast',
    image_url: '',
    prep_time: '15',
    servings: '2'
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!formData.name.trim() || !formData.ingredients.trim()) {
      toast.error('Please fill in all required fields')
      return
    }

    createMutation.mutate({
      ...formData,
      prep_time: parseInt(formData.prep_time),
      servings: parseInt(formData.servings)
    }, {
      onSuccess: () => {
        toast.success('Meal created successfully!')
        navigate('/meals')
      },
      onError: (err) => {
        console.error(err)
        toast.error('Failed to create meal')
      }
    })
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex items-center gap-4 mb-6">
        <button onClick={() => navigate('/meals')} className="text-white hover:text-blue-100">
          ← Back
        </button>
        <h1 className="text-3xl font-bold text-white drop-shadow-md">Add New Meal</h1>
      </div>

      <div className="glass-card rounded-2xl p-8">
        <form onSubmit={handleSubmit} className="space-y-6">

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="name" className="block text-sm font-bold text-gray-700 mb-2">
                Meal Name *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-white/50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none backdrop-blur-sm"
                placeholder="e.g., Scrambled Eggs"
                required
              />
            </div>

            <div>
              <label htmlFor="category" className="block text-sm font-bold text-gray-700 mb-2">
                Category *
              </label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-white/50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none backdrop-blur-sm"
                required
              >
                <option value="breakfast">Breakfast</option>
                <option value="lunch">Lunch</option>
                <option value="dinner">Dinner</option>
                <option value="snack">Snack</option>
              </select>
            </div>
          </div>

          <div>
            <label htmlFor="image_url" className="block text-sm font-bold text-gray-700 mb-2">
              Image URL <span className="text-gray-400 font-normal">(Optional)</span>
            </label>
            <input
              type="url"
              id="image_url"
              name="image_url"
              value={formData.image_url}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-white/50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none backdrop-blur-sm"
              placeholder="https://example.com/image.jpg"
            />
            <p className="text-xs text-gray-500 mt-1">Leave empty to use a random image</p>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div>
              <label htmlFor="prep_time" className="block text-sm font-bold text-gray-700 mb-2">
                Prep Time (mins)
              </label>
              <input
                type="number"
                id="prep_time"
                name="prep_time"
                value={formData.prep_time}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-white/50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none backdrop-blur-sm"
                min="1"
              />
            </div>
            <div>
              <label htmlFor="servings" className="block text-sm font-bold text-gray-700 mb-2">
                Servings
              </label>
              <input
                type="number"
                id="servings"
                name="servings"
                value={formData.servings}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-white/50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none backdrop-blur-sm"
                min="1"
              />
            </div>
          </div>

          <div>
            <label htmlFor="ingredients" className="block text-sm font-bold text-gray-700 mb-2">
              Ingredients *
            </label>
            <textarea
              id="ingredients"
              name="ingredients"
              value={formData.ingredients}
              onChange={handleChange}
              rows="5"
              className="w-full px-4 py-2 bg-white/50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none backdrop-blur-sm"
              placeholder="Enter ingredients separated by commas, newlines, or semicolons&#10;e.g., eggs, milk, butter, salt"
              required
            />
          </div>

          <div className="flex space-x-4 pt-4">
            <button
              type="submit"
              disabled={createMutation.isPending}
              className="flex-1 btn-primary"
            >
              {createMutation.isPending ? 'Adding...' : 'Save Meal'}
            </button>
            <button
              type="button"
              onClick={() => navigate('/meals')}
              className="flex-1 px-6 py-3 rounded-full bg-white/50 text-gray-700 font-bold hover:bg-white/80 transition-all shadow-sm border border-gray-200"
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
