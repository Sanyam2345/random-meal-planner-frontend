function SkeletonCard() {
    return (
        <div className="glass-card rounded-2xl overflow-hidden flex flex-col h-full animate-pulse">
            <div className="h-48 bg-gray-300 dark:bg-gray-700 w-full" />
            <div className="p-6 flex flex-col flex-grow space-y-4">
                <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded w-3/4" />
                <div className="flex gap-2">
                    <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded w-16" />
                    <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded w-16" />
                </div>
                <div className="space-y-2 flex-grow">
                    <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-full" />
                    <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-5/6" />
                    <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-4/6" />
                </div>
                <div className="h-10 bg-gray-300 dark:bg-gray-700 rounded w-full" />
            </div>
        </div>
    )
}

export default SkeletonCard
