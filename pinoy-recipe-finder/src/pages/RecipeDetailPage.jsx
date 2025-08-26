import { useParams, useNavigate } from 'react-router-dom';
import { useContext, useState } from 'react';
import { FavoritesContext } from '../contexts/FavoritesContext.jsx';
import recipes from '../data/recipes.json';

function RecipeDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { favorites, toggleFavorite } = useContext(FavoritesContext);
  const recipe = recipes.find((r) => r.id === parseInt(id));
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  if (!recipe) {
    return <div className="container">Recipe not found</div>;
  }

  return (
    <div className="container">
      <button onClick={() => navigate(-1)} className="back-button">
        &larr; Back
      </button>
      <div className="recipe-detail">
        <div className="recipe-image-container">
          {!isImageLoaded && (
            <div className="recipe-detail-image-placeholder">Loading...</div>
          )}
          <img
            src={recipe.image}
            alt={recipe.name}
            className="recipe-detail-image"
            style={{ display: isImageLoaded ? 'block' : 'none' }}
            onLoad={() => {
              console.log(`Image loaded: ${recipe.image}`);
              setIsImageLoaded(true);
            }}
            onError={(e) => {
              console.error(`Image failed to load: ${recipe.image}`);
              e.target.src = 'https://via.placeholder.com/300';
              setIsImageLoaded(true);
            }}
          />
        </div>
        <h2>{recipe.name}</h2>
        <p>{recipe.description}</p>
        <button
          onClick={() => toggleFavorite(recipe.id)}
          className={favorites.includes(recipe.id) ? 'button remove' : 'button add'}
        >
          {favorites.includes(recipe.id) ? 'Remove from Favorites' : 'Add to Favorites'}
        </button>
        <h3>Ingredients</h3>
        <ul className="ingredient-list">
          {recipe.ingredients.map((ingredient, index) => (
            <li key={index}>{ingredient}</li>
          ))}
        </ul>
        <h3>Instructions</h3>
        <ol className="instruction-list">
          {recipe.instructions.map((step, index) => (
            <li key={index}>{step}</li>
          ))}
        </ol>
      </div>
    </div>
  );
}

export default RecipeDetailPage;