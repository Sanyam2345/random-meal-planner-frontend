import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import Home from './pages/Home'
import AddMeal from './pages/AddMeal'
import EditMeal from './pages/EditMeal'
import MealsList from './pages/MealsList'
import RandomMeal from './pages/RandomMeal'
import ShoppingList from './pages/ShoppingList'

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <nav className="bg-blue-600 text-white shadow-lg">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <Link to="/" className="text-2xl font-bold">
                🍽️ Random Meal Planner
              </Link>
              <div className="flex space-x-4">
                <Link to="/" className="hover:text-blue-200 transition">
                  Home
                </Link>
                <Link to="/meals" className="hover:text-blue-200 transition">
                  Meals
                </Link>
                <Link to="/add-meal" className="hover:text-blue-200 transition">
                  Add Meal
                </Link>
                <Link to="/random" className="hover:text-blue-200 transition">
                  Random Meal
                </Link>
                <Link to="/shopping-list" className="hover:text-blue-200 transition">
                  Shopping List
                </Link>
              </div>
            </div>
          </div>
        </nav>

        <main className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/meals" element={<MealsList />} />
            <Route path="/add-meal" element={<AddMeal />} />
            <Route path="/edit-meal/:id" element={<EditMeal />} />
            <Route path="/random" element={<RandomMeal />} />
            <Route path="/shopping-list" element={<ShoppingList />} />
          </Routes>
        </main>
      </div>
    </Router>
  )
}

export default App

