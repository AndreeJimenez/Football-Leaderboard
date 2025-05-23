import type { Team } from '../types/Team'
import { Star, X } from 'lucide-react'

interface Props {
  selectedTeam: Team | null
  setSelectedTeam: (team: Team | null) => void
  toggleFavorite: (team: Team) => void
  isFavorite: (id: number) => boolean
}

export const TeamDetailsModal = ({
  selectedTeam,
  setSelectedTeam,
  toggleFavorite,
  isFavorite
}: Props) => {
  if (!selectedTeam) return null

  const totalGames = selectedTeam.wins + selectedTeam.draws + selectedTeam.losses
  const winPercentage = totalGames > 0 ? Math.round((selectedTeam.wins / totalGames) * 100) : 0

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-2 md:p-4 z-50 transition-opacity duration-300"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          setSelectedTeam(null)
        }
      }}>
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md max-h-[90vh] overflow-y-auto transform transition-all duration-300">
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
              className="text-gray-400 hover:text-gray-600 focus:outline-none"
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
                <p className="font-medium">{totalGames}</p>
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
                style={{ width: `${winPercentage}%` }}
              ></div>
            </div>
            <p className="text-xs text-gray-500 text-center">
              Porcentaje de victorias: {winPercentage}%
            </p>
          </div>

          <div className="flex flex-col sm:flex-row justify-between gap-2 mt-6">
            <button
              onClick={() => toggleFavorite(selectedTeam)}
              className="flex items-center justify-center gap-1 px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors duration-200"
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
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors duration-200"
            >
              Cerrar
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}