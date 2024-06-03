/* eslint-disable react/prop-types */
import { useState } from 'react';
import ReactModal from 'react-modal';

const Filter = ({ onFilterChange }) => {
  const [platform, setPlatform] = useState('');
  // eslint-disable-next-line no-unused-vars
  const [category, setCategory] = useState('');
  const [sort, setSort] = useState('');
  const [tags, setTags] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const tagList = ['mmorpg', 'shooter', 'strategy', 'moba', 'racing', 'sports', 'social', 'sandbox', 'open-world', 'survival', 'pvp', 'pve', 'pixel', 'voxel', 'zombie', 'turn-based', 'first-person', 'third-Person', 'top-down', 'tank', 'space', 'sailing', 'side-scroller', 'superhero', 'permadeath', 'card', 'battle-royale', 'mmo', 'mmofps', 'mmotps', '3d', '2d', 'anime', 'fantasy', 'sci-fi', 'fighting', 'action-rpg', 'action', 'military', 'martial-arts', 'flight', 'low-spec', 'tower-defense', 'horror', 'mmorts'];

  const handleFilterChange = () => {
    onFilterChange({ platform, category, sort, tags });
    setIsModalOpen(false);
  };

  const handleTagChange = (e) => {
    if (e.target.checked) {
      setTags([...tags, e.target.value]);
    } else {
      setTags(tags.filter(tag => tag !== e.target.value));
    }
  };

  const clearTags = () => {
    setTags([]);
  };
  const Select = ({ value, onChange, options }) => (
    <select value={value} onChange={onChange}>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
  const sortOptions = [
    { value: 'alphabetical', label: 'Alphabetical' },
    { value: 'release-date', label: 'Release Date' },
    { value: 'popularity', label: 'Popularity' },
  ];
  
  const platformOptions = [
    { value: 'all', label: 'All Platforms' },
    { value: 'pc', label: 'PC' },
    { value: 'browser', label: 'Browser' },
  ];
  return (
    <div className="filter">
   <Select value={sort} onChange={(e) => setSort(e.target.value)} options={sortOptions} />
<Select value={platform} onChange={(e) => setPlatform(e.target.value)} options={platformOptions} />
      <button onClick={() => setIsModalOpen(true)}>Show Tags</button>
      <ReactModal 
        isOpen={isModalOpen} 
        onRequestClose={() => setIsModalOpen(false)}
        style={{
          content: {
            width: '60%',
            height: 'auto',
            margin: 'auto',
            position: 'relative',
            backgroundColor:"#333"
          }
        }}
      >
        <div className="tag-list">
          {tagList.map((tag) => (
            <div key={tag}>
              <input type="checkbox" id={tag} value={tag} onChange={handleTagChange} checked={tags.includes(tag)} />
              <label htmlFor={tag}>{tag}</label>
            </div>
          ))}
        </div>
        <button onClick={clearTags}>Clear Tags</button>
        <button onClick={() => setIsModalOpen(false)}>Close</button>
      </ReactModal>        <button onClick={handleFilterChange}>Apply Filters</button>

    </div>
  );
};

export default Filter;
