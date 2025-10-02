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
<<<<<<< HEAD
      
      {filteredRecipes.length === 0 ? (
        <p style={{ textAlign: 'center', color: '#777', marginTop: '20px' }}>
          Recipe not found
        </p>
      ) : (
        <div className="recipe-grid">
          {filteredRecipes.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </div>
      )}

=======

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

>>>>>>> 800b7fb3d1a95eb4af85a113aa75ab3f586ff5ea
      <Footer />
    </div>
  );
}

export default HomePage;
