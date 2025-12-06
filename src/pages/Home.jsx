import { Link } from 'react-router-dom'

function Home() {
  const cards = [
    {
      to: "/meals",
      title: "View All Meals",
      icon: "📋",
      desc: "Browse and manage your culinary collection",
      color: "from-blue-400 to-blue-600"
    },
    {
      to: "/add-meal",
      title: "Add New Meal",
      icon: "➕",
      desc: "Expand your repertoire with new recipes",
      color: "from-green-400 to-green-600"
    },
    {
      to: "/random",
      title: "Random Generator",
      icon: "🎲",
      desc: "Let fate decide your next delicious meal",
      color: "from-purple-400 to-purple-600"
    },
    {
      to: "/shopping-list",
      title: "Shopping List",
      icon: "🛒",
      desc: "Generate smart lists from your meal choices",
      color: "from-orange-400 to-orange-600"
    }
  ]

  return (
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-16 pt-8">
        <h1 className="text-6xl font-bold text-white mb-6 drop-shadow-md">
          What are we eating today?
        </h1>
        <p className="text-2xl text-blue-100 font-light max-w-2xl mx-auto leading-relaxed">
          Your personal culinary assistant. Plan, generate, and enjoy without the indecision.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
        {cards.map((card, index) => (
          <Link
            key={index}
            to={card.to}
            className="glass-card glass-card-hover p-8 rounded-2xl flex flex-col items-start justify-between min-h-[220px] group"
          >
            <div>
              <span className="text-4xl mb-4 block group-hover:scale-110 transition-transform duration-300">
                {card.icon}
              </span>
              <h2 className="text-2xl font-bold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors">
                {card.title}
              </h2>
              <p className="text-gray-600 leading-relaxed">
                {card.desc}
              </p>
            </div>
            <div className={`h-1 w-12 rounded-full mt-6 bg-gradient-to-r ${card.color}`}></div>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default Home

