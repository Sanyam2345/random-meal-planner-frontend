import axios from 'axios'

const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://random-meal-planner.onrender.com'

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // 10 second timeout
})

// Add request interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle errors globally
    if (error.code === 'ECONNABORTED') {
      error.message = 'Request timeout. The server is taking too long to respond.'
    }
    return Promise.reject(error)
  }
)

// Update to accept params object
export const getMeals = (params) => api.get('/meals', { params })
export const getWeeklyPlan = (params) => api.get('/weekly-plan', { params })
export const getMeal = (id) => api.get(`/meals/${id}`)
export const createMeal = (meal) => api.post('/meals', meal)
export const updateMeal = (id, meal) => api.put(`/meals/${id}`, meal)
export const deleteMeal = (id) => api.delete(`/meals/${id}`)
export const getRandomMeals = () => api.get('/random')
export const getShoppingList = (mealIds) => api.post('/shopping-list', { meal_ids: mealIds })

export default api

