import { useParams, useNavigate } from 'react-router-dom';
import { useState, useContext } from 'react';
import { FavoritesContext } from '../contexts/FavoritesContext.jsx';
import { FaStar, FaRegStar, FaArrowLeft, FaListUl, FaListOl } from 'react-icons/fa';
import recipes from '../data/recipes.json';

function RecipeDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { favorites, toggleFavorite } = useContext(FavoritesContext);
  const recipe = recipes.find((r) => r.id === parseInt(id));
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [notification, setNotification] = useState(null);

  if (!recipe) {
    return <div className="container">Recipe not found!</div>;
  }

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
    <div className="container">
      {/* Notification */}
      {notification && (
        <div className="notification">
          {notification}
        </div>
      )}

      {/* Back Button will be placed over the header image (moved into header below) */}

      <div className="recipe-detail">
        {/* Header with image */}
        <div className="recipe-detail-header">
          {/* Back Button positioned relative to the header/image */}
          <div className="back-button-wrapper left">
            <button
              onClick={() => navigate(-1)}
              className="back-button"
              aria-label="Go back"
            >
              <FaArrowLeft />
            </button>
          </div>
          <div className="recipe-detail-image-container">
            {!isImageLoaded && (
              <div className="recipe-detail-image-placeholder">Loading...</div>
            )}
            <img
              src={recipe.image}
              alt={recipe.name}
              className="recipe-detail-image"
              style={{ display: isImageLoaded ? 'block' : 'none' }}
              onLoad={() => setIsImageLoaded(true)}
              onError={(e) => {
                e.target.src = 'https://via.placeholder.com/300';
                setIsImageLoaded(true);
              }}
            />
          </div>
          <div className="recipe-header-overlay">
            <h1>{recipe.name}</h1>
          </div>
        </div>

        {/* Content sections */}
        <div className="recipe-detail-content">
          <section className="recipe-section recipe-description-card">
            <div className="description-header">
              <h2>Description</h2>
              <button
                onClick={handleToggleFavorite}
                className="favorite-icon"
                aria-label={isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
              >
                {isFavorite ? (
                  <FaStar className="star filled" />
                ) : (
                  <FaRegStar className="star" />
                )}
              </button>
            </div>
            <p className="recipe-description">{recipe.description}</p>
          </section>

          <section className="recipe-section recipe-ingredients-card">
            <h2>
              <FaListUl className="section-icon" /> Ingredients
            </h2>
            <ul className="ingredient-list">
              {recipe.ingredients.map((ingredient, index) => (
                <li key={index}>{ingredient}</li>
              ))}
            </ul>
          </section>

          <section className="recipe-section recipe-instructions-card">
            <h2>
              <FaListOl className="section-icon" /> Instructions
            </h2>
            <ol className="instruction-list">
              {recipe.instructions.map((step, index) => (
                <li key={index}>{step}</li>
              ))}
            </ol>
          </section>
        </div>
      </div>
    </div>
  );
}

export default RecipeDetailPage;