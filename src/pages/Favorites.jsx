import { useFavorites } from '../context/FavoritesContext'
import { useMeals } from '../hooks/useMeals'
import { Link } from 'react-router-dom'
import MealCard from '../components/meals/MealCard'

function Favorites() {
    const { favorites } = useFavorites() // removeFavorite used by Card implicitly if we pass it, but toggle handles it
    const { data: meals, isLoading } = useMeals()

    const favoriteMeals = meals?.filter(meal => favorites.includes(meal.id)) || []

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
            </div>
        )
    }

    return (
        <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
                <h1 className="text-4xl md:text-5xl font-bold text-white drop-shadow-lg mb-4">
                    Your Favorites ❤️
                </h1>
                <p className="text-blue-100 text-lg">
                    Temperature saved recipes collection
                </p>
            </div>

            {favoriteMeals.length === 0 ? (
                <div className="glass-card rounded-2xl p-12 text-center text-gray-800 dark:text-white">
                    <span className="text-6xl mb-4 block opacity-50">💔</span>
                    <p className="text-xl mb-6">You haven't saved any meals yet.</p>
                    <Link
                        to="/meals"
                        className="btn-primary inline-block"
                    >
                        Browse Meals
                    </Link>
                </div>
            ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {favoriteMeals.map((meal) => (
                        <MealCard
                            key={meal.id}
                            meal={meal}
                            showDelete={false} // Toggle handled by heart icon
                            showFavorite={true}
                        />
                    ))}
                </div>
            )}
        </div>
    )
}

export default Favorites
