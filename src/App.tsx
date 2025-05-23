import { useState, useEffect } from 'react'
import type { Team } from './types/Team'
import { useFavorites } from './hooks/useFavorites'
import { TeamTable } from './components/TeamTable'
import { FavoritesTable } from './components/FavoritesTable'
import { TeamDetailsModal } from './components/TeamDetailsModal'
import { Notification } from './components/Notification'

function App() {
  const API_URL = import.meta.env.PROD ? '/api' : 'http://localhost:3001'

  const [teams, setTeams] = useState<Team[]>([])
  const [loading, setLoading] = useState(true)
  const [sortBy, setSortBy] = useState("points")
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc")
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedTeam, setSelectedTeam] = useState<Team | null>(null)
  const [activeTab, setActiveTab] = useState("leaderboard")
  const [lastAction, setLastAction] = useState<{ message: string, type: 'success' | 'error' | 'info' } | null>(null)

  const { favorites, setFavorites } = useFavorites(teams)

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const response = await fetch(`${API_URL}/teams`)
        const data: Team[] = await response.json()
        setTeams(data)
      } catch (error) {
        console.error("Error fetching teams:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchTeams()
  }, [API_URL])

  const toggleFavorite = (team: Team) => {
    const isAlreadyFavorite = favorites.some(f => f.id === team.id)
    if (isAlreadyFavorite) {
      setFavorites(favorites.filter(f => f.id !== team.id))
      setLastAction({ message: `${team.name} eliminado de favoritos`, type: 'info' })
    } else {
      setFavorites([...favorites, team])
      setLastAction({ message: `${team.name} añadido a favoritos`, type: 'success' })
    }

    setTimeout(() => {
      setLastAction(null)
    }, 3000)
  }

  const isFavorite = (teamId: number) => {
    return favorites.some(team => team.id === teamId)
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
          Liga de Fútbol - Tabla de Posiciones
        </h1>

        {lastAction && <Notification message={lastAction.message} type={lastAction.type} />}

        {/* Tabs */}
        <div className="mb-8">
          <div className="flex border-b border-gray-200 overflow-x-auto">
            <button
              className={`py-2 px-4 font-medium whitespace-nowrap ${activeTab === "leaderboard" ? "border-b-2 border-blue-500 text-blue-500" : "text-gray-500 hover:text-gray-700"}`}
              onClick={() => setActiveTab("leaderboard")}
            >
              Tabla de Posiciones
            </button>
            <button
              className={`py-2 px-4 font-medium flex items-center whitespace-nowrap ${activeTab === "favorites" ? "border-b-2 border-blue-500 text-blue-500" : "text-gray-500 hover:text-gray-700"}`}
              onClick={() => setActiveTab("favorites")}
            >
              Favoritos
              <span className="ml-2 bg-gray-200 text-gray-700 text-xs font-semibold px-2 py-0.5 rounded-full">
                {favorites.length}
              </span>
            </button>
          </div>
        </div>

        {activeTab === "leaderboard" ? (
          <TeamTable
            teams={teams}
            loading={loading}
            sortBy={sortBy}
            sortOrder={sortOrder}
            setSortBy={setSortBy}
            setSortOrder={setSortOrder}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            toggleFavorite={toggleFavorite}
            isFavorite={isFavorite}
            showTeamDetails={setSelectedTeam}
          />
        ) : (
          <FavoritesTable
            favorites={favorites}
            toggleFavorite={toggleFavorite}
            showTeamDetails={setSelectedTeam}
          />
        )}
      </div>

      <TeamDetailsModal
        selectedTeam={selectedTeam}
        setSelectedTeam={setSelectedTeam}
        toggleFavorite={toggleFavorite}
        isFavorite={isFavorite}
      />
    </div>
  )
}

export default App
