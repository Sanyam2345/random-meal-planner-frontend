import { useState, useRef, useEffect } from 'react'
import { getWeeklyPlan } from '../services/api'
import { useQuery } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import jsPDF from 'jspdf'
import html2canvas from 'html2canvas'
import { Link } from 'react-router-dom'

function WeeklyPlanner() {
    const [filters, setFilters] = useState({
        diet_type: 'all',
        max_calories: ''
    })

    // Persist plan in localStorage
    const [plan, setPlan] = useState(() => {
        const saved = localStorage.getItem('weeklyPlan')
        return saved ? JSON.parse(saved) : null
    })

    // We use useQuery in a "manual" way somewhat, or just a function
    // Making it a function for "Generate" button is clearer than auto-fetch
    const [isGenerating, setIsGenerating] = useState(false)
    const printRef = useRef()

    useEffect(() => {
        if (plan) {
            localStorage.setItem('weeklyPlan', JSON.stringify(plan))
        }
    }, [plan])

    const handleGenerate = async () => {
        setIsGenerating(true)
        try {
            // clean filters
            const params = {}
            if (filters.diet_type !== 'all') params.diet_type = filters.diet_type
            if (filters.max_calories) params.max_calories = filters.max_calories

            const { data } = await getWeeklyPlan(params)
            setPlan(data)
            toast.success('Weekly plan generated!')
        } catch (error) {
            toast.error('Failed to generate plan')
            console.error(error)
        } finally {
            setIsGenerating(false)
        }
    }

    const handleExportPDF = async () => {
        if (!printRef.current) return

        // Show toast
        const toastId = toast.loading('Exporting PDF...')

        try {
            const canvas = await html2canvas(printRef.current, {
                scale: 2, // better resolution
                useCORS: true, // for remote images if possible
                logging: false
            })

            const imgData = canvas.toDataURL('image/png')
            // A4 size: 210 x 297 mm
            // We probably want landscape: 297 x 210
            const pdf = new jsPDF('l', 'mm', 'a4')
            const imgProps = pdf.getImageProperties(imgData)
            const pdfWidth = pdf.internal.pageSize.getWidth()
            const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width

            pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight)
            pdf.save('weekly-meal-plan.pdf')
            toast.success('PDF Downloaded!', { id: toastId })
        } catch (e) {
            console.error(e)
            toast.error('Export failed', { id: toastId })
        }
    }

    const days = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"]

    return (
        <div className="max-w-7xl mx-auto pb-12">
            <div className="text-center mb-8">
                <h1 className="text-4xl md:text-5xl font-bold text-white drop-shadow-lg mb-4">
                    Weekly Meal Planner 📅
                </h1>
                <p className="text-blue-100 text-lg">
                    7 Days. 21 Meals. One Click.
                </p>
            </div>

            {/* Controls */}
            <div className="glass-card rounded-2xl p-6 mb-8 flex flex-col md:flex-row gap-6 items-end justify-center">
                <div>
                    <label className="block text-sm font-bold text-gray-700 dark:text-gray-200 mb-2">Diet Type</label>
                    <select
                        value={filters.diet_type}
                        onChange={(e) => setFilters({ ...filters, diet_type: e.target.value })}
                        className="w-full md:w-48 p-2 rounded-lg bg-white/50 dark:bg-black/30 border border-gray-200 dark:border-gray-600 dark:text-white"
                    >
                        <option value="all">Any</option>
                        <option value="veg">Vegetarian</option>
                        <option value="non-veg">Non-Veg</option>
                        <option value="vegan">Vegan</option>
                        <option value="keto">Keto</option>
                    </select>
                </div>
                <div>
                    <label className="block text-sm font-bold text-gray-700 dark:text-gray-200 mb-2">Max Calories (per meal)</label>
                    <input
                        type="number"
                        placeholder="e.g. 600"
                        value={filters.max_calories}
                        onChange={(e) => setFilters({ ...filters, max_calories: e.target.value })}
                        className="w-full md:w-48 p-2 rounded-lg bg-white/50 dark:bg-black/30 border border-gray-200 dark:border-gray-600 dark:text-white"
                    />
                </div>
                <button
                    onClick={handleGenerate}
                    disabled={isGenerating}
                    className="btn-primary flex items-center gap-2 h-10"
                >
                    {isGenerating ? <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></div> : '⚡'}
                    Generate Plan
                </button>

                {plan && (
                    <button
                        onClick={handleExportPDF}
                        className="btn-secondary h-10 flex items-center gap-2"
                    >
                        📄 Export PDF
                    </button>
                )}
            </div>

            {/* Plan Grid */}
            {plan ? (
                <div ref={printRef} className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl p-4 md:p-8 rounded-3xl shadow-2xl">
                    <div className="text-center mb-6 md:hidden">
                        <p className="text-sm text-gray-500">Scroll right to see all days →</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-7 gap-4 min-w-[300px] overflow-x-auto md:overflow-visible">
                        {days.map(day => {
                            const dayPlan = plan[day]
                            return (
                                <div key={day} className="flex flex-col gap-3 min-w-[200px] md:min-w-0">
                                    <h3 className="text-center font-bold text-xl uppercase tracking-wider text-blue-600 dark:text-blue-400 mb-2 border-b border-gray-200 dark:border-gray-700 pb-2">
                                        {day.slice(0, 3)}
                                    </h3>

                                    {/* Breakfast */}
                                    <MealCard meal={dayPlan?.breakfast} type="Breakfast" />
                                    {/* Lunch */}
                                    <MealCard meal={dayPlan?.lunch} type="Lunch" />
                                    {/* Dinner */}
                                    <MealCard meal={dayPlan?.dinner} type="Dinner" />
                                </div>
                            )
                        })}
                    </div>
                    <div className="mt-8 text-center text-xs text-gray-400">
                        Generated by MealGenie
                    </div>
                </div>
            ) : (
                <div className="text-center py-20 bg-white/10 rounded-3xl border border-dashed border-white/30">
                    <p className="text-white text-xl opacity-80">Click Generate to create your weekly plan!</p>
                </div>
            )}
        </div>
    )
}

function MealCard({ meal, type }) {
    if (!meal) {
        return (
            <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4 h-32 flex items-center justify-center text-gray-400 border border-dashed border-gray-300 dark:border-gray-600">
                No Meal
            </div>
        )
    }

    const typeEmoji = {
        'Breakfast': '🥞',
        'Lunch': '🥗',
        'Dinner': '🍽️'
    }[type]

    return (
        <Link to={`/meals/${meal.id}`} className="block group">
            <div className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all border border-gray-100 dark:border-gray-700 h-full flex flex-col">
                <div className="h-24 relative overflow-hidden">
                    <img
                        src={meal.image_url || `https://source.unsplash.com/200x150/?${encodeURIComponent(meal.name)}`}
                        className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                        alt={meal.name}
                        onError={(e) => {
                            e.target.src = `https://placehold.co/200x150?text=${encodeURIComponent(meal.name)}`
                        }}
                    />
                    <div className="absolute top-1 left-1 bg-black/50 text-white text-[10px] px-2 py-0.5 rounded-full backdrop-blur-sm">
                        {typeEmoji}
                    </div>
                </div>
                <div className="p-2 flex-grow">
                    <h4 className="font-bold text-gray-800 dark:text-gray-200 text-sm leading-tight mb-1 line-clamp-2">
                        {meal.name}
                    </h4>
                    <p className="text-[10px] text-gray-500 dark:text-gray-400">
                        {meal.calories ? `${meal.calories} kcal` : ''}
                    </p>
                </div>
            </div>
        </Link>
    )
}

export default WeeklyPlanner
