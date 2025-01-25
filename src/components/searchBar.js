import React, { useState } from 'react';
import './searchBar.css';
import samwise from "../images/samwise2.0.png";

const SearchBar = () => {
  const [query, setQuery] = useState('');

  const handleChange = (e) => {
    setQuery(e.target.value);
  };

  return (
    <div className="search-container">
      <input
        type="text"
        className="search-bar"
        value={query}
        onChange={handleChange}
        placeholder="Search..."
      />
      <div className="images-container">
        <img src={samwise} alt="samewise version 1.0" className="image" />
        <img src={samwise} alt="samewise version 2.0" className="image" />
        <img src={samwise} alt="samewise version 3" className="image" />
      </div>
    </div>
  );
};

export default SearchBar;
