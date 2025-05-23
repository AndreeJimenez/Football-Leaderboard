import { Info, Star } from 'lucide-react'
import type { Team } from '../types/Team'

interface Props {
  favorites: Team[]
  toggleFavorite: (team: Team) => void
  showTeamDetails: (team: Team) => void
}

export const FavoritesTable = ({
  favorites,
  toggleFavorite,
  showTeamDetails,
}: Props) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 md:p-6 transition-all duration-300">
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
                  <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Pos</th>
                  <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Equipo</th>
                  <th className="py-3 px-4 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Puntos</th>
                  <th className="py-3 px-4 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Victorias</th>
                  <th className="py-3 px-4 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Empates</th>
                  <th className="py-3 px-4 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Derrotas</th>
                  <th className="py-3 px-4 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Quitar</th>
                  <th className="py-3 px-4 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Info</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {favorites.map((team) => (
                  <tr key={team.id} className="hover:bg-gray-50">
                    <td className="py-4 px-4 whitespace-nowrap text-sm font-medium text-gray-900">{team.id}</td>
                    <td className="py-4 px-4 whitespace-nowrap text-sm text-gray-900">
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
                    <td className="py-4 px-4 whitespace-nowrap text-sm font-bold text-gray-900 text-center">{team.points}</td>
                    <td className="py-4 px-4 whitespace-nowrap text-sm text-gray-500 text-center">{team.wins}</td>
                    <td className="py-4 px-4 whitespace-nowrap text-sm text-gray-500 text-center">{team.draws}</td>
                    <td className="py-4 px-4 whitespace-nowrap text-sm text-gray-500 text-center">{team.losses}</td>
                    <td className="py-4 px-4 whitespace-nowrap text-sm text-center">
                      <button onClick={() => toggleFavorite(team)} className="text-yellow-400 hover:text-gray-400 focus:outline-none">
                        <Star className="h-5 w-5 fill-yellow-400" />
                      </button>
                    </td>
                    <td className="py-4 px-4 whitespace-nowrap text-sm text-center">
                      <button onClick={() => showTeamDetails(team)} className="text-blue-500 hover:text-blue-700 focus:outline-none">
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
