import { useState, useEffect } from 'react'
import { ArrowUpDown, Search, Info, X, Star, StarOff } from 'lucide-react'
import './App.css'

interface Team {
  id: number
  name: string
  badge: string
  wins: number
  losses: number
  draws: number
  points: number
  goalsFor: number
  goalsAgainst: number
  description: string
  stadium: string
  foundedYear: number
  coach: string
}

function App() {
  const [teams, setTeams] = useState<Team[]>([])
  const [loading, setLoading] = useState(true)
  const [sortBy, setSortBy] = useState("points")
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc")
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedTeam, setSelectedTeam] = useState<Team | null>(null)
  const [favorites, setFavorites] = useState<Team[]>([])
  const [activeTab, setActiveTab] = useState("leaderboard")

  // Cargar datos de equipos
  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const response = await fetch('http://localhost:3000/teams')
        const data: Team[] = await response.json()
        setTeams(data)
        setLoading(false);

      } catch (error) {
        console.error("Error fetching teams:", error)
        setLoading(false)
      }
    }

    fetchTeams()
  }, [])

  // Cargar favoritos desde localStorage
  useEffect(() => {
    const storedFavorites = localStorage.getItem('footballFavorites')
    if (storedFavorites) {
      try {
        const parsedFavorites = JSON.parse(storedFavorites)
        setFavorites(parsedFavorites)
      } catch (error) {
        console.error('Error parsing stored favorites:', error)
        setFavorites([])
      }
    }
  }, [])

  // Guardar favoritos en localStorage cuando cambien
  useEffect(() => {
    localStorage.setItem('footballFavorites', JSON.stringify(favorites))
  }, [favorites])

  // Alternar favoritos
  const toggleFavorite = (team: Team) => {
    if (favorites.some(fav => fav.id === team.id)) {
      setFavorites(favorites.filter(fav => fav.id !== team.id))
    } else {
      setFavorites([...favorites, team])
    }
  }

  // Verificar si un equipo es favorito
  const isFavorite = (teamId: number) => {
    return favorites.some(team => team.id === teamId)
  }

  // Filtrar equipos por término de búsqueda
  const filteredTeams = teams.filter((team) => 
    team.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  // Ordenar equipos según criterio seleccionado
  const sortedTeams = [...filteredTeams].sort((a, b) => {
    const aValue = a[sortBy as keyof Team]
    const bValue = b[sortBy as keyof Team]

    if (typeof aValue === "number" && typeof bValue === "number") {
      return sortOrder === "asc" ? aValue - bValue : bValue - aValue
    }
    
    return 0
  })

  // Cambiar ordenamiento
  const handleSortChange = (column: string) => {
    if (sortBy === column) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc")
    } else {
      setSortBy(column)
      setSortOrder("desc")
    }
  }

  // Mostrar detalles del equipo
  const showTeamDetails = (team: Team) => {
    setSelectedTeam(team)
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
          Liga de Fútbol - Tabla de Posiciones
        </h1>

        {/* Tabs */}
        <div className="mb-8">
          <div className="flex border-b border-gray-200 overflow-x-auto">
            <button
              className={`py-2 px-4 font-medium whitespace-nowrap ${
                activeTab === "leaderboard"
                  ? "border-b-2 border-blue-500 text-blue-500"
                  : "text-gray-500 hover:text-gray-700"
              }`}
              onClick={() => setActiveTab("leaderboard")}
            >
              Tabla de Posiciones
            </button>
            <button
              className={`py-2 px-4 font-medium flex items-center whitespace-nowrap ${
                activeTab === "favorites" 
                  ? "border-b-2 border-blue-500 text-blue-500" 
                  : "text-gray-500 hover:text-gray-700"
              }`}
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
          <div className="bg-white rounded-lg shadow-md p-4 md:p-6">
            <h2 className="text-xl font-semibold mb-4 text-gray-700">
              Tabla de Posiciones
            </h2>
            
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Buscar equipo..."
                  className="pl-10 w-full p-2 border border-gray-200 rounded-md"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              <div className="flex gap-2 flex-wrap md:flex-nowrap">
                <select 
                  className="p-2 border border-gray-200 rounded-md text-sm grow md:grow-0"
                  value={sortBy}
                  onChange={(e) => {
                    setSortBy(e.target.value)
                    setSortOrder("desc")
                  }}
                >
                  <option value="points">Puntos</option>
                  <option value="wins">Victorias</option>
                  <option value="losses">Derrotas</option>
                  <option value="draws">Empates</option>
                </select>
                
                <button 
                  className="flex items-center justify-center gap-1 p-2 border border-gray-200 rounded-md hover:bg-gray-50 text-sm grow md:grow-0"
                  onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
                >
                  <ArrowUpDown className="h-4 w-4" />
                  <span className="hidden sm:inline">{sortOrder === "asc" ? "Ascendente" : "Descendente"}</span>
                </button>
              </div>
            </div>
            
            {loading ? (
              <div className="flex items-center justify-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
                <span className="ml-2 text-gray-500">Cargando equipos...</span>
              </div>
            ) : sortedTeams.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                No se encontraron equipos que coincidan con la búsqueda.
              </div>
            ) : (
              <div className="overflow-x-auto -mx-4 md:mx-0">
                <div className="inline-block min-w-full align-middle px-4 md:px-0">
                  <table className="min-w-full divide-y divide-gray-200 border border-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Pos
                        </th>
                        <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Equipo
                        </th>
                        <th 
                          className="py-3 px-4 text-center text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                          onClick={() => handleSortChange("points")}
                        >
                          Puntos {sortBy === "points" && (sortOrder === "asc" ? "↑" : "↓")}
                        </th>
                        <th 
                          className="py-3 px-4 text-center text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                          onClick={() => handleSortChange("wins")}
                        >
                          Victorias {sortBy === "wins" && (sortOrder === "asc" ? "↑" : "↓")}
                        </th>
                        <th 
                          className="py-3 px-4 text-center text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                          onClick={() => handleSortChange("draws")}
                        >
                          Empates {sortBy === "draws" && (sortOrder === "asc" ? "↑" : "↓")}
                        </th>
                        <th 
                          className="py-3 px-4 text-center text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                          onClick={() => handleSortChange("losses")}
                        >
                          Derrotas {sortBy === "losses" && (sortOrder === "asc" ? "↑" : "↓")}
                        </th>
                        <th className="py-3 px-4 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Fav
                        </th>
                        <th className="py-3 px-4 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Info
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {sortedTeams.map((team) => (
                        <tr key={team.id} className="hover:bg-gray-50">
                          <td className="py-4 px-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {team.id}
                          </td>
                          <td className="py-4 px-4 whitespace-nowrap text-sm text-gray-900">
                            <div className="flex items-center">
                              <img
                                src={team.badge || "/playbypoint_logo.png"}
                                alt={`${team.name} badge`}
                                className="w-8 h-8 object-contain mr-3"
                              />
                              <span className="font-medium">{team.name}</span>
                            </div>
                          </td>
                          <td className="py-4 px-4 whitespace-nowrap text-sm font-bold text-gray-900 text-center">
                            {team.points}
                          </td>
                          <td className="py-4 px-4 whitespace-nowrap text-sm text-gray-500 text-center">
                            {team.wins}
                          </td>
                          <td className="py-4 px-4 whitespace-nowrap text-sm text-gray-500 text-center">
                            {team.draws}
                          </td>
                          <td className="py-4 px-4 whitespace-nowrap text-sm text-gray-500 text-center">
                            {team.losses}
                          </td>
                          <td className="py-4 px-4 whitespace-nowrap text-sm text-center">
                            <button 
                              onClick={() => toggleFavorite(team)}
                              className="focus:outline-hidden"
                            >
                              {isFavorite(team.id) ? (
                                <Star className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                              ) : (
                                <StarOff className="h-5 w-5 text-gray-400" />
                              )}
                            </button>
                          </td>
                          <td className="py-4 px-4 whitespace-nowrap text-sm text-center">
                            <button 
                              onClick={() => showTeamDetails(team)}
                              className="text-blue-500 hover:text-blue-700 focus:outline-hidden"
                            >
                              <Info className="h-5 w-5" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-md p-4 md:p-6">
            <div className="flex justify-between items-center mb-4 flex-wrap gap-2">
              <h2 className="text-xl font-semibold text-gray-700">
                Equipos Favoritos
              </h2>
              <span className="bg-gray-200 text-gray-700 text-xs font-semibold px-2 py-1 rounded-full">
                {favorites.length} equipos
              </span>
            </div>

            {favorites.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <p>No has agregado equipos a favoritos.</p>
                <p className="mt-2">Haz clic en la estrella junto a un equipo para agregarlo.</p>
              </div>
            ) : (
              <div className="overflow-x-auto -mx-4 md:mx-0">
                <div className="inline-block min-w-full align-middle px-4 md:px-0">
                  <table className="min-w-full divide-y divide-gray-200 border border-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Pos
                        </th>
                        <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Equipo
                        </th>
                        <th className="py-3 px-4 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Puntos
                        </th>
                        <th className="py-3 px-4 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Victorias
                        </th>
                        <th className="py-3 px-4 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Empates
                        </th>
                        <th className="py-3 px-4 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Derrotas
                        </th>
                        <th className="py-3 px-4 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Quitar
                        </th>
                        <th className="py-3 px-4 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Info
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {favorites.map((team) => (
                        <tr key={team.id} className="hover:bg-gray-50">
                          <td className="py-4 px-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {team.id}
                          </td>
                          <td className="py-4 px-4 whitespace-nowrap text-sm text-gray-900">
                            <div className="flex items-center">
                              <img
                                src={team.badge || "/playbypoint_logo.png"}
                                alt={`${team.name} badge`}
                                className="w-8 h-8 object-contain mr-3"
                              />
                              <span className="font-medium">{team.name}</span>
                            </div>
                          </td>
                          <td className="py-4 px-4 whitespace-nowrap text-sm font-bold text-gray-900 text-center">
                            {team.points}
                          </td>
                          <td className="py-4 px-4 whitespace-nowrap text-sm text-gray-500 text-center">
                            {team.wins}
                          </td>
                          <td className="py-4 px-4 whitespace-nowrap text-sm text-gray-500 text-center">
                            {team.draws}
                          </td>
                          <td className="py-4 px-4 whitespace-nowrap text-sm text-gray-500 text-center">
                            {team.losses}
                          </td>
                          <td className="py-4 px-4 whitespace-nowrap text-sm text-center">
                            <button 
                              onClick={() => toggleFavorite(team)}
                              className="text-yellow-400 hover:text-gray-400 focus:outline-hidden"
                            >
                              <Star className="h-5 w-5 fill-yellow-400" />
                            </button>
                          </td>
                          <td className="py-4 px-4 whitespace-nowrap text-sm text-center">
                            <button 
                              onClick={() => showTeamDetails(team)}
                              className="text-blue-500 hover:text-blue-700 focus:outline-hidden"
                            >
                              <Info className="h-5 w-5" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Modal de detalles del equipo */}
      {selectedTeam && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-2 md:p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md max-h-[90vh] overflow-y-auto">
            <div className="p-4 md:p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold flex items-center gap-2">
                  <img
                    src={selectedTeam.badge || "/playbypoint_logo.png"}
                    alt={`${selectedTeam.name} badge`}
                    className="w-8 h-8 object-contain"
                  />
                  {selectedTeam.name}
                </h3>
                <button
                  onClick={() => setSelectedTeam(null)}
                  className="text-gray-400 hover:text-gray-600 focus:outline-hidden"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="space-y-1">
                  <p className="text-sm font-medium text-gray-500">Fundado en</p>
                  <p className="text-sm">{selectedTeam.foundedYear}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-gray-500">Estadio</p>
                  <p className="text-sm">{selectedTeam.stadium}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-gray-500">Entrenador</p>
                  <p className="text-sm">{selectedTeam.coach}</p>
                </div>
              </div>

              <div className="space-y-2 mb-4">
                <p className="text-sm font-medium text-gray-500">Estadísticas</p>
                <div className="grid grid-cols-4 gap-2 text-center">
                  <div className="bg-gray-100 p-2 rounded-md">
                    <p className="text-xs text-gray-500">P.Jugados</p>
                    <p className="font-medium">{selectedTeam.wins + selectedTeam.losses + selectedTeam.draws}</p>
                  </div>
                  <div className="bg-gray-100 p-2 rounded-md">
                    <p className="text-xs text-gray-500">Victorias</p>
                    <p className="font-medium">{selectedTeam.wins}</p>
                  </div>
                  <div className="bg-gray-100 p-2 rounded-md">
                    <p className="text-xs text-gray-500">Empates</p>
                    <p className="font-medium">{selectedTeam.draws}</p>
                  </div>
                  <div className="bg-gray-100 p-2 rounded-md">
                    <p className="text-xs text-gray-500">Derrotas</p>
                    <p className="font-medium">{selectedTeam.losses}</p>
                  </div>
                </div>
              </div>

              <div className="space-y-2 mb-6">
                <p className="text-sm font-medium text-gray-500">Descripción</p>
                <p className="text-sm text-gray-700">{selectedTeam.description}</p>
              </div>

              <div className="space-y-2 mb-6">
                <p className="text-sm font-medium text-gray-500">Rendimiento</p>
                <div className="h-4 bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-blue-500" 
                    style={{ 
                      width: `${(selectedTeam.wins / (selectedTeam.wins + selectedTeam.draws + selectedTeam.losses)) * 100}%` 
                    }}
                  ></div>
                </div>
                <p className="text-xs text-gray-500 text-center">
                  Porcentaje de victorias: {Math.round((selectedTeam.wins / (selectedTeam.wins + selectedTeam.draws + selectedTeam.losses)) * 100)}%
                </p>
              </div>

              <div className="flex flex-col sm:flex-row justify-between gap-2">
                <button
                  onClick={() => toggleFavorite(selectedTeam)}
                  className="flex items-center justify-center gap-1 px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-hidden"
                >
                  {isFavorite(selectedTeam.id) ? (
                    <>
                      <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                      <span>Quitar de favoritos</span>
                    </>
                  ) : (
                    <>
                      <Star className="h-4 w-4" />
                      <span>Agregar a favoritos</span>
                    </>
                  )}
                </button>
                
                <button
                  onClick={() => setSelectedTeam(null)}
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 focus:outline-hidden"
                >
                  Cerrar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default App