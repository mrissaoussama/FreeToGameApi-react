import { useState, useEffect } from 'react';
import Header from './components/Header';
import GameList from './components/GameList';
import GameDetail from './components/GameDetail';
import Filter from './components/Filter';
import Search from './components/Search';
import Favorites from './components/Favorites';
import './App.css';
import ReactModal from 'react-modal';

function App() {
  const [games, setGames] = useState([]);
  const [selectedGame, setSelectedGame] = useState(null);
  const [filters, setFilters] = useState({ platform: '', category: '', sort: '', tags: [], id: '' });
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showFavorites, setShowFavorites] = useState(false);

  const BASE_URL = 'https://free-to-play-games-database.p.rapidapi.com/api/';
  const API_KEY = '4b7cbd7dd1msh91d269a764b35ecp101f7ajsn5a7381ba0f49';

  const fetchGameDetails = async (gameId) => {
    const url = `${BASE_URL}game?id=${gameId}`;
    const response = await fetch(url, {
      headers: {
        'x-rapidapi-host': 'free-to-play-games-database.p.rapidapi.com',
        'x-rapidapi-key': API_KEY
      }
    });
    const data = await response.json();
    setSelectedGame(data);
  };
  const [favorites, setFavorites] = useState(JSON.parse(localStorage.getItem('favorites')) || []);

  const handleFavorite = (game) => {
    let newFavorites;
    if (favorites.find(favorite => favorite.id === game.id)) {
      newFavorites = favorites.filter(favorite => favorite.id !== game.id);
    } else {
      newFavorites = [...favorites, game];
    }
    setFavorites(newFavorites);
    localStorage.setItem('favorites', JSON.stringify(newFavorites));
  };
  
  const handleGameClick = (game) => {
    console.log("game")
    fetchGameDetails(game.id);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    const fetchGames = async () => {
      setLoading(true);
      setError(null);
      
      const params = new URLSearchParams();
      if (filters.platform) params.append('platform', filters.platform);
      if (filters.category) params.append('category', filters.category);
      if (filters.sort) params.append('sort-by', filters.sort);
      if (filters.tags.length > 0) params.append('tag', filters.tags.join('.'));
      let url = BASE_URL;
      url += filters.tags.length > 0 ? 'filter' : 'games';
      url += `?${params.toString()}`;
      try {
        const response = await fetch(url, {
          headers: {
            'x-rapidapi-host': 'free-to-play-games-database.p.rapidapi.com',
            'x-rapidapi-key': API_KEY
          }
        });
        const data = await response.json();
        if (Array.isArray(data) && data.length > 0) {
          setGames(data);
        } else {
          setGames([]);
        }
      } catch (err) {
        setError('Failed to fetch games');
      } finally {
        setLoading(false);
      }
    };

    fetchGames();
  }, [filters, searchTerm]);

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
    handleFilterChange(filters);

  };

  const filteredGames = games.filter((game) => game.title.toLowerCase().includes(searchTerm.toLowerCase()));
  return (
    <div className="App">
    <Header showFavorites={showFavorites} setShowFavorites={setShowFavorites} />
    {!showFavorites && <Filter onFilterChange={handleFilterChange} />}
    {!showFavorites && <Search onSearch={handleSearch} />}
{loading && <p className="center-text">Loading...</p>}
{error && <p className="center-text">{error}</p>}
{!showFavorites && filteredGames.length > 0 && <p className="center-text">Found {filteredGames.length} results</p>}
{!loading && !showFavorites && filteredGames.length === 0  && <p className='center-text'>No results found</p>}

{showFavorites ? (
  <Favorites favorites={favorites} onGameClick={handleGameClick} onFavorite={handleFavorite} />
) : (
  <GameList games={filteredGames} onGameClick={handleGameClick} favorites={favorites} onFavorite={handleFavorite} />
)}  <ReactModal 
        isOpen={isModalOpen} 
        onRequestClose={closeModal}
        style={{
          content: {
            width: '60%',
            height: 'auto',
            margin: 'auto',
            position: 'relative',
            inset:'5px',
            padding:'0',
          }
        }}
      >
        {selectedGame && <GameDetail game={selectedGame} favorites={favorites} onFavorite={handleFavorite} />}
      </ReactModal>
    </div>
  );
}

export default App;
