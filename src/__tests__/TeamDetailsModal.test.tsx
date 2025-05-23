import { render, screen, fireEvent } from '@testing-library/react'
import { TeamDetailsModal } from '../components/TeamDetailsModal'
import type { Team } from '../types/Team'
import { vi } from 'vitest'

const team: Team = {
  "id": 2,
  "name": "Real Madrid",
  "badge": "/RealMadrid.png?height=40&width=40",
  "wins": 24,
  "losses": 4,
  "draws": 10,
  "points": 82,
  "goalsFor": 75,
  "goalsAgainst": 30,
  "description": "El club más laureado de la historia del fútbol europeo, conocido por sus 'galácticos'.",
  "stadium": "Santiago Bernabéu",
  "foundedYear": 1902,
  "coach": "Carlo Ancelotti"
}

describe('TeamDetailsModal', () => {
  it('renderiza nombre, estadio y descripción', () => {
    render(
      <TeamDetailsModal
        selectedTeam={team}
        setSelectedTeam={() => {}}
        toggleFavorite={() => {}}
        isFavorite={() => false}
      />
    )

    expect(screen.getByText('Real Madrid')).toBeInTheDocument()
    expect(screen.getByText('Santiago Bernabéu')).toBeInTheDocument()
  })

  it('dispara toggleFavorite al hacer clic en el botón de favorito', () => {
    const toggleFavorite = vi.fn()

    render(
      <TeamDetailsModal
        selectedTeam={team}
        setSelectedTeam={() => {}}
        toggleFavorite={toggleFavorite}
        isFavorite={() => false}
      />
    )

    const favButton = screen.getByText(/Agregar a favoritos/i)
    fireEvent.click(favButton)

    expect(toggleFavorite).toHaveBeenCalledWith(team)
  })

  it('dispara setSelectedTeam(null) al cerrar', () => {
    const setSelectedTeam = vi.fn()

    render(
      <TeamDetailsModal
        selectedTeam={team}
        setSelectedTeam={setSelectedTeam}
        toggleFavorite={() => {}}
        isFavorite={() => false}
      />
    )

    const closeBtn = screen.getByText(/Cerrar/i)
    fireEvent.click(closeBtn)

    expect(setSelectedTeam).toHaveBeenCalledWith(null)
  })
})
