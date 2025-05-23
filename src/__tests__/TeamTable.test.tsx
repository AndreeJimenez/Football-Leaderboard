import { render, screen, fireEvent } from '@testing-library/react'
import { TeamTable } from '../components/TeamTable'
import type { Team } from '../types/Team'
import { vi } from 'vitest'

const mockTeams: Team[] = [
  {
    "id": 1,
    "name": "FC Barcelona",
    "badge": "/FCBarcelona.png?height=40&width=40",
    "wins": 25,
    "losses": 3,
    "draws": 10,
    "points": 85,
    "goalsFor": 80,
    "goalsAgainst": 25,
    "description": "Uno de los clubes más exitosos de España y Europa, conocido por su estilo de juego de posesión.",
    "stadium": "Camp Nou",
    "foundedYear": 1899,
    "coach": "Xavi Hernández"
  }
]

describe('TeamTable', () => {
  it('renderiza el nombre del equipo', () => {
    render(
      <TeamTable
        teams={mockTeams}
        loading={false}
        sortBy="points"
        sortOrder="desc"
        setSortBy={() => {}}
        setSortOrder={() => {}}
        searchTerm=""
        setSearchTerm={() => {}}
        toggleFavorite={() => {}}
        isFavorite={() => false}
        showTeamDetails={() => {}}
      />
    )

    expect(screen.getByText('FC Barcelona')).toBeInTheDocument()
  })

  it('dispara toggleFavorite cuando se hace clic en la estrella', () => {
    const toggleFavorite = vi.fn()

    render(
      <TeamTable
        teams={mockTeams}
        loading={false}
        sortBy="points"
        sortOrder="desc"
        setSortBy={() => {}}
        setSortOrder={() => {}}
        searchTerm=""
        setSearchTerm={() => {}}
        toggleFavorite={toggleFavorite}
        isFavorite={() => false}
        showTeamDetails={() => {}}
      />
    )

    const starBtn = screen.getByLabelText('toggle-favorite-1')
    fireEvent.click(starBtn)
    expect(toggleFavorite).toHaveBeenCalledWith(mockTeams[0])
  })

  it('dispara showTeamDetails al hacer clic en el botón de info', () => {
    const showTeamDetails = vi.fn()

    render(
      <TeamTable
        teams={mockTeams}
        loading={false}
        sortBy="points"
        sortOrder="desc"
        setSortBy={() => {}}
        setSortOrder={() => {}}
        searchTerm=""
        setSearchTerm={() => {}}
        toggleFavorite={() => {}}
        isFavorite={() => false}
        showTeamDetails={showTeamDetails}
      />
    )

    const infoBtn = screen.getByLabelText('show-details-1')
    fireEvent.click(infoBtn)
    expect(showTeamDetails).toHaveBeenCalledWith(mockTeams[0])
  })
})
