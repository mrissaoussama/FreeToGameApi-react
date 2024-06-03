/* eslint-disable react/prop-types */
import GameCard from './GameCard';

const Favorites = ({ favorites, onGameClick, onFavorite }) => {
    return (
      <div>
        <h2 className="center-text">Total favorites: {favorites.length}</h2>
        <div className="favorites-container">
          {favorites.length === 0 ? (
            <p>No favorites added</p>
          ) : (
            favorites.map((game) => (
              <GameCard key={game.id} game={game} onGameClick={onGameClick} favorites={favorites} onFavorite={onFavorite} />
            ))
          )}
        </div>
      </div>
    );
  };
export default Favorites;