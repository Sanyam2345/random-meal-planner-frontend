import { useState } from 'react'
import { useMeals, useShoppingListMutation } from '../hooks/useMeals'
import toast from 'react-hot-toast'

function ShoppingList() {
  const { data: meals, isLoading: mealsLoading, error: mealsError } = useMeals()
  const { mutate: generateList, isPending: generating, data: listData } = useShoppingListMutation()

  const [selectedMealIds, setSelectedMealIds] = useState([])

  const handleMealToggle = (mealId) => {
    setSelectedMealIds((prev) => {
      if (prev.includes(mealId)) {
        return prev.filter((id) => id !== mealId)
      } else {
        return [...prev, mealId]
      }
    })
  }

  const handleGenerate = () => {
    if (selectedMealIds.length === 0) {
      toast.error('Please select at least one meal')
      return
    }

    generateList(selectedMealIds, {
      onSuccess: () => {
        toast.success('Shopping list generated!')
      },
      onError: () => {
        toast.error('Failed to generate list')
      }
    })
  }

  const handleClear = () => {
    setSelectedMealIds([])
    // We can't easily clear mutation data without more complex query client usage or just ignoring it.
    // Ideally we reset the state that displays it.
    // For now, simpler to just clear selection.
  }

  const getCategoryColor = (category) => {
    const colors = {
      breakfast: 'bg-yellow-100 text-yellow-800 border-yellow-200',
      lunch: 'bg-green-100 text-green-800 border-green-200',
      dinner: 'bg-blue-100 text-blue-800 border-blue-200',
      snack: 'bg-pink-100 text-pink-800 border-pink-200',
    }
    return colors[category?.toLowerCase()] || 'bg-gray-100 text-gray-800 border-gray-200'
  }

  if (mealsLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
      </div>
    )
  }

  if (mealsError) {
    return (
      <div className="text-center text-red-200 py-20">
        <h2 className="text-2xl">Error loading meals. Is backend running?</h2>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <div>
          <h1 className="text-4xl font-bold text-white drop-shadow-md mb-2">Shopping List</h1>
          <p className="text-blue-100">Select meals to generate your grocery list</p>
        </div>
        <div className="flex gap-4">
          {selectedMealIds.length > 0 && (
            <button
              onClick={handleClear}
              className="bg-white/20 hover:bg-white/30 text-white px-6 py-2 rounded-full transition-all border border-white/30 backdrop-blur-sm shadow-sm"
            >
              Clear Selection
            </button>
          )}
          <button
            onClick={handleGenerate}
            disabled={generating || selectedMealIds.length === 0}
            className="btn-primary"
          >
            {generating ? 'Generating...' : 'Generate List'}
          </button>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Meal Selection */}
        <div className="glass-card rounded-2xl p-6 flex flex-col h-[600px]">
          <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-6 flex items-center gap-2">
            <span>🥗</span> Select Meals <span className="text-sm font-normal text-gray-500 dark:text-gray-300 bg-white/50 dark:bg-black/20 px-2 py-0.5 rounded-full ml-2">{selectedMealIds.length} selected</span>
          </h2>

          {!meals || meals.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <p>No meals available. Add some meals first!</p>
            </div>
          ) : (
            <div className="space-y-3 overflow-y-auto pr-2 custom-scrollbar flex-grow">
              {meals.map((meal) => (
                <label
                  key={meal.id}
                  className={`flex items-start p-4 border rounded-xl cursor-pointer transition-all duration-200 ${selectedMealIds.includes(meal.id)
                    ? 'border-blue-500 bg-blue-50/50 dark:bg-blue-900/30 shadow-sm'
                    : 'border-transparent bg-white/50 dark:bg-white/5 hover:bg-white/80 dark:hover:bg-white/10'
                    }`}
                >
                  <input
                    type="checkbox"
                    checked={selectedMealIds.includes(meal.id)}
                    onChange={() => handleMealToggle(meal.id)}
                    className="mt-1 mr-4 h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-bold text-gray-800 dark:text-gray-100">{meal.name}</span>
                      <span
                        className={`px-2 py-1 rounded-md text-xs font-bold uppercase tracking-wide border ${getCategoryColor(
                          meal.category
                        )}`}
                      >
                        {meal.category}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2 leading-relaxed opacity-80">{meal.ingredients}</p>
                  </div>
                </label>
              ))}
            </div>
          )}
        </div>

        {/* Shopping List */}
        <div className="glass-card rounded-2xl p-6 flex flex-col h-[600px]">
          <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-6 flex items-center gap-2">
            <span>🛒</span> Your List
          </h2>

          {!listData ? (
            <div className="flex-grow flex flex-col items-center justify-center text-gray-400/80 text-center p-8 bg-white/30 rounded-xl border border-dashed border-gray-300">
              <span className="text-6xl mb-4 grayscale opacity-50">📝</span>
              <p className="font-medium text-lg text-gray-500">Ready to shop?</p>
              <p className="text-sm">Select meals on the left and click Generate</p>
            </div>
          ) : listData.ingredients.length === 0 ? (
            <div className="text-center py-8 text-gray-500 bg-white/30 rounded-xl border border-dashed border-gray-300">
              <p>No ingredients found. Are the meals empty?</p>
            </div>
          ) : (
            <div className="overflow-y-auto pr-2 custom-scrollbar flex-grow">
              <div className="grid gap-3">
                {listData.ingredients.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 bg-white/60 backdrop-blur-sm rounded-xl hover:bg-white/90 transition-all border border-white/50 shadow-sm group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="h-2 w-2 rounded-full bg-blue-400 group-hover:bg-blue-600 transition-colors"></div>
                      <span className="text-gray-800 dark:text-gray-100 font-medium capitalize text-lg">{item.ingredient}</span>
                    </div>
                    {item.count > 0 && (
                      <span className="bg-blue-100 text-blue-700 text-sm font-bold px-3 py-1 rounded-full border border-blue-200">
                        {/* If count is 1 and logic was naive, it shows 1x. With smart parsing, it might be 1.5 or 300 etc */}
                        {Number.isInteger(item.count) ? item.count : item.count.toFixed(1)}x
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default ShoppingList
