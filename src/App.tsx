import { useState, useEffect } from 'react'
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

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
          Liga de Fútbol - Tabla de Posiciones
        </h1>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">
            Tabla de Posiciones
          </h2>
          
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
                    <th className="py-3 px-4 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Puntos
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {teams.map((team) => (
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