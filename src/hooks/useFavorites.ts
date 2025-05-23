import { useEffect, useState } from 'react'
import type { Team } from '../types/Team'

export const useFavorites = (teams: Team[]) => {
  const [favorites, setFavorites] = useState<Team[]>([])
  const [hasRestoredFavorites, setHasRestoredFavorites] = useState(false)

  useEffect(() => {
    if (teams.length > 0) {
      const storedFavorites = localStorage.getItem('footballFavorites')
      if (storedFavorites) {
        try {
          const favoriteIds = JSON.parse(storedFavorites) as number[]
          const restoredFavorites = teams.filter(team => favoriteIds.includes(team.id))
          setFavorites(restoredFavorites)
        } catch (error) {
          console.error('Error parsing stored favorites:', error)
        }
      }
      setHasRestoredFavorites(true)
    }
  }, [teams])

  useEffect(() => {
    if (hasRestoredFavorites) {
      const favoriteIds = favorites.map(team => team.id)
      localStorage.setItem('footballFavorites', JSON.stringify(favoriteIds))
    }
  }, [favorites, hasRestoredFavorites])

  return {
    favorites,
    setFavorites,
  }
}
