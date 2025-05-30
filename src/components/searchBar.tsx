import React from 'react';
import './searchBar.css';
import samwise from "../images/samwise2.0.png";

interface SearchBarProps {
  query: string;
  setQuery: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ query, setQuery }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  return (
    <div className="search-container">
      <input
        type="text"
        className="search-bar"
        value={query}
        onChange={handleChange}
        placeholder="Search projects..."
      />
      <div className="images-container">
        <img src={samwise} alt="samwise version 1.0" className="image" />
        <img src={samwise} alt="samwise version 2.0" className="image" />
        <img src={samwise} alt="samwise version 3" className="image" />
      </div>
    </div>
  );
};

export default SearchBar; 