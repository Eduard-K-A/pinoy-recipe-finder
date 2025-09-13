import { useState, useEffect } from 'react';
import RecipeCard from '../components/RecipeCard.jsx';
import recipes from '../data/recipes.json';
import Footer from './Footer.jsx';

function HomePage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 300);

    return () => clearTimeout(handler);
  }, [searchTerm]);

  const filteredRecipes = recipes.filter((recipe) =>
    recipe.name.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
  );

  // show message only when user actually typed something and there are no matches
  const showNotFound =
    debouncedSearchTerm.trim() !== '' && filteredRecipes.length === 0;

  return (
    <div className="container">
      <div className="search-bar" style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
        <input
          type="text"
          placeholder="Search recipes..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
      </div>

      {/* Not found message shown directly under the search bar */}
      {showNotFound ? (
        <div
          className="not-found-message"
          role="status"
          aria-live="polite"
          style={{ marginTop: 16, textAlign: 'center' }}
        >
          No recipes found for "<strong>{debouncedSearchTerm}</strong>"
        </div>
      ) : (
        <div className="recipe-grid" style={{ marginTop: 16 }}>
          {filteredRecipes.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </div>
      )}

      <Footer />
    </div>
  );
}

export default HomePage;
