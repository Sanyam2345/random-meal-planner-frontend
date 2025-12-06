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
      {/* Background is handled in index.css body */}
      <div className="min-h-screen text-gray-800 font-sans">
        <nav className="glass-nav">
          <div className="container mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <Link to="/" className="text-2xl font-bold tracking-tight text-white flex items-center gap-2">
                <span className="text-3xl">🍽️</span>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-blue-100">MealGenie</span>
              </Link>

              {/* Desktop Menu */}
              <div className="hidden md:flex space-x-2">
                <Link to="/" className="px-4 py-2 rounded-full text-white hover:bg-white/20 transition-all font-medium">
                  Home
                </Link>
                <Link to="/meals" className="px-4 py-2 rounded-full text-white hover:bg-white/20 transition-all font-medium">
                  Meals
                </Link>
                <Link to="/add-meal" className="px-4 py-2 rounded-full text-white hover:bg-white/20 transition-all font-medium">
                  Add Meal
                </Link>
                <Link to="/random" className="px-4 py-2 rounded-full text-white hover:bg-white/20 transition-all font-medium">
                  Random
                </Link>
                <Link to="/shopping-list" className="px-4 py-2 rounded-full text-white hover:bg-white/20 transition-all font-medium">
                  Shopping List
                </Link>
              </div>

              {/* Mobile Menu Button can be added here later */}
            </div>
          </div>
        </nav>

        <main className="container mx-auto px-4 py-8 md:py-12">
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

