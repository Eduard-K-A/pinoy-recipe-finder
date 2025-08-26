import { Link } from 'react-router-dom';
import { useState, useContext } from 'react';
import { FavoritesContext } from '../contexts/FavoritesContext.jsx';

function RecipeCard({ recipe }) {
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const { favorites, toggleFavorite } = useContext(FavoritesContext);

  return (
    <div className="recipe-card">
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
            onLoad={() => {
              console.log(`Image loaded: ${recipe.image}`);
              setIsImageLoaded(true);
            }}
            onError={(e) => {
              console.error(`Image failed to load: ${recipe.image}`);
              e.target.src = 'https://via.placeholder.com/150';
              setIsImageLoaded(true);
            }}
          />
        </div>
        <h3>{recipe.name}</h3>
        <p>{recipe.description}</p>
      </Link>
      <button
        onClick={() => toggleFavorite(recipe.id)}
        className={favorites.includes(recipe.id) ? 'button remove' : 'button add'}
      >
        {favorites.includes(recipe.id) ? 'Remove from Favorites' : 'Add to Favorites'}
      </button>
    </div>
  );
}

export default RecipeCard;