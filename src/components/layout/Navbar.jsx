import { Link } from 'react-router-dom'
import ThemeToggle from '../ThemeToggle'

function Navbar() {
    return (
        <nav className="glass-nav">
            <div className="container mx-auto px-6 py-4">
                <div className="flex items-center justify-between">
                    <Link to="/" className="text-2xl font-bold tracking-tight text-white flex items-center gap-2">
                        <span className="text-3xl">🍽️</span>
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-blue-100 drop-shadow-sm">MealGenie</span>
                    </Link>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center space-x-2">
                        <Link to="/" className="px-4 py-2 rounded-full text-white hover:bg-white/20 transition-all font-medium">
                            Home
                        </Link>
                        <Link to="/categories" className="px-4 py-2 rounded-full text-white hover:bg-white/20 transition-all font-medium">
                            Categories
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
                        <Link to="/planner" className="px-4 py-2 rounded-full text-white hover:bg-white/20 transition-all font-medium">
                            Planner
                        </Link>
                        <Link to="/shopping-list" className="px-4 py-2 rounded-full text-white hover:bg-white/20 transition-all font-medium">
                            List
                        </Link>
                        <Link to="/favorites" className="px-4 py-2 rounded-full text-white hover:bg-white/20 transition-all font-medium flex items-center gap-1">
                            <span>❤️</span> Favorites
                        </Link>
                        <div className="ml-4 pl-4 border-l border-white/20">
                            <ThemeToggle />
                        </div>
                    </div>

                    {/* Mobile Menu Placeholder - could expand later */}
                    <div className="md:hidden text-white">
                        {/* Simple mobile menu indicator or specialized mobile menu component could go here */}
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Navbar
