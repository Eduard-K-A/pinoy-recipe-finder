import { useState, useEffect } from 'react';
import RecipeCard from '../components/RecipeCard.jsx';
import recipes from '../data/recipes.json';
import Footer from './Footer.jsx';

function HomePage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(searchTerm);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 300);

    return () => clearTimeout(handler);
  }, [searchTerm]);

  const filteredRecipes = recipes.filter((recipe) =>
    recipe.name.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
  );

  return (
    <div className="container">
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search recipes..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
      </div>
      
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

      <Footer />
    </div>
  );
}

export default HomePage;
