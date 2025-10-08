import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { FavoritesProvider } from './contexts/FavoritesContext.jsx';
import { NotificationProvider } from './contexts/NotificationContext.jsx';
import Header from './components/Header.jsx';
import HomePage from './pages/HomePage.jsx';
import RecipeDetailPage from './pages/RecipeDetailPage.jsx';
import FavoritesPage from './pages/FavoritesPage.jsx';

function App() {
  return (
    <FavoritesProvider>
      <NotificationProvider>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/recipe/:id" element={<RecipeDetailPage />} />
          <Route path="/favorites" element={<FavoritesPage />} />
        </Routes>
      </BrowserRouter>
      </NotificationProvider>
    </FavoritesProvider>
  );
}

export default App;