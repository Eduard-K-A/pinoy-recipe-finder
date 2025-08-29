import { Link } from 'react-router-dom';
import { useState, useContext } from 'react';
import { FavoritesContext } from '../contexts/FavoritesContext.jsx';

function RecipeCard({ recipe }) {
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const { favorites, toggleFavorite } = useContext(FavoritesContext);

  const isFavorite = favorites.includes(recipe.id);

  return (
    <div className="recipe-card">
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
          <h3>{recipe.name}</h3>
          <p>{recipe.description}</p>
        </Link>
      </div>

      {/* Add/Remove Favorites Button */}
      <button
        onClick={() => toggleFavorite(recipe.id)}
        className={isFavorite ? 'button remove' : 'button add'}
      >
        {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
      </button>
    </div>
  );
}

export default RecipeCard;
