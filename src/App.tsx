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
            <div className="text-gray-700">
              <p>Equipos cargados: {teams.length}</p>
              <ul className="mt-4">
                {teams.map(team => (
                  <li key={team.id} className="py-2 border-b border-gray-200">
                    {team.name} - {team.points} puntos
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default App