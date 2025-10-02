import { useContext } from 'react';
import { FavoritesContext } from '../contexts/FavoritesContext.jsx';
import RecipeCard from '../components/RecipeCard.jsx';
import recipes from '../data/recipes.json';

function FavoritesPage() {
  const { favorites } = useContext(FavoritesContext);
  const favoriteRecipes = recipes.filter((recipe) => favorites.includes(recipe.id));

  return (
    <div className="container" style={{ paddingTop: 20 }}>
      <h2>Favorite Recipes</h2>
      {favoriteRecipes.length === 0 ? (
        <p className="no-favorites-msg" style={{ textAlign: 'center', marginTop: '20px' }} onMouseOver={(e) => e.target.style.textDecoration = 'underline'} onMouseLeave={(e) => e.target.style.textDecoration = 'none'} onClick={() => window.location.href = '/'}>
          No favorite recipes yet. Add one!
        </p>
      ) : (
        <div className="favorites-grid">
          {favoriteRecipes.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </div>
      )}
    </div>
  );
}

export default FavoritesPage;