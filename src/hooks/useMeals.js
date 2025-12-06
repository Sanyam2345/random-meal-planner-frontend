import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getMeals, getMeal, deleteMeal, createMeal, updateMeal, getRandomMeals, getShoppingList } from '../services/api'

// --- Meals Hooks ---

export const useMeals = (filters = {}) => {
  return useQuery({
    queryKey: ['meals', filters],
    queryFn: async () => {
      // Clean up empty filters
      const params = Object.fromEntries(
        Object.entries(filters).filter(([_, v]) => v != null && v !== '')
      )
      const { data } = await getMeals(params)
      return data
    },
  })
}

export const useMeal = (id) => {
  return useQuery({
    queryKey: ['meals', id],
    queryFn: async () => {
      const { data } = await getMeal(id)
      return data
    },
    enabled: !!id,
  })
}

export const useRandomMeal = () => {
    // We don't auto-fetch, we want to trigger it manually usually, 
    // but for the hook we can expose a refetch function.
    // actually, useQuery is fine, but we might want to disable it initially or just use a mutation-like pattern or just query.
    // For random, we often want to re-roll. 
    return useQuery({
        queryKey: ['random-meals'],
        queryFn: async () => {
            const { data } = await getRandomMeals()
            return data
        },
        enabled: false, // Don't fetch on mount automatically unless desired? let's stick to manual for the button
    })
}

export const useShoppingListMutation = () => {
    return useMutation({
        mutationFn: (mealIds) => getShoppingList(mealIds),
    })
}

export const useMealMutation = () => {
  const queryClient = useQueryClient()

  const deleteMutation = useMutation({
    mutationFn: deleteMeal,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['meals'] })
    },
  })

  const createMutation = useMutation({
    mutationFn: createMeal,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['meals'] })
    },
  })

  const updateMutation = useMutation({
    mutationFn: ({ id, meal }) => updateMeal(id, meal),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['meals'] })
      queryClient.invalidateQueries({ queryKey: ['meals', id] }) // Invalidate specific meal too
    },
  })

  return { deleteMutation, createMutation, updateMutation }
}
