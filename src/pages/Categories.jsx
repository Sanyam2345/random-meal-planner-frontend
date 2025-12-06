import { useMeals } from '../hooks/useMeals'
import { Link } from 'react-router-dom'
import { getCategoryColor } from '../utils/helpers'

function Categories() {
    const { data: meals, isLoading, error } = useMeals()

    const getFilteredMeals = (category) => {
        if (!meals) return []
        return meals.filter(
            (meal) => meal.category.toLowerCase() === category.toLowerCase()
        )
    }

    const categories = [
        { id: 'breakfast', label: 'Breakfast', emoji: '🥞', color: 'from-orange-400 to-yellow-400' },
        { id: 'lunch', label: 'Lunch', emoji: '🥗', color: 'from-green-400 to-emerald-400' },
        { id: 'dinner', label: 'Dinner', emoji: '🍽️', color: 'from-blue-400 to-indigo-400' },
        { id: 'snack', label: 'Snacks', emoji: '🍿', color: 'from-pink-400 to-rose-400' },
    ]

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-white"></div>
            </div>
        )
    }

    if (error) {
        return (
            <div className="text-center text-red-200 py-20">
                <h2 className="text-2xl">Error loading meals.</h2>
            </div>
        )
    }

    return (
        <div className="max-w-7xl mx-auto pb-12">
            <div className="text-center mb-12">
                <h1 className="text-4xl md:text-5xl font-bold text-white drop-shadow-lg mb-4">
                    Browse by Category
                </h1>
                <p className="text-blue-100 text-lg">
                    Explore delicious recipes for every time of day
                </p>
            </div>

            <div className="space-y-16">
                {categories.map((category) => {
                    const categoryMeals = getFilteredMeals(category.id)

                    if (categoryMeals.length === 0) return null

                    return (
                        <div key={category.id} className="relative">
                            <div className="flex items-center gap-4 mb-6">
                                <span className="text-4xl filter drop-shadow-md">{category.emoji}</span>
                                <h2 className="text-3xl font-bold text-white drop-shadow-md">
                                    {category.label}
                                </h2>
                                <div className="h-[2px] flex-grow bg-white/20 rounded-full"></div>
                            </div>

                            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                                {categoryMeals.map((meal) => (
                                    <div
                                        key={meal.id}
                                        className="glass-card group rounded-2xl overflow-hidden hover:transform hover:-translate-y-2 transition-all duration-300 flex flex-col h-full"
                                    >
                                        <div className="h-48 overflow-hidden relative">
                                            <div className={`absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10`}></div>
                                            <img
                                                src={meal.image_url || `https://source.unsplash.com/400x300/?${encodeURIComponent(meal.name)}`}
                                                alt={meal.name}
                                                className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                                                onError={(e) => {
                                                    e.target.src = `https://placehold.co/400x300?text=${encodeURIComponent(meal.name)}`
                                                }}
                                            />
                                            <div className="absolute bottom-3 left-4 z-20">
                                                <h3 className="text-white font-bold text-lg leading-tight shadow-black">{meal.name}</h3>
                                            </div>
                                        </div>

                                        <div className="p-4 bg-white/40 dark:bg-slate-800/40 backdrop-blur-md flex-grow flex flex-col">
                                            <div className="flex gap-4 mb-2 text-xs text-gray-700 dark:text-gray-300 font-medium">
                                                {meal.prep_time && (
                                                    <span className="flex items-center gap-1">⏱️ {meal.prep_time}m</span>
                                                )}
                                                {meal.servings && (
                                                    <span className="flex items-center gap-1">👥 {meal.servings}</span>
                                                )}
                                            </div>
                                            <p className="text-gray-700 dark:text-gray-200 text-sm line-clamp-2 min-h-[2.5em] mb-4">
                                                {meal.ingredients}
                                            </p>

                                            <div className="mt-auto">
                                                <Link to={`/edit-meal/${meal.id}`} className="text-blue-600 text-sm hover:underline">Edit Details</Link>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )
                })}
            </div>

            {meals && meals.length === 0 && (
                <div className="text-center text-white/80 py-20">
                    <h2 className="text-2xl">No meals found in the database.</h2>
                </div>
            )}
        </div>
    )
}

export default Categories
