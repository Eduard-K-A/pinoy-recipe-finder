import { useContext } from 'react';
import { FavoritesContext } from '../contexts/FavoritesContext.jsx';
import RecipeCard from '../components/RecipeCard.jsx';
import recipes from '../data/recipes.json';

function FavoritesPage() {
  const { favorites } = useContext(FavoritesContext);
  const favoriteRecipes = recipes.filter((recipe) => favorites.includes(recipe.id));

  return (
    <div className="empty-favorites" style={{ paddingTop: 20 }}>
      <h2>Favorite Recipes</h2>
      {favoriteRecipes.length === 0 ? (
        <p>No favorite recipes yet.</p>
      ) : (
        <div className="recipe-grid">
          {favoriteRecipes.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </div>
      )}
    </div>
  );
}

export default FavoritesPage;