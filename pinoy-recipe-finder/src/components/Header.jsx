import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { FavoritesContext } from '../contexts/FavoritesContext.jsx';

function Header() {
  const { favorites } = useContext(FavoritesContext);

  const handleHomeClick = () => {
    e.preventDefault();
    navigate('/', {state: { clearSearch: true }});
  };

  return (
    <header className="header">
      <h1><Link to="/" onClick={handleHomeClick} >Pinoy Recipe Finder</Link></h1>
      <nav>
        <Link to="/" onClick={handleHomeClick} className="nav-link">Home</Link>
        <Link to="/favorites" className="nav-link">Favorites ({favorites.length})</Link>
      </nav>
    </header>
  );
}

export default Header;