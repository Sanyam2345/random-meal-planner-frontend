import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useMeals, useMealMutation } from '../hooks/useMeals'
import toast from 'react-hot-toast'
import MealCard from '../components/meals/MealCard'
import MealFilters from '../components/meals/MealFilters'
import SkeletonCard from '../components/common/SkeletonCard'
import ErrorMessage from '../components/common/ErrorMessage'

function MealsList() {
  const [filters, setFilters] = useState({
    search: '',
    min_calories: '',
    max_calories: '',
    diet_type: 'all',
    include_ingredients: '',
  })

  // Debounce the search input
  const [debouncedFilters, setDebouncedFilters] = useState(filters)

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedFilters(filters)
    }, 500)
    return () => clearTimeout(timer)
  }, [filters])

  const { data: meals, isLoading, error } = useMeals(debouncedFilters)
  const { deleteMutation } = useMealMutation()
  const [showFilters, setShowFilters] = useState(false)

  const handleFilterChange = (name, value) => {
    setFilters(prev => ({ ...prev, [name]: value }))
  }

  const handleReset = () => {
    setFilters({
      search: '',
      min_calories: '',
      max_calories: '',
      diet_type: 'all',
      include_ingredients: ''
    })
  }

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this meal?')) {
      deleteMutation.mutate(id, {
        onSuccess: () => toast.success('Meal deleted successfully'),
        onError: () => toast.error('Failed to delete meal'),
      })
    }
  }

  if (error) {
    return (
      <div className="glass-card p-8 text-center text-red-600">
        <p>Error loading meals. Is the backend running?</p>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-8">

      {/* Filters Sidebar - Mobile Toggle */}
      <div className="md:hidden mb-4">
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="w-full btn-secondary flex justify-center items-center gap-2"
        >
          <span>🌪️</span> {showFilters ? 'Hide Filters' : 'Show Filters'}
        </button>
      </div>

      <MealFilters
        filters={filters}
        onChange={handleFilterChange}
        onReset={handleReset}
        show={showFilters}
        onClose={() => setShowFilters(false)}
      />

      {/* Main Content */}
      <div className="flex-grow">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-white drop-shadow-md">
            Results <span className="text-lg font-normal opacity-80 ml-2">({meals?.length || 0})</span>
          </h1>
          <Link to="/add-meal" className="hidden md:inline-block btn-primary whitespace-nowrap">
            + Add Meal
          </Link>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
          </div>
        ) : !meals || meals.length === 0 ? (
          <div className="glass-card rounded-2xl p-12 text-center text-gray-800 dark:text-white">
            <p className="text-xl mb-6">No meals found matching your filters.</p>
            <button
              onClick={handleReset}
              className="text-blue-500 hover:underline"
            >
              Clear all filters
            </button>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {meals.map((meal) => (
              <MealCard
                key={meal.id}
                meal={meal}
                onDelete={handleDelete}
                showDelete={true}
              />
            ))}
          </div>
        )}
      </div>

      {/* Mobile Add Button */}
      <div className="md:hidden fixed bottom-6 right-6 z-40">
        <Link to="/add-meal" className="btn-primary rounded-full w-14 h-14 flex items-center justify-center text-3xl shadow-lg">
          +
        </Link>
      </div>

    </div>
  )
}

export default MealsList
