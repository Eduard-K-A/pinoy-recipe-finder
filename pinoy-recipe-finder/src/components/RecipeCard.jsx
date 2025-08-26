import { Link } from 'react-router-dom';
import { useState } from 'react';

function RecipeCard({ recipe }) {
  const [isImageLoaded, setIsImageLoaded] = useState(false);

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
    </div>
  );
}

export default RecipeCard;