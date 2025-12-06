import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'

import Navbar from './components/layout/Navbar'
import { ThemeProvider } from './context/ThemeContext'
import { FavoritesProvider } from './context/FavoritesContext'
import { AuthProvider } from './context/AuthContext'

// Pages
import Home from './pages/Home'
import AuthPage from './pages/AuthPage'
import AddMeal from './pages/AddMeal'
import EditMeal from './pages/EditMeal'
import MealsList from './pages/MealsList'
import RandomMeal from './pages/RandomMeal'
import ShoppingList from './pages/ShoppingList'
import Categories from './pages/Categories'
import MealDetails from './pages/MealDetails'
import WeeklyPlanner from './pages/WeeklyPlanner'
import Favorites from './pages/Favorites'

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false, // good for dev
      staleTime: 1000 * 60 * 5, // 5 minutes
    },
  },
})

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <FavoritesProvider>
          <QueryClientProvider client={queryClient}>
            <Router>
              {/* Background is handled in index.css body */}
              <div className="min-h-screen text-gray-800 dark:text-gray-100 font-sans transition-colors duration-300">
                <Navbar />

                <main className="container mx-auto px-6 py-8">
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/meals" element={<MealsList />} />
                    <Route path="/categories" element={<Categories />} />
                    <Route path="/meals/:id" element={<MealDetails />} />
                    <Route path="/add-meal" element={<AddMeal />} />
                    <Route path="/edit-meal/:id" element={<EditMeal />} />
                    <Route path="/random" element={<RandomMeal />} />
                    <Route path="/shopping-list" element={<ShoppingList />} />
                    <Route path="/favorites" element={<Favorites />} />
                    <Route path="/planner" element={<WeeklyPlanner />} />
                  </Routes>
                </main>
              </div>
            </Router>
            <Toaster position="bottom-right" />
          </QueryClientProvider>
        </FavoritesProvider>
      </AuthProvider>
    </ThemeProvider>
  )
}

export default App
