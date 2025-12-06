import { Link } from 'react-router-dom'
import { getCategoryColor, getDietEmoji } from '../../utils/helpers'
import { useFavorites } from '../../context/FavoritesContext'

function MealCard({ meal, onDelete, showDelete = false, showFavorite = true, compact = false }) {
    const { isFavorite, toggleFavorite } = useFavorites()

    if (!meal) return null

    // Ensure these handle missing properties gracefully
    const categoryColor = getCategoryColor(meal.category)
    const dietEmoji = getDietEmoji(meal.diet_type)

    return (
        <div className="glass-card glass-card-hover rounded-2xl overflow-hidden flex flex-col h-full group relative">
            <div className={`${compact ? 'h-32' : 'h-48'} overflow-hidden relative`}>
                {/* Badges */}
                <div className="absolute top-2 left-2 z-10 flex gap-1 flex-wrap">
                    {meal.category && (
                        <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide border shadow-sm ${categoryColor}`}>
                            {meal.category}
                        </span>
                    )}
                    {meal.diet_type && (
                        <span className="px-2 py-1 rounded-full text-xs bg-black/50 text-white backdrop-blur-sm border border-white/20">
                            {dietEmoji} {meal.diet_type}
                        </span>
                    )}
                </div>

                {/* Favorite Button */}
                {showFavorite && (
                    <button
                        onClick={(e) => {
                            e.preventDefault()
                            toggleFavorite(meal.id)
                        }}
                        className="absolute bottom-2 right-2 z-20 p-2 bg-white/30 hover:bg-white/50 rounded-full backdrop-blur-md transition-all scale-90 hover:scale-110 shadow-sm"
                        title="Toggle Favorite"
                    >
                        {isFavorite(meal.id) ? '❤️' : '🤍'}
                    </button>
                )}

                {/* Delete Button */}
                {showDelete && onDelete && (
                    <button
                        onClick={(e) => {
                            e.preventDefault()
                            onDelete(meal.id)
                        }}
                        className="absolute top-2 right-2 z-10 p-2 bg-white/80 dark:bg-black/50 hover:bg-red-50 text-red-500 rounded-full shadow-sm backdrop-blur-sm transition-colors opacity-0 group-hover:opacity-100"
                        title="Delete"
                    >
                        🗑️
                    </button>
                )}

                <Link to={`/meals/${meal.id}`} className="block h-full cursor-pointer">
                    <img
                        src={meal.image_url || `https://source.unsplash.com/400x300/?${encodeURIComponent(meal.name)}`}
                        alt={meal.name}
                        className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                        onError={(e) => {
                            e.target.src = `https://placehold.co/400x300?text=${encodeURIComponent(meal.name)}`
                        }}
                    />
                </Link>
            </div>

            <div className="p-4 md:p-6 flex flex-col flex-grow">
                <Link to={`/meals/${meal.id}`} className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                    <h2 className={`${compact ? 'text-lg' : 'text-2xl'} font-bold text-gray-800 dark:text-gray-100 mb-2 line-clamp-2`}>
                        {meal.name}
                    </h2>
                </Link>

                {/* Metadata Row */}
                <div className="flex flex-wrap gap-2 md:gap-3 mb-4 text-xs font-bold text-gray-500 dark:text-gray-400">
                    {meal.prep_time && (
                        <div className="flex items-center gap-1 bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded-md">
                            <span>⏱️</span> {meal.prep_time}m
                        </div>
                    )}
                    {meal.calories && (
                        <div className="flex items-center gap-1 bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded-md text-orange-600 dark:text-orange-400">
                            <span>🔥</span> {meal.calories} kcal
                        </div>
                    )}
                    {meal.servings && (
                        <div className="flex items-center gap-1 bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded-md">
                            <span>👥</span> {meal.servings}
                        </div>
                    )}
                </div>

                {!compact && (
                    <div className="flex-grow">
                        <p className="text-gray-600 dark:text-gray-300 text-sm line-clamp-3 leading-relaxed">
                            {meal.ingredients}
                        </p>
                    </div>
                )}

                {!compact && (
                    <div className="mt-6 pt-4 border-t border-gray-100 dark:border-gray-700">
                        <Link
                            to={`/edit-meal/${meal.id}`}
                            className="block w-full text-center py-2 rounded-lg bg-gray-50 hover:bg-blue-50 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 hover:text-blue-600 dark:text-gray-200 dark:hover:text-white font-medium transition-colors border border-gray-200 dark:border-gray-600 hover:border-blue-200"
                        >
                            Edit Details
                        </Link>
                    </div>
                )}
            </div>
        </div>
    )
}

export default MealCard
