import { useState } from 'react'
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
  const [teams, setTeams] = useState([])
  const [loading, setLoading] = useState(true)

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
              <div className="text-gray-500">Cargando equipos...</div>
            </div>
          ) : (
            <div className="text-gray-500">
              Aquí irá la tabla de equipos
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default App
