import { Link } from 'react-router-dom';
import { useState, useContext } from 'react';
import { FavoritesContext } from '../contexts/FavoritesContext.jsx';

function RecipeCard({ recipe }) {
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [notification, setNotification] = useState(null);
  const { favorites, toggleFavorite } = useContext(FavoritesContext);

  const isFavorite = favorites.includes(recipe.id);

  const handleToggleFavorite = () => {
    toggleFavorite(recipe.id);
    const message = isFavorite 
      ? 'Recipe removed from favorites' 
      : 'Recipe added to favorites';
    
    setNotification(message);
    setTimeout(() => setNotification(null), 3000);
  };

  return (
    <div className="recipe-card">
      {/* Notification */}
      {notification && (
        <div className="notification">
          {notification}
        </div>
      )}

      <div className="recipe-card-content">
        <Link to={`/recipe/${recipe.id}`}>
          <div className="recipe-image-container">
            {!isImageLoaded && (
              <div className="recipe-image-placeholder">Loading...</div>
            )}
            <img
              src={recipe.image}
              alt={recipe.name}
              className="recipe-image"
              style={{ display: isImageLoaded ? 'block' : 'none' }}
              onLoad={() => setIsImageLoaded(true)}
              onError={(e) => {
                e.target.src = 'https://via.placeholder.com/150';
                setIsImageLoaded(true);
              }}
            />
          </div>
          <h3 className='recipe-name'>{recipe.name}</h3>
          <p>{recipe.description}</p>
        </Link>
      </div>

      {/* Add/Remove Favorites Button */}
      <button
        onClick={handleToggleFavorite}
        className={isFavorite ? 'button remove' : 'button add'}
      >
        {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
      </button>
    </div>
  );
}

export default RecipeCard;