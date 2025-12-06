export const getCategoryColor = (category) => {
  const colors = {
    breakfast: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    lunch: 'bg-green-100 text-green-800 border-green-200',
    dinner: 'bg-blue-100 text-blue-800 border-blue-200',
    snack: 'bg-pink-100 text-pink-800 border-pink-200',
  }
  return colors[category?.toLowerCase()] || 'bg-gray-100 text-gray-800 border-gray-200'
}

export const getDietEmoji = (diet) => {
  const map = {
    'veg': '🥬',
    'non-veg': '🍖',
    'vegan': '🌱',
    'keto': '🥑',
    'paleo': '🦕'
  }
  return map[diet?.toLowerCase()] || ''
}
