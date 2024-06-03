/* eslint-disable react/prop-types */
import GameCard from './GameCard';

const GameList = ({ games, onGameClick, favorites, onFavorite }) => {console.log(onGameClick);
  return (
    <div className="game-list">
      {games.length > 0 ? (
       games.map((game) => (
        <GameCard key={game.id} game={game} onGameClick={onGameClick} favorites={favorites} onFavorite={onFavorite} />
      ))
      ) : (
        <p></p>
      )}
    </div>
  );
};


export default GameList;