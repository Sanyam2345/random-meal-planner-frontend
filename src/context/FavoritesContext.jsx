import { createContext, useContext, useEffect, useState } from 'react'
import toast from 'react-hot-toast'

const FavoritesContext = createContext()

export const FavoritesProvider = ({ children }) => {
    const [favorites, setFavorites] = useState(() => {
        try {
            const saved = localStorage.getItem('favorites')
            return saved ? JSON.parse(saved) : []
        } catch (e) {
            console.error("Failed to parse favorites", e)
            return []
        }
    })

    useEffect(() => {
        localStorage.setItem('favorites', JSON.stringify(favorites))
    }, [favorites])

    const addFavorite = (id) => {
        if (!favorites.includes(id)) {
            setFavorites((prev) => [...prev, id])
            toast.success('Added to favorites! ❤️')
        }
    }

    const removeFavorite = (id) => {
        setFavorites((prev) => prev.filter((favId) => favId !== id))
        toast.success('Removed from favorites')
    }

    const isFavorite = (id) => favorites.includes(id)

    const toggleFavorite = (id) => {
        if (isFavorite(id)) {
            removeFavorite(id)
        } else {
            addFavorite(id)
        }
    }

    return (
        <FavoritesContext.Provider value={{ favorites, addFavorite, removeFavorite, isFavorite, toggleFavorite }}>
            {children}
        </FavoritesContext.Provider>
    )
}

export const useFavorites = () => useContext(FavoritesContext)
