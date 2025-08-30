  import { createContext, useState, useEffect } from 'react';

  export const FavoritesContext = createContext();

  export function FavoritesProvider({ children }) {
    const [favorites, setFavorites] = useState([]);

    useEffect(() => {
      try {
        const storedFavorites = localStorage.getItem('favorites');
        if (storedFavorites) {
          const parsedFavorites = JSON.parse(storedFavorites);
          if (Array.isArray(parsedFavorites)) {
            setFavorites(parsedFavorites);
          }
        }
      } catch (error) {
        console.error('Error loading favorites from localStorage:', error);
      }
    }, []);

    useEffect(() => {
      try {
        localStorage.setItem('favorites', JSON.stringify(favorites));
      } catch (error) {
        console.error('Error saving favorites to localStorage:', error);
      }
    }, [favorites]);

    const toggleFavorite = (recipeId) => {
      setFavorites((prev) =>
        prev.includes(recipeId)
          ? prev.filter((id) => id !== recipeId)
          : [...prev, recipeId]
      );
    };

    return (
      <FavoritesContext.Provider value={{ favorites, toggleFavorite }}>
        {children}
      </FavoritesContext.Provider>
    );
  }