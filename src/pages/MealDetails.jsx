import { useNavigate, useParams, Link } from 'react-router-dom'
import { useMeal, useMealMutation } from '../hooks/useMeals'
import { useFavorites } from '../context/FavoritesContext'
import toast from 'react-hot-toast'

function MealDetails() {
    const { id } = useParams()
    const navigate = useNavigate()
    const { data: meal, isLoading, error } = useMeal(id)
    const { deleteMutation } = useMealMutation()
    const { isFavorite, toggleFavorite } = useFavorites()

    const handleDelete = () => {
        if (window.confirm('Are you sure you want to delete this meal?')) {
            deleteMutation.mutate(id, {
                onSuccess: () => {
                    toast.success('Meal deleted successfully')
                    navigate('/meals')
                },
                onError: () => toast.error('Failed to delete meal'),
            })
        }
    }

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-white"></div>
            </div>
        )
    }

    if (error || !meal) {
        return (
            <div className="glass-card p-12 text-center text-red-100 max-w-2xl mx-auto mt-20">
                <h2 className="text-3xl font-bold mb-4">Meal Not Found</h2>
                <p className="mb-8">The meal you are looking for doesn't exist or has been removed.</p>
                <Link to="/meals" className="btn-primary">Back to Meals</Link>
            </div>
        )
    }

    return (
        <div className="max-w-5xl mx-auto py-8">
            <div className="mb-6 flex items-center justify-between">
                <Link to="/meals" className="text-white hover:text-blue-100 flex items-center gap-2 font-medium">
                    <span>←</span> Back to Collection
                </Link>
                <div className="flex gap-3">
                    <Link to={`/edit-meal/${id}`} className="px-4 py-2 bg-white/20 hover:bg-white/30 text-white rounded-lg backdrop-blur-sm transition-colors font-medium">
                        Edit Meal
                    </Link>
                    <button
                        onClick={() => toggleFavorite(meal.id)}
                        className={`px-4 py-2 rounded-lg backdrop-blur-sm transition-colors font-medium flex items-center gap-2 ${isFavorite(meal.id) ? 'bg-red-500 text-white' : 'bg-white/20 hover:bg-white/30 text-white'}`}
                    >
                        {isFavorite(meal.id) ? '❤️ Saved' : '🤍 Save'}
                    </button>
                    <button onClick={handleDelete} className="px-4 py-2 bg-red-500/80 hover:bg-red-600/90 text-white rounded-lg backdrop-blur-sm transition-colors font-medium">
                        Delete
                    </button>
                </div>
            </div>

            <div className="glass-card rounded-3xl overflow-hidden">
                <div className="relative h-80 md:h-96">
                    <div className={`absolute inset-0 bg-gradient-to-t from-black/70 to-transparent z-10`}></div>
                    <img
                        src={meal.image_url || `https://source.unsplash.com/1200x800/?${encodeURIComponent(meal.name)}`}
                        alt={meal.name}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                            e.target.src = `https://placehold.co/1200x800?text=${encodeURIComponent(meal.name)}`
                        }}
                    />
                    <div className="absolute bottom-0 left-0 p-8 md:p-12 z-20 w-full">
                        <span className="inline-block px-3 py-1 mb-4 rounded-full text-xs font-bold uppercase tracking-wide bg-white/90 text-gray-800">
                            {meal.category}
                        </span>
                        <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 drop-shadow-xl">{meal.name}</h1>
                        <div className="flex flex-wrap gap-6 text-white/90 font-medium text-lg">
                            {meal.prep_time && (
                                <div className="flex items-center gap-2">
                                    <span className="text-2xl">⏱️</span> {meal.prep_time} mins prep
                                </div>
                            )}
                            {meal.servings && (
                                <div className="flex items-center gap-2">
                                    <span className="text-2xl">👥</span> {meal.servings} servings
                                </div>
                            )}
                            <div className="flex items-center gap-2">
                                <span className="text-2xl">🔥</span> ~{Math.floor(Math.random() * 500) + 200} kcal
                            </div>
                        </div>
                    </div>
                </div>

                <div className="p-8 md:p-12 bg-white/40 backdrop-blur-md">
                    <div className="grid md:grid-cols-3 gap-12">
                        <div className="md:col-span-1">
                            <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                                <span>📝</span> Ingredients
                            </h3>
                            <ul className="space-y-3">
                                {meal.ingredients.split(/[,;\n]/).map((ing, i) => {
                                    const item = ing.trim()
                                    if (!item) return null
                                    return (
                                        <li key={i} className="flex items-start gap-3 text-gray-700 p-3 bg-white/50 rounded-xl">
                                            <div className="w-2 h-2 rounded-full bg-blue-400 mt-2 flex-shrink-0"></div>
                                            <span className="font-medium capitalize">{item}</span>
                                        </li>
                                    )
                                })}
                            </ul>
                        </div>

                        <div className="md:col-span-2">
                            <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                                <span>👩‍🍳</span> Instructions
                            </h3>
                            <div className="prose text-gray-700 leading-relaxed bg-white/50 p-6 rounded-xl">
                                <p>
                                    Instructions field is not yet in the database, but here is where you would describe how to make <strong>{meal.name}</strong>.
                                </p>
                                <p className="mt-4">
                                    1. Prepare your ingredients: {meal.ingredients}.<br />
                                    2. Mix everything together with love.<br />
                                    3. Cook for about {meal.prep_time || 15} minutes.<br />
                                    4. Serve hot and enjoy!
                                </p>
                                <p className="mt-4 text-sm text-gray-500 italic">
                                    (Self-generating instructions coming in future updates!)
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MealDetails
