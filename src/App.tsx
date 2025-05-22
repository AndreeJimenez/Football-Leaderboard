import { useState, useEffect } from 'react'
import { ArrowUpDown } from 'lucide-react'
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

  // Ordenar equipos según criterio seleccionado
  const sortedTeams = [...teams].sort((a, b) => {
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

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
          Liga de Fútbol - Tabla de Posiciones
        </h1>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-700">
              Tabla de Posiciones
            </h2>
            
            <div className="flex items-center space-x-2">
              <select 
                className="p-2 border rounded-md text-sm"
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
                className="flex items-center gap-1 p-2 border rounded-md hover:bg-gray-50 text-sm"
                onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
              >
                <ArrowUpDown className="h-4 w-4" />
                {sortOrder === "asc" ? "Ascendente" : "Descendente"}
              </button>
            </div>
          </div>
          
          {loading ? (
            <div className="flex items-center justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
              <span className="ml-2 text-gray-500">Cargando equipos...</span>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white border border-gray-200">
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
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default App