function ErrorMessage({ message, onRetry }) {
    return (
        <div className="glass-card p-8 text-center flex flex-col items-center justify-center max-w-lg mx-auto mt-10">
            <div className="text-6xl mb-4 opacity-80">⚠️</div>
            <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-2">Oops! Something went wrong</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6">{message || "We couldn't load the data. Please try again."}</p>
            {onRetry && (
                <button
                    onClick={onRetry}
                    className="btn-primary"
                >
                    Try Again
                </button>
            )}
        </div>
    )
}

export default ErrorMessage
