import PropTypes from 'prop-types';
import GameCard from './GameCard';

const GameList = ({ games, onGameClick }) => {console.log(onGameClick);
  return (
    <div className="game-list">
      {games.length > 0 ? (
        games.map((game) => (
          <GameCard key={game.id} game={game} onGameClick={onGameClick} />
        ))
      ) : (
        <p></p>
      )}
    </div>
  );
};

GameList.propTypes = {
  games: PropTypes.array.isRequired,
  onGameClick: PropTypes.func.isRequired,
};

export default GameList;