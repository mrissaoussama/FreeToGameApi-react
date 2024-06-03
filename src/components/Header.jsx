/* eslint-disable react/prop-types */

const Header = ({ showFavorites, setShowFavorites }) => {
  return (
    <header>
      <h1>Free To Play Games</h1>
      <button onClick={() => setShowFavorites(!showFavorites)}>
        {showFavorites ? 'Hide Favorites' : 'Show Favorites'}
      </button>
    </header>
  );
};

export default Header;
