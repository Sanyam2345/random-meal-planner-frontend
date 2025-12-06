import { createContext, useContext, useState, useEffect } from 'react'
import axios from 'axios'

const AuthContext = createContext()

// Should be from env
const API_URL = 'http://localhost:8000'

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(localStorage.getItem('token'))
    const [user, setUser] = useState(null) // Can decode token or fetch user me

    useEffect(() => {
        if (token) {
            localStorage.setItem('token', token)
            // Optional: Decode token to get user email or fetch /users/me
            // For now, just having token implies logged in
        } else {
            localStorage.removeItem('token')
        }
    }, [token])

    const login = async (email, password) => {
        try {
            const res = await axios.post(`${API_URL}/auth/login`, { email, password })
            setToken(res.data.access_token)
            return { success: true }
        } catch (error) {
            return { success: false, error: error.response?.data?.detail || 'Login failed' }
        }
    }

    const register = async (email, password) => {
        try {
            const res = await axios.post(`${API_URL}/auth/register`, { email, password })
            setToken(res.data.access_token)
            return { success: true }
        } catch (error) {
            return { success: false, error: error.response?.data?.detail || 'Registration failed' }
        }
    }

    const logout = () => {
        setToken(null)
        setUser(null)
    }

    return (
        <AuthContext.Provider value={{ token, login, logout, register, isAuthenticated: !!token }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext)
