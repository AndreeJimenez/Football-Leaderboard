import { ArrowUpDown, Info, Search, Star, StarOff } from 'lucide-react'
import type { Team } from '../types/Team'

interface Props {
  teams: Team[]
  loading: boolean
  sortBy: string
  sortOrder: 'asc' | 'desc'
  setSortBy: (column: string) => void
  setSortOrder: (order: 'asc' | 'desc') => void
  searchTerm: string
  setSearchTerm: (term: string) => void
  toggleFavorite: (team: Team) => void
  isFavorite: (id: number) => boolean
  showTeamDetails: (team: Team) => void
}

export const TeamTable = ({
  teams,
  loading,
  sortBy,
  sortOrder,
  setSortBy,
  setSortOrder,
  searchTerm,
  setSearchTerm,
  toggleFavorite,
  isFavorite,
  showTeamDetails
}: Props) => {
  const filteredTeams = teams.filter(team =>
    team.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const sortedTeams = [...filteredTeams].sort((a, b) => {
    const aValue = a[sortBy as keyof Team]
    const bValue = b[sortBy as keyof Team]

    if (typeof aValue === 'number' && typeof bValue === 'number') {
      return sortOrder === 'asc' ? aValue - bValue : bValue - aValue
    }

    return 0
  })

  return (
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
            onChange={e => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="flex gap-2 flex-wrap md:flex-nowrap">
          <div className="py-2 px-4 border border-gray-200 rounded-md text-sm grow md:grow-0">
            <select
              className="pr-10"
              value={sortBy}
              onChange={e => {
                setSortBy(e.target.value)
                setSortOrder('desc')
              }}
            >
              <option value="points">Puntos</option>
              <option value="wins">Victorias</option>
              <option value="losses">Derrotas</option>
              <option value="draws">Empates</option>
            </select>
          </div>

          <button
            className="flex items-center justify-center gap-1 p-2 border border-gray-200 rounded-md hover:bg-gray-50 text-sm grow md:grow-0"
            onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
          >
            <ArrowUpDown className="h-4 w-4" />
            <span className="hidden sm:inline">
              {sortOrder === 'asc' ? 'Ascendente' : 'Descendente'}
            </span>
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
                  <th className="text-left table-header-custom">Pos</th>
                  <th className="text-left table-header-custom">Equipo</th>
                  <th className="text-center table-header-custom cursor-pointer"
                    onClick={() => setSortBy('points')}>
                    Puntos {sortBy === 'points' && (sortOrder === 'asc' ? '↑' : '↓')}
                  </th>
                  <th className="text-center table-header-custom cursor-pointer"
                    onClick={() => setSortBy('wins')}>
                    Victorias {sortBy === 'wins' && (sortOrder === 'asc' ? '↑' : '↓')}
                  </th>
                  <th className="text-center table-header-custom cursor-pointer"
                    onClick={() => setSortBy('draws')}>
                    Empates {sortBy === 'draws' && (sortOrder === 'asc' ? '↑' : '↓')}
                  </th>
                  <th className="text-center table-header-custom cursor-pointer"
                    onClick={() => setSortBy('losses')}>
                    Derrotas {sortBy === 'losses' && (sortOrder === 'asc' ? '↑' : '↓')}
                  </th>
                  <th className="text-center table-header-custom">Fav</th>
                  <th className="text-center table-header-custom">Info</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {sortedTeams.map((team) => (
                  <tr key={team.id} className="hover:bg-gray-50">
                    <td className="table-cell-custom font-medium text-gray-900">{team.id}</td>
                    <td className="table-cell-custom text-gray-900">
                      <div className="flex items-center">
                        <img
                          src={team.badge || "/playbypoint_logo.png"}
                          alt={`${team.name} badge`}
                          className="w-8 h-8 object-contain mr-3"
                          onClick={() => showTeamDetails(team)}
                        />
                        <span className="font-medium">{team.name}</span>
                      </div>
                    </td>
                    <td className="table-cell-custom font-bold text-gray-900 text-center">{team.points}</td>
                    <td className="table-cell-custom text-gray-500 text-center">{team.wins}</td>
                    <td className="table-cell-custom text-gray-500 text-center">{team.draws}</td>
                    <td className="table-cell-custom text-gray-500 text-center">{team.losses}</td>
                    <td className="table-cell-custom text-center">
                      <button onClick={() => toggleFavorite(team)} className="focus:outline-none">
                        {isFavorite(team.id) ? (
                          <Star className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                        ) : (
                          <StarOff className="h-5 w-5 text-gray-400" />
                        )}
                      </button>
                    </td>
                    <td className="table-cell-custom text-center">
                      <button
                        onClick={() => showTeamDetails(team)}
                        className="text-blue-500 hover:text-blue-700 focus:outline-none"
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
  )
}
