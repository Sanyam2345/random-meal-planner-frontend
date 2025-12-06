function MealFilters({ filters, onChange, onReset, show, onClose }) {
    const handleChange = (e) => {
        const { name, value } = e.target
        onChange(name, value)
    }

    return (
        <aside className={`w-full md:w-64 flex-shrink-0 ${show ? 'block' : 'hidden'} md:block transition-all`}>
            <div className="glass-card rounded-2xl p-6 sticky top-24">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold text-gray-800 dark:text-white">Filters</h2>
                    {(filters.search || filters.min_calories || filters.diet_type !== 'all' || filters.include_ingredients) && (
                        <button
                            onClick={onReset}
                            className="text-xs text-blue-500 hover:text-blue-700 underline"
                        >
                            Reset
                        </button>
                    )}
                </div>

                <div className="space-y-6">
                    {/* Search */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-600 dark:text-gray-300 mb-2">Search</label>
                        <input
                            type="text"
                            name="search"
                            placeholder="Meal name..."
                            value={filters.search}
                            onChange={handleChange}
                            className="w-full p-2 rounded-lg bg-white/50 dark:bg-black/30 border border-gray-200 dark:border-gray-600 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>

                    {/* Diet Type */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-600 dark:text-gray-300 mb-2">Diet Type</label>
                        <select
                            name="diet_type"
                            value={filters.diet_type}
                            onChange={handleChange}
                            className="w-full p-2 rounded-lg bg-white/50 dark:bg-black/30 border border-gray-200 dark:border-gray-600 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
                        >
                            <option value="all">All Diets</option>
                            <option value="veg">Vegetarian</option>
                            <option value="non-veg">Non-Veg</option>
                            <option value="vegan">Vegan</option>
                            <option value="keto">Keto</option>
                            <option value="paleo">Paleo</option>
                        </select>
                    </div>

                    {/* Calories Range */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-600 dark:text-gray-300 mb-2">Calories</label>
                        <div className="flex items-center gap-2">
                            <input
                                type="number"
                                name="min_calories"
                                placeholder="Min"
                                value={filters.min_calories}
                                onChange={handleChange}
                                className="w-full p-2 rounded-lg bg-white/50 dark:bg-black/30 border border-gray-200 dark:border-gray-600 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm"
                            />
                            <span className="text-gray-400">-</span>
                            <input
                                type="number"
                                name="max_calories"
                                placeholder="Max"
                                value={filters.max_calories}
                                onChange={handleChange}
                                className="w-full p-2 rounded-lg bg-white/50 dark:bg-black/30 border border-gray-200 dark:border-gray-600 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm"
                            />
                        </div>
                    </div>

                    {/* Ingredients */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-600 dark:text-gray-300 mb-2">Include Ingredient</label>
                        <input
                            type="text"
                            name="include_ingredients"
                            placeholder="e.g. Chicken, Rice"
                            value={filters.include_ingredients}
                            onChange={handleChange}
                            className="w-full p-2 rounded-lg bg-white/50 dark:bg-black/30 border border-gray-200 dark:border-gray-600 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>
                </div>
            </div>
        </aside>
    )
}

export default MealFilters
