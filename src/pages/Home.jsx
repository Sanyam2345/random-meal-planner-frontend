import { Link } from 'react-router-dom'

function Home() {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-5xl font-bold text-gray-800 mb-4">
          Welcome to Random Meal Planner
        </h1>
        <p className="text-xl text-gray-600">
          Plan your meals with ease and never wonder what to cook again!
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Link
          to="/meals"
          className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition shadow-blue-500 border-t-4 border-blue-500"
        >
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">
            📋 View All Meals
          </h2>
          <p className="text-gray-600">
            Browse and manage all your saved meals
          </p>
        </Link>

        <Link
          to="/add-meal"
          className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition shadow-green-500 border-t-4 border-green-500"
        >
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">
            ➕ Add New Meal
          </h2>
          <p className="text-gray-600">
            Add a new meal to your collection
          </p>
        </Link>

        <Link
          to="/random"
          className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition shadow-purple-500 border-t-4 border-purple-500"
        >
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">
            🎲 Random Meal Generator
          </h2>
          <p className="text-gray-600">
            Get random meals for breakfast, lunch, and dinner
          </p>
        </Link>

        <Link
          to="/shopping-list"
          className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition shadow-orange-500 border-t-4 border-orange-500"
        >
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">
            🛒 Shopping List
          </h2>
          <p className="text-gray-600">
            Generate a shopping list from selected meals
          </p>
        </Link>
      </div>
    </div>
  )
}

export default Home

