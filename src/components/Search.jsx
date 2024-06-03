/* eslint-disable react/prop-types */
import { useState } from 'react';

const Search = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = () => {
    onSearch(searchTerm);
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      onSearch(searchTerm);
    }
  };
  return (
    <div className="search">
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search for a game..."
        onKeyPress={handleKeyPress}

      />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
};

export default Search;
